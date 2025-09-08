import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight:['200','300','400','500','600','700','800','900']
});

export const metadata: Metadata = {
  title: "Sommaire - AI-Powered PDF Summarization",
  description: "Save Hours of Reading Time. Transform Lengthy PDFs into clear, accurate summaries in seconds with our Advanced AI Technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${fontSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
