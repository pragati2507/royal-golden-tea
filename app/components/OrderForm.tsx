"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { BUNDLES, type BundleLabel } from "@/lib/bundles";

type FormData = { name: string; phone: string; address: string; pinCode: string; city: string; state: string; bundle: BundleLabel; quantity: number; notes: string };
type Success = FormData & { orderNumber: string };

const initialForm: FormData = { name: "", phone: "", address: "", pinCode: "", city: "", state: "", bundle: BUNDLES[0].label, quantity: 1, notes: "" };

export default function OrderForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<Success | null>(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    const select = (event: Event) => setForm((current) => ({ ...current, bundle: (event as CustomEvent<BundleLabel>).detail }));
    window.addEventListener("royal-select-bundle", select);
    return () => window.removeEventListener("royal-select-bundle", select);
  }, []);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.address.trim().length < 5) next.address = "Enter your complete delivery address.";
    if (!/^[1-9]\d{5}$/.test(form.pinCode.replace(/\D/g, ""))) next.pinCode = "Enter a valid 6-digit PIN code.";
    if (form.city.trim().length < 2) next.city = "Enter your city.";
    if (form.state.trim().length < 2) next.state = "Enter your state.";
    if (!Number.isInteger(form.quantity) || form.quantity < 1) next.quantity = "Quantity must be at least 1.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current || !validate()) return;
    submittingRef.current = true;
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = (await response.json()) as { orderNumber?: string; error?: string };
      if (!response.ok || !result.orderNumber) throw new Error(result.error || "Unable to place order.");
      setSuccess({ ...form, orderNumber: result.orderNumber });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to place order. Please try again.");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  if (success) return <OrderConfirmation order={success} onReset={() => { setSuccess(null); setForm(initialForm); }} />;

  return (
    <section id="order" className="section order-section">
      <div className="order-intro"><p className="eyebrow light">Order online</p><h2>Tell us where to<br /><em>deliver your tea.</em></h2><p>No online payment is collected. Submit your order and our team will confirm availability, delivery, and payment details.</p><div className="order-trust"><span>✓ Secure order request</span><span>✓ Home delivery</span><span>✓ No payment now</span></div></div>
      <form className="order-form" onSubmit={submit} noValidate>
        <div className="form-grid">
          <Field label="Full name" error={errors.name}><input value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" required /></Field>
          <Field label="Phone" error={errors.phone}><input value={form.phone} onChange={(e) => update("phone", e.target.value)} inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="10-digit mobile number" required /></Field>
          <Field label="Complete address" error={errors.address} wide><textarea value={form.address} onChange={(e) => update("address", e.target.value)} autoComplete="street-address" rows={3} required /></Field>
          <Field label="PIN code" error={errors.pinCode}><input value={form.pinCode} onChange={(e) => update("pinCode", e.target.value)} inputMode="numeric" autoComplete="postal-code" maxLength={6} required /></Field>
          <Field label="City" error={errors.city}><input value={form.city} onChange={(e) => update("city", e.target.value)} autoComplete="address-level2" required /></Field>
          <Field label="State" error={errors.state}><input value={form.state} onChange={(e) => update("state", e.target.value)} autoComplete="address-level1" required /></Field>
          <Field label="Product option"><select value={form.bundle} onChange={(e) => update("bundle", e.target.value as BundleLabel)}>{BUNDLES.map((bundle) => <option key={bundle.id}>{bundle.label}</option>)}</select></Field>
          <Field label="Quantity" error={errors.quantity}><input type="number" min="1" step="1" value={form.quantity} onChange={(e) => update("quantity", Number(e.target.value))} required /></Field>
          <Field label="Notes (optional)" wide><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} maxLength={1000} placeholder="Delivery landmark or other helpful details" /></Field>
        </div>
        {message && <p className="form-message error-message" role="alert">{message}</p>}
        <button className="button submit-order" type="submit" disabled={submitting}>{submitting ? "Placing your order…" : "Place order request"}<span>→</span></button>
        <small>By submitting, you agree to be contacted about this order.</small>
      </form>
    </section>
  );
}

function Field({ label, error, wide = false, children }: { label: string; error?: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={`form-field ${wide ? "wide" : ""}`}><span>{label}</span>{children}{error && <small className="field-error">{error}</small>}</label>;
}

function OrderConfirmation({ order, onReset }: { order: Success; onReset: () => void }) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER?.replace(/\D/g, "") || "";
  const address = `${order.address}, ${order.city}, ${order.state} - ${order.pinCode}`;
  const text = encodeURIComponent(`Hello, I placed an order for Royal Golden Mix Tea.\n\nName: ${order.name}\nOrder number: ${order.orderNumber}\nProduct: ${order.bundle}\nQuantity: ${order.quantity}\nAddress: ${order.address}\nPIN code: ${order.pinCode}\nCity: ${order.city}\nState: ${order.state}\nNotes: ${order.notes || "None"}`);
  const whatsappUrl = number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
  return <section id="order" className="section confirmation-section"><div className="confirmation-card"><span className="success-mark">✓</span><p className="eyebrow">Order received</p><h2>Thank you,<br /><em>{order.name}.</em></h2><p className="order-number">Order number <strong>{order.orderNumber}</strong></p><dl><div><dt>Product</dt><dd>{order.bundle}</dd></div><div><dt>Quantity</dt><dd>{order.quantity}</dd></div><div><dt>Phone</dt><dd>{order.phone}</dd></div><div><dt>Delivery address</dt><dd>{address}</dd></div><div><dt>Notes</dt><dd>{order.notes || "None"}</dd></div></dl><a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">Send Order on WhatsApp <span>→</span></a><button className="confirmation-reset" type="button" onClick={onReset}>Place another order</button></div></section>;
}
