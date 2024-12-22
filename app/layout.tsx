import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YTForge | YTMP4 ",
  openGraph: {
    description: "A YTMP4 Web App that works, no ads, nothing extra, Just YTMP4.",
  },
  metadataBase: new URL("https://yt-forge.vercel.app/"),
  keywords: ["YTForge", "YTMP4", "youtube to mp4", "ytmp4", "y2mp4", "yt-forge", "youtube forge"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
