import type { Metadata } from "next";
import { Archivo, Cedarville_Cursive } from "next/font/google";
import "./globals.css";
import { CrazyTransition } from "./components/pageTransition";

// Two faces for the whole site: a grotesque (Archivo, with its width axis so
// headlines can run tall and condensed) that carries every heading and
// paragraph, and the script from the neon sign for signature moments only.
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const script = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amit Samant | Quality engineer, AI product builder, artist",
  description:
    "Full-stack developer, quality engineering lead and digital artist in Arlington, Texas. See the AI products, the work history, and the art, then get in touch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${script.variable} font-sans antialiased`}>
        <CrazyTransition>{children}</CrazyTransition>
      </body>
    </html>
  );
}
