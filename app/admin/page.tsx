import { redirect } from "next/navigation";
import AdminDashboard, { type AdminOrder } from "./AdminDashboard";
import { logout } from "./login/actions";
import { createServerSupabaseClient, hasSupabaseConfig } from "@/lib/supabase/server";

export default async function AdminPage() {
  if (!hasSupabaseConfig()) return <main className="admin-shell"><div className="admin-error"><h1>Admin setup required</h1><p>Add the Supabase environment variables and complete the README setup steps.</p></div></main>;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data, error } = await supabase.from("orders").select("id,order_number,bundle,quantity,notes,status,created_at,customers(name,phone,address,pin_code,city,state)").order("created_at", { ascending: false });
  return <main className="admin-shell"><header className="admin-header"><div><p className="eyebrow">Royal Golden Mix</p><h1>New Orders</h1><p>{data?.length ?? 0} total orders</p></div><form action={logout}><button type="submit">Sign out</button></form></header>{error ? <div className="admin-error"><h2>Could not load orders</h2><p>Check the Supabase migration and admin access setup.</p></div> : <AdminDashboard orders={(data ?? []) as unknown as AdminOrder[]} />}</main>;
}
