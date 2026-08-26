import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apple Express | Importador de Tecnología",
  description: "Descubre los mejores productos importados por Apple Express.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-slate-50 dark:bg-slate-950 dark:text-slate-100">{children}</body>
    </html>
  );
}
