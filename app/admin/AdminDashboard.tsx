"use client";

import { useMemo, useState } from "react";

export type AdminOrder = { id: string; order_number: string; bundle: string; quantity: number; notes: string | null; status: string; created_at: string; customers: { name: string; phone: string; address: string; pin_code: string; city: string; state: string } | null };

export default function AdminDashboard({ orders }: { orders: AdminOrder[] }) {
  const [search, setSearch] = useState(""); const [status, setStatus] = useState("all");
  const filtered = useMemo(() => orders.filter((order) => {
    const needle = search.toLowerCase();
    const matchesSearch = !needle || order.order_number.toLowerCase().includes(needle) || order.customers?.name.toLowerCase().includes(needle) || order.customers?.phone.includes(needle);
    return matchesSearch && (status === "all" || order.status === status);
  }), [orders, search, status]);

  function exportCsv() {
    const headings = ["Order Number","Status","Customer","Phone","Address","Bundle","Quantity","Notes","Created At"];
    const quote = (value: unknown) => `"${String(value ?? "").replaceAll('"','""')}"`;
    const rows = filtered.map((order) => [order.order_number,order.status,order.customers?.name,order.customers?.phone,formatAddress(order),order.bundle,order.quantity,order.notes,new Date(order.created_at).toISOString()]);
    const blob = new Blob([[headings, ...rows].map((row) => row.map(quote).join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `royal-golden-orders-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
  }

  return <><div className="admin-toolbar"><label>Search orders<input type="search" placeholder="Name, phone or order number" value={search} onChange={(e) => setSearch(e.target.value)} /></label><label>Status<select value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">All statuses</option>{["new","confirmed","dispatched","delivered","cancelled"].map((item) => <option key={item}>{item}</option>)}</select></label><button className="button" onClick={exportCsv} disabled={!filtered.length}>Export CSV</button></div>{filtered.length ? <div className="orders-list">{filtered.map((order) => <article className="order-card" key={order.id}><div className="order-card-head"><strong>{order.order_number}</strong><span className={`status status-${order.status}`}>{order.status}</span></div><div className="order-details"><p><small>Customer</small>{order.customers?.name}</p><p><small>Phone</small>{order.customers?.phone}</p><p className="wide"><small>Complete address</small>{formatAddress(order)}</p><p><small>Product</small>{order.bundle}</p><p><small>Quantity</small>{order.quantity}</p><p className="wide"><small>Notes</small>{order.notes || "—"}</p><p className="wide"><small>Date and time</small>{new Intl.DateTimeFormat("en-IN", { dateStyle:"medium", timeStyle:"short" }).format(new Date(order.created_at))}</p></div></article>)}</div> : <div className="admin-empty"><h2>No orders found</h2><p>New customer orders will appear here.</p></div>}</>;
}

function formatAddress(order: AdminOrder) { const c=order.customers; return c ? `${c.address}, ${c.city}, ${c.state} - ${c.pin_code}` : "—"; }
