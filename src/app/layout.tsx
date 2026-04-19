import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/organisms/Navbar";
import Footer from "../app/components/organisms/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


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
    <html lang="id" className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <body className={`${inter.className} bg-[#0F172A] text-white antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}