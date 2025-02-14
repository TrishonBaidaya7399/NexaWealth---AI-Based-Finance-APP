import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/shared/Footer/Footer";
import TopHeader from "@/components/shared/Header/Header";
const inter = Inter({ subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* -------------- header -------------- */}
          <TopHeader />
          <main className="min-h-screen mt-[70px]">{children}</main>
          {/* -------------- footer -------------- */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
