
import Header from "@/components/layouts/header";

import "../globals.css";
import { Metadata } from "next";
import { AuthProvider } from "@/context/auth-context";
import { Suspense } from "react";
import LoginModal from "./auth/components/login-modal";

export const metadata: Metadata = {
  title: "Tachyon",
  description: "Tacheyon Motors",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AuthProvider>
      <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#171717]">
        <Header />
        {children}
      </main>
      <Suspense fallback={null}>
        <LoginModal />
      </Suspense>
    </AuthProvider>
  );
}
