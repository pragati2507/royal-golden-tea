import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royal Golden Mix Tea | Strong Taste | Rich Colour | Order Online",
  description:
    "Buy Royal Golden Mix Tea online. Strong taste, rich colour and fresh aroma. Home delivery across India.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
