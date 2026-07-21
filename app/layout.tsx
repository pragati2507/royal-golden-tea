import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royal Golden Mix | A Regal Cup, Every Time",
  description:
    "Discover Royal Golden Mix flavoured tea concentrate—rich, aromatic tea made effortlessly for every golden moment.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
