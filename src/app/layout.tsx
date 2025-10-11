import Header from "@/components/layouts/header";
import {  Montserrat } from "next/font/google";

import "./globals.css";
import { Metadata } from "next";
const geistSans = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Tachyon",
  description: "Tacheyon Motors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={ `${geistSans.variable} antialiased`}
      >
        <main className="min-h-screen w-full flex flex-col items-center justify-center">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
