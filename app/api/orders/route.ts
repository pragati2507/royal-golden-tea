import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { BUNDLE_LABELS } from "@/lib/bundles";

type OrderPayload = {
  name?: string; phone?: string; address?: string; pinCode?: string;
  city?: string; state?: string; bundle?: string; quantity?: number; notes?: string;
};

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json({ error: "Ordering is being configured. Please try again soon." }, { status: 503 });

  const body = (await request.json()) as OrderPayload;
  const phone = body.phone?.replace(/\D/g, "") ?? "";
  const pinCode = body.pinCode?.replace(/\D/g, "") ?? "";
  const quantity = Number(body.quantity);

  if (!body.name?.trim() || !body.address?.trim() || !body.city?.trim() || !body.state?.trim())
    return NextResponse.json({ error: "Please complete every required field." }, { status: 400 });
  if (!/^[6-9]\d{9}$/.test(phone)) return NextResponse.json({ error: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });
  if (!/^[1-9]\d{5}$/.test(pinCode)) return NextResponse.json({ error: "Enter a valid 6-digit PIN code." }, { status: 400 });
  if (!body.bundle || !BUNDLE_LABELS.includes(body.bundle as (typeof BUNDLE_LABELS)[number])) return NextResponse.json({ error: "Select a valid product option." }, { status: 400 });
  if (!Number.isInteger(quantity) || quantity < 1) return NextResponse.json({ error: "Quantity must be at least 1." }, { status: 400 });

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase.rpc("submit_order", {
    customer_name: body.name.trim(), customer_phone: phone, customer_address: body.address.trim(),
    customer_pin_code: pinCode, customer_city: body.city.trim(), customer_state: body.state.trim(),
    selected_bundle: body.bundle, order_quantity: quantity, order_notes: body.notes?.trim() || null,
  });

  if (error) {
    console.error("Order submission failed", error.code);
    return NextResponse.json({ error: "We could not place your order. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ orderNumber: data });
}
