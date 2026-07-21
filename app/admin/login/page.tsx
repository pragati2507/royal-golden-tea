import Link from "next/link";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return <main className="admin-login"><section><Link href="/" className="brand"><span>ROYAL</span><small>GOLDEN MIX</small></Link><p className="eyebrow">Private administration</p><h1>Order dashboard</h1><p>Sign in with the Supabase admin account configured for this website.</p><LoginForm /></section></main>;
}
