"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, { error: undefined } as { error?: string });
  return <form action={action} className="admin-login-form"><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{state.error && <p role="alert">{state.error}</p>}<button className="button" disabled={pending}>{pending ? "Signing in…" : "Secure sign in"}</button></form>;
}
