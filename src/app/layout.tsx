import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoadBuild Construction & Equipment | Roads, Earthworks & Heavy Equipment Rental",
  description: "Leading roads and earthworks construction company providing road construction, excavation, drainage, asphalt paving, and heavy-duty equipment rental services with over 25 years of experience.",
  keywords: ["road construction", "earthworks", "excavation", "heavy equipment rental", "asphalt paving", "drainage systems", "construction company", "bulldozer rental", "excavator rental", "grading", "compaction"],
  authors: [{ name: "RoadBuild Construction & Equipment" }],
  openGraph: {
    title: "RoadBuild Construction & Equipment",
    description: "Expert road construction, earthworks, and heavy equipment rental services delivering excellence across the region.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}