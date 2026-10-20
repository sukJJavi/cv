import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const serifFont = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: false,
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Javier Blanco González (JBG.) — Director Creativo & Product Architect",
  description:
    "Veinticinco años persiguiendo el píxel perfecto. Ideas que se convierten en sistemas. Sistemas que se sienten humanos. Fundador de Help Estudio & Help Estudio Lab.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${serifFont.variable} ${monoFont.variable} ${sansFont.variable} dark`}
    >
      <body className="bg-[#050505] text-[#EAE8E3] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
