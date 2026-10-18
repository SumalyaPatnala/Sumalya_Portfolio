import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SkipLink } from "@/components/SkipLink";
import { ThemeScript } from "@/components/ThemeScript";
import { getSiteUrl, site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const url = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${site.name} · ${site.headline}`,
    template: `%s · ${site.name}`,
  },
  description: site.supporting,
  authors: [{ name: site.name, url }],
  openGraph: {
    title: `${site.name} · ${site.headline}`,
    description: site.tagline,
    url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
  },
  alternates: {
    canonical: url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
