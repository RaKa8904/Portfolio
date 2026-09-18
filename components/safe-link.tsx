import React, { AnchorHTMLAttributes, ReactNode } from "react";

interface SafeLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
  className?: string;
}

/**
 * SafeLink Component
 * Secure wrapper around standard <a> and Next.js links.
 * Enforces `rel="noopener noreferrer"` for external links to prevent Reverse Tabnabbing
 * (where malicious external sites access window.opener).
 */
export function SafeLink({
  href,
  children,
  isExternal = true,
  className = "",
  rel,
  target,
  ...props
}: SafeLinkProps) {
  const isExternalUrl = isExternal || /^https?:\/\//i.test(href);

  if (isExternalUrl) {
    // Combine custom rel with mandatory noopener noreferrer protection
    const securityRel = Array.from(
      new Set(["noopener", "noreferrer", ...(rel ? rel.split(" ") : [])])
    ).join(" ");

    return (
      <a
        href={href}
        target={target || "_blank"}
        rel={securityRel}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}
