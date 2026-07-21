"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const storageKey = "royal-golden-exit-offer-seen";

export default function ExitOffer() {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey)) return;
    const showOffer = (event: MouseEvent) => {
      if (event.clientY > 8) return;
      sessionStorage.setItem(storageKey, "true");
      setOpen(true);
    };
    document.addEventListener("mouseout", showOffer);
    return () => document.removeEventListener("mouseout", showOffer);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function claimOffer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = number.replace(/\D/g, "").slice(-10);
    if (digits.length !== 10) {
      setError("Enter a valid 10-digit WhatsApp number.");
      return;
    }
    const message = encodeURIComponent(`Hello, I want to claim ₹20 OFF on my first Royal Golden Mix order. My WhatsApp number is +91 ${digits}.`);
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="offer-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <section className="offer-modal" role="dialog" aria-modal="true" aria-labelledby="offer-title">
        <button className="offer-close" type="button" onClick={() => setOpen(false)} aria-label="Close offer">×</button>
        <span className="offer-gift" aria-hidden="true">🎁</span>
        <p className="eyebrow">First order offer</p>
        <h2 id="offer-title">Wait! Get <em>₹20 OFF</em></h2>
        <p>Enter your WhatsApp number to claim the offer on your first order.</p>
        <form onSubmit={claimOffer} noValidate>
          <label htmlFor="offer-whatsapp">WhatsApp number</label>
          <div className="offer-input"><span>+91</span><input ref={inputRef} id="offer-whatsapp" type="tel" inputMode="numeric" autoComplete="tel" placeholder="98765 43210" value={number} onChange={(event) => { setNumber(event.target.value); setError(""); }} /></div>
          {error && <p className="offer-error" role="alert">{error}</p>}
          <button className="button" type="submit">Claim my ₹20 off <span>→</span></button>
        </form>
        <small>No spam. Your number is used only to help complete this offer.</small>
      </section>
    </div>
  );
}
