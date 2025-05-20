import type { Metadata } from "next";
import { Inter, Indie_Flower, Cinzel } from "next/font/google";
import "./globals.css";
import { CrazyTransition } from "./components/pageTransition";

const inter = Inter({ subsets: ["latin"] });

const indieFlower = Indie_Flower({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-indie-flower',
  display: 'swap',
});

const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Amit Samant",
  description: "Created with care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${indieFlower.variable} ${cinzel.variable} antialiased`}>
        <CrazyTransition>
          {children}
        </CrazyTransition>
      </body>
    </html>
  );
}