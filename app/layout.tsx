import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/shared/Footer/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexaWealth",
  description: "AI Based One Stop Finance Platform",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* -------------- header -------------- */}
        <main className="min-h-screen">{children}</main>
        {/* -------------- footer -------------- */}
        <Footer />
      </body>
    </html>
  );
}
