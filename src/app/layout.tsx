import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import FloatingParticles from "@/components/FloatingParticles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sualp Danacı — Software Engineer",
  description:
    "High-adaptability software engineer with a multidisciplinary background.",
  openGraph: {
    title: "Sualp Danacı — Software Engineer",
    description: "Personal portfolio of Sualp Danacı",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CustomCursor />
        <NoiseOverlay />
        <FloatingParticles />
        {children}
      </body>
    </html>
  );
}
