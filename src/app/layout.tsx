import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RETINA | The Hedge Fund Edge, Democratised",
  description: "Institutional-grade automated execution derived from the RETINA Q1R5 quantum architecture. Verified 52.9% win rate on global equities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0f1117] text-slate-200 antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
