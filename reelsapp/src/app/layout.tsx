import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReelsApp — Repurposing vidéo IA",
  description: "Transformez n'importe quelle vidéo en Shorts, Reels et TikToks viraux.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr" className="h-full">
        <body className={`${inter.className} min-h-full bg-gray-950 text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
