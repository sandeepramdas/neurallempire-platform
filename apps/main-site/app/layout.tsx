import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "AI-First Digital Systems Architect | Custom CRM & Internal Software",
    template: "%s | AI Systems Architect"
  },
  description: "Transform your business operations with custom digital systems designed for how you actually work. AI-powered, scalable, and built to evolve with you.",
  keywords: ["custom CRM development", "fractional CTO services", "custom ERP system", "AI business automation", "digital systems consultant", "custom business software"],
  authors: [{ name: "AI Systems Architect" }],
  creator: "AI Systems Architect",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    siteName: "AI Systems Architect",
    title: "AI-First Digital Systems Architect | Custom CRM & Internal Software",
    description: "Transform your business operations with custom digital systems designed for how you actually work.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Systems Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-First Digital Systems Architect",
    description: "Custom digital systems for growing businesses",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
