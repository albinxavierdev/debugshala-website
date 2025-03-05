import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DebugShala - Premier Training Institute in Indore",
  description: "DebugShala is Indore's leading training and placement institute offering courses in Data Science, Java Development, and MERN Stack.",
  keywords: "DebugShala, training institute, placement, Indore, data science, Java development, MERN stack, coding bootcamp",
  authors: [{ name: "DebugShala Team" }],
  generator: "Next.js",
  metadataBase: new URL("https://debugshala.com"),
  openGraph: {
    type: "website",
    title: "DebugShala - Premier Training Institute in Indore",
    description: "Unlock your potential with DebugShala, Indore's premier training and placement institute",
    siteName: "DebugShala",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
