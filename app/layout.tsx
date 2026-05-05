import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "THESSK – Digital Marketing, Web & App Development Freelancer",
  description: "Freelance digital agency in Jaipur offering web development, app development and digital marketing services. 50+ projects, 30+ happy clients.",
  keywords: "web developer Jaipur, freelance app developer, digital marketing freelancer, THESSK agency, Next.js developer India, Flutter developer",
  authors: [{ name: "THESSK", url: "https://thessk.in" }],
  openGraph: {
    title: "THESSK – Digital Marketing, Web & App Development",
    description: "Freelance digital agency in Jaipur offering web development, app development and digital marketing services.",
    type: "website",
    url: "https://thessk.in",
  },
};

import Preloader from "@/src/components/Preloader";
import Footer from "@/src/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-[#f2f2f2] text-black overflow-x-hidden">
        <Preloader />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
