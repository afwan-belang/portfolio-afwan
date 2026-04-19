import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/organisms/Navbar";
import Footer from "../app/components/organisms/Footer";

// Optimasi font bawaan Next.js
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammad Haikal Afwan | Full-Stack Engineer",
  description: "Portofolio profesional Muhammad Haikal Afwan, Software Engineer dengan keahlian React, Spring Boot, dan Web3.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0F172A] text-white antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}