"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient, hasSupabaseConfig } from "@/lib/supabase/server";

export async function login(_: { error?: string }, formData: FormData) {
  if (!hasSupabaseConfig()) return { error: "Supabase environment variables are not configured." };
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email: String(formData.get("email") || ""), password: String(formData.get("password") || "") });
  if (error) return { error: "Invalid email or password." };
  redirect("/admin");
}

export async function logout() {
  if (hasSupabaseConfig()) (await createServerSupabaseClient()).auth.signOut();
  redirect("/admin/login");
}
