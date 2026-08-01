import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Femme Kollective | Dance & Wellness Classes in Dallas",
  description: "Dallas dance and wellness classes for women: pole, heels, floorwork, chair dance, stretch, and confidence-building movement.",
  openGraph: {
    title: "Femme Kollective | Reclaim Your Confidence",
    description: "Pole, heels, and sensual movement in Dallas.",
    images: [{ url: "/og.png", width: 1728, height: 919, alt: "Reclaim your confidence at Femme Kollective" }],
  },
  twitter: { card: "summary_large_image", title: "Femme Kollective | Reclaim Your Confidence", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
