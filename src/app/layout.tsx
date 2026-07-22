import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter, Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import ContactPopup from "@/components/layout/ContactPopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Futurr Edge | Premium Web Development & AI Automation Agency",
  description: "We design premium websites and AI automation systems that turn visitors into customers. Book a free consultation with Futurr Edge today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ContactPopup />
        </SmoothScrollProvider>
        <GoogleAnalytics gaId="G-49PBYYRQDG" />
      </body>
    </html>
  );
}
