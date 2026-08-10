import type { Metadata, Viewport } from "next";
import { Cinzel, Anton, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WaitlistCta } from "@/components/WaitlistCta";
import { brand } from "@/lib/placeholder-data";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  // viewport-fit=cover lets the fixed waitlist CTA respect the iOS home indicator
  viewportFit: "cover",
  themeColor: "#0b0a08",
};

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — Designer Gorilla Rottweilers in Arizona`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Premium Rottweiler puppies from respected Serbian and European bloodlines in Arizona. FCI/KSS health tested, big blocky Designer Gorillas. Loving Family Protectors — join the waitlist.",
  keywords: [
    "rottweiler puppies Arizona",
    "Rottweiler breeder Arizona",
    "Designer Gorilla Rottweilers",
    "blocky Rottweilers",
    "European bloodline Rottweilers",
  ],
  openGraph: {
    title: `${brand.name} — Designer Gorilla Rottweilers`,
    description:
      "Serbian and European bloodlines. FCI/KSS health tested, big blocky Rottweilers in Arizona.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-bone">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <WaitlistCta />
      </body>
    </html>
  );
}
