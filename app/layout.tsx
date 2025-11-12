import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecoloop Solar Installations Map",
  description: "Interactive map showing solar installations across MA, CT, and RI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
