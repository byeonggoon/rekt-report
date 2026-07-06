import type { Metadata } from "next";
import { Anton, JetBrains_Mono, Archivo } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rekt-report — automated crypto exploit response",
  description:
    "When a protocol gets drained, the clock starts. rekt-report traces stolen funds across chains, unattended, and produces compliance-grade evidence before the money reaches an exchange.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${mono.variable} ${archivo.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
