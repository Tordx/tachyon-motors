'use client';

import { useAdminAuth } from "@/context/admin-auth-context";
import { redirect } from "next/navigation";

export default function AdminClient() {

  const {isAuthenticated} = useAdminAuth();

  if(isAuthenticated) {
    return redirect("/admin/dashboard");
  } else {
    return redirect("/admin/login");
  }
}
