
  import { Montserrat } from "next/font/google";

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
          className={`${geistSans.variable} antialiased`}
        >
              {children}
        </body>
      </html>
    );
  }
