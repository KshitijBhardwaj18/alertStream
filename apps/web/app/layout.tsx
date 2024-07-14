import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster"

const inter = Poppins({ subsets: ["latin"] , weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><Navbar/>{children}
      <Toaster/>
      </body>

    </html>
  );
}
