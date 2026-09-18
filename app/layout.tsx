import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rahul Naresh Sharma | Full-Stack Architect & Applied AI Engineer",
  description:
    "Portfolio of Rahul Naresh Sharma (RaKa8904). Full-Stack Architect & Applied AI Engineer specializing in resilient distributed systems, multi-factor ML scoring, passive network forensic intelligence, and high-performance microservices.",
  keywords: [
    "Rahul Naresh Sharma",
    "RaKa8904",
    "Full-Stack Architect",
    "Applied AI Engineer",
    "ThreatLens",
    "SmartCrew",
    "SmartPOS CRM AI",
    "Machine Learning",
    "FastAPI",
    "React",
    "PostgreSQL",
    "ClickHouse",
    "Python",
    "TypeScript",
  ],
  authors: [{ name: "Rahul Naresh Sharma", url: "https://github.com/RaKa8904" }],
  creator: "Rahul Naresh Sharma",
  openGraph: {
    title: "Rahul Naresh Sharma | Full-Stack Architect & Applied AI Engineer",
    description:
      "Resilient Full-Stack Systems & Applied AI Pipelines. ThreatLens, SmartCrew, SmartPOS CRM AI, and high-performance backend microservices.",
    url: "https://github.com/RaKa8904",
    siteName: "Rahul Sharma Portfolio",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-[#F7F6F1] text-ink-900 min-h-screen font-sans antialiased selection:bg-terracotta-100 selection:text-terracotta-800">
        {children}
      </body>
    </html>
  );
}
