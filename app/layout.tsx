import type { Metadata, Viewport } from "next";
import { Montserrat, Noto_Serif_Display } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { InlineScript } from "@/components/inline-script";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const display = Noto_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mykono · Helado griego natural",
  description:
    "Greek frozen yogurt cremoso, ligero y lleno de sabor. Ingredientes naturales, opciones sin azúcar y fruta fresca todos los días.",
  openGraph: {
    title: "Mykono · Greek Frozen Yogurt",
    description: "Helado griego natural: cremoso, ligero y lleno de sabor.",
    locale: "es_MX",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ed",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html="document.documentElement.classList.add('js')" />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
