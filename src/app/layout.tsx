import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = "https://cv-psi-ochre.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Javier Blanco González — Creative Technologist & Product Architect",
    template: "%s | Javier Blanco González",
  },
  description:
    "Veinticinco años persiguiendo el píxel perfecto. Del asombro analógico al pulso de los agentes de IA. Trayectoria, dirección de arte y laboratorio de software.",
  keywords: [
    "Creative Technologist",
    "Product Architect",
    "Javier Blanco González",
    "Help Estudio",
    "Next.js",
    "AI",
    "Madrid",
    "Design Engineering",
    "WebGL",
    "Three.js",
  ],
  authors: [
    { name: "Javier Blanco González", url: "https://www.help-estudio.es" },
  ],
  creator: "Javier Blanco González",
  publisher: "Help Estudio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Javier Blanco González — Creative Technologist & Product Architect",
    description:
      "Veinticinco años persiguiendo el píxel perfecto. Del asombro analógico al pulso de los agentes de IA.",
    url: siteUrl,
    siteName: "Javier Blanco González · Portfolio",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Javier Blanco González — Constelación de partículas y sinapsis neuronal digital",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Javier Blanco González — Creative Technologist & Product Architect",
    description:
      "Veinticinco años persiguiendo el píxel perfecto. Del asombro analógico al pulso de los agentes de IA.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Javier Blanco González — Constelación de partículas y sinapsis neuronal digital",
      },
    ],
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
  alternates: {
    canonical: siteUrl,
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
