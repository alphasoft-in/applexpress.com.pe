import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CompareBar } from "@/components/CompareBar";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://appleexpress.com.pe"),

  title: {
    default: "Apple Express Peru | MacBook, iPhone, iPad importados de EE.UU.",
    template: "%s | Apple Express Peru",
  },
  description:
    "Importamos MacBook Pro, iPhone 15, iPad Pro y AirPods directamente desde Estados Unidos. Garantia total, precios competitivos y envio a todo el Peru.",
  keywords: [
    "MacBook Peru",
    "iPhone Peru",
    "iPad Peru",

    "AirPods Peru",
    "importador Apple Peru",
    "MacBook Pro Lima",
    "iPhone Lima",
    "tecnologia Apple Lima",
    "Apple Express",
    "MacBook importado",
    "iPhone importado Peru",
    "comprar MacBook Peru",
    "comprar iPhone Peru",
  ],
  authors: [{ name: "Apple Express Peru" }],
  creator: "Apple Express Peru",
  publisher: "FHARMAG S.A.C.",
  category: "Tecnologia",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://appleexpress.com.pe",
    siteName: "Apple Express Peru",
    title: "Apple Express Peru | MacBook, iPhone, iPad importados de EE.UU.",
    description:
      "Importamos MacBook Pro, iPhone 15, iPad Pro y AirPods desde Estados Unidos. Garantia total y envio a todo el Peru.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Apple Express Peru — Importadora oficial de tecnologia Apple",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Apple Express Peru | MacBook, iPhone, iPad importados",
    description:
      "MacBook Pro, iPhone 15, iPad Pro y AirPods importados de EE.UU. Garantia total. Envio a todo el Peru.",
  },

  alternates: {
    canonical: "https://appleexpress.com.pe",
    languages: {
      "es-PE": "https://appleexpress.com.pe",
    },
  },

  verification: {
    google: "",  // Agrega tu Google Search Console verification code aqui
  },

  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Apple Express",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-slate-50 dark:bg-slate-950 dark:text-slate-100">
        {children}
        <CompareBar />
        <AnalyticsTracker />
      </body>
    </html>
  );
}