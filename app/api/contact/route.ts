import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// SECURITY ARCHITECTURE: HARDENED CONTACT API ROUTE
// ============================================================================

// --- 1. IN-MEMORY RATE LIMITING FALLBACK (Sliding Window) ---
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitStore = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 submissions per 10 minutes per IP

function isRateLimitedInMemory(ip: string): { limited: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Periodic cleanup of stale entries
  if (rateLimitStore.size > 10000) {
    for (const [key, val] of rateLimitStore.entries()) {
      if (val.resetAt < now) rateLimitStore.delete(key);
    }
  }

  if (!record || record.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { limited: true, retryAfterSeconds };
  }

  record.count += 1;
  return { limited: false };
}

// --- 2. SANITIZATION HELPERS ---
function sanitizeString(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .replace(/javascript:/gi, "") // Neutralize javascript: protocols
    .replace(/on\w+=/gi, "") // Remove inline event handlers
    .trim();
}

function sanitizeEmailHeaderField(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input.replace(/[\r\n]/g, "").trim(); // Strip carriage returns & line feeds
}

// --- 3. TURNSTILE BOT VERIFICATION ---
async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[SECURITY WARN] TURNSTILE_SECRET_KEY missing. Bypassing bot check in dev.");
      return true;
    }
    console.error("[SECURITY ERROR] TURNSTILE_SECRET_KEY not configured.");
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const data = await response.json();
    return Boolean(data.success);
  } catch (error) {
    console.error("[SECURITY ERROR] Turnstile verification failed:", error);
    return false;
  }
}

// --- 4. API ROUTE HANDLER ---
export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = (forwardedFor ? forwardedFor.split(",")[0] : realIp) || "127.0.0.1";

    // Rate limiting check
    const rateLimitResult = isRateLimitedInMemory(ip);
    if (rateLimitResult.limited) {
      return NextResponse.json(
        {
          error: "Too many requests",
          message: `Rate limit exceeded. Please try again in ${rateLimitResult.retryAfterSeconds} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimitResult.retryAfterSeconds || 600),
            "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
          },
        }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { name, email, subject, message, turnstileToken, hp_field, website } = body;

    // Honeypot Field Check (Silently drop bot submissions)
    if (hp_field || website) {
      console.warn(`[SPAM BLOCKED] Honeypot triggered by IP: ${ip}`);
      return NextResponse.json(
        { success: true, message: "Message dispatched successfully." },
        { status: 200 }
      );
    }

    // Input Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters long." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters long." }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "Message length exceeds 5000 characters limit." }, { status: 400 });
    }

    // Turnstile Check
    if (process.env.NODE_ENV === "production" || process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken || typeof turnstileToken !== "string") {
        return NextResponse.json({ error: "Bot verification token missing." }, { status: 400 });
      }

      const isHuman = await verifyTurnstileToken(turnstileToken, ip);
      if (!isHuman) {
        return NextResponse.json({ error: "Bot verification failed. Please refresh and try again." }, { status: 403 });
      }
    }

    // Sanitization
    const sanitizedName = sanitizeEmailHeaderField(sanitizeString(name));
    const sanitizedEmail = sanitizeEmailHeaderField(email.trim());
    const sanitizedSubject = sanitizeEmailHeaderField(sanitizeString(subject || "Portfolio Contact Request"));
    const sanitizedMessage = sanitizeString(message);

    // Email Delivery
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO_EMAIL || "portfolio@example.com"],
          reply_to: sanitizedEmail,
          subject: `[Portfolio] ${sanitizedSubject}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #333;">
              <h2>New Direct Portfolio Inquiry</h2>
              <p><strong>Name:</strong> ${sanitizedName}</p>
              <p><strong>Email:</strong> ${sanitizedEmail}</p>
              <p><strong>Subject:</strong> ${sanitizedSubject}</p>
              <p><strong>IP Address:</strong> ${ip}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <h3>Message Content:</h3>
              <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${sanitizedMessage}</p>
            </div>
          `,
        }),
      });

      if (!emailResponse.ok) {
        const errData = await emailResponse.json();
        console.error("[EMAIL DELIVERY ERROR]", errData);
        throw new Error("Failed to dispatch email via provider.");
      }
    } else {
      console.log("[DEV MODE - CONTACT SUBMISSION RECEIVED]:", {
        name: sanitizedName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        ip,
      });
    }

    return NextResponse.json(
      { success: true, message: "Thank you! Your message has been safely delivered." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[UNHANDLED CONTACT API ERROR]:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
