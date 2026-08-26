import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://applexpress.com.pe"),

  title: {
    default: "Apple Express Peru | MacBook, iPhone, iPad importados de EE.UU.",
    template: "%s | Apple Express Peru",
  },
  description:
    "Importamos MacBook Pro, iPhone 15, iPad Pro, Apple Watch y AirPods directamente desde Estados Unidos. Garantia total, precios competitivos y envio a todo el Peru.",
  keywords: [
    "MacBook Peru",
    "iPhone Peru",
    "iPad Peru",
    "Apple Watch Peru",
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
    url: "https://applexpress.com.pe",
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
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://applexpress.com.pe",
    languages: {
      "es-PE": "https://applexpress.com.pe",
    },
  },

  verification: {
    google: "",  // Agrega tu Google Search Console verification code aqui
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-slate-50 dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}