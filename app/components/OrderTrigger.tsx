"use client";

import type { BundleLabel } from "@/lib/bundles";

export default function OrderTrigger({ label, bundle, className = "" }: { label: string; bundle?: BundleLabel; className?: string }) {
  function selectBundle() {
    if (bundle) window.dispatchEvent(new CustomEvent("royal-select-bundle", { detail: bundle }));
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return <button type="button" className={`button ${className}`} onClick={selectBundle}>{label}<span aria-hidden="true">→</span></button>;
}
