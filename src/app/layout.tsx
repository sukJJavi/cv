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
  metadataBase: new URL("https://www.help-estudio.es/cv"),
  title: "Javier Blanco González — Creative Director & Product Architect",
  description:
    "Veinticinco años persiguiendo el píxel perfecto. Del asombro analógico al pulso de los agentes de IA.",
  keywords: [
    "Creative Director",
    "Product Architect",
    "Next.js",
    "AI",
    "Help Estudio",
    "Madrid",
    "Design",
    "WebGL",
    "Three.js",
  ],
  authors: [
    { name: "Javier Blanco González", url: "https://www.help-estudio.es" },
  ],
  openGraph: {
    title: "Javier Blanco González — Creative Director & Product Architect",
    description:
      "Veinticinco años persiguiendo el píxel perfecto. Del asombro analógico al pulso de los agentes de IA.",
    url: "https://www.help-estudio.es/cv/",
    siteName: "Help Estudio",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Javier Blanco González — Creative Director & Product Architect",
    description:
      "Veinticinco años persiguiendo el píxel perfecto. Del asombro analógico al pulso de los agentes de IA.",
  },
  alternates: {
    canonical: "https://www.help-estudio.es/cv/",
  },
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
