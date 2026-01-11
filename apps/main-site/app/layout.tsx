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
    default: "NeurallEmpire | AI-Powered SaaS Solutions for Modern Businesses",
    template: "%s | NeurallEmpire"
  },
  description: "Transform your business with NeurallEmpire's suite of AI-powered SaaS products. From CRM to vendor management, milk delivery to construction ERP - we've got you covered.",
  keywords: ["AI SaaS platform", "business automation", "custom CRM", "vendor management", "milk delivery software", "construction ERP", "property management", "Nandos POS", "AI-powered business tools"],
  authors: [{ name: "NeurallEmpire" }],
  creator: "NeurallEmpire",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.neurallempire.com",
    siteName: "NeurallEmpire",
    title: "NeurallEmpire | AI-Powered SaaS Solutions for Modern Businesses",
    description: "Transform your business with NeurallEmpire's suite of AI-powered SaaS products.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NeurallEmpire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeurallEmpire | AI-Powered SaaS Solutions",
    description: "AI-powered SaaS products for modern businesses",
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
