import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

import { Atmosphere } from "@/components/atmosphere";
import { CommandProvider } from "@/components/command";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { getDomain } from "@/data/domains";
import {
  allSignals,
  precautionCount,
  risks,
  sourceCount,
} from "@/data";
import { buildSearchIndex } from "@/lib/search";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const DESCRIPTION =
  "Tripwire is an atlas of everything that could go wrong — climate tipping points, AI loss of control, ransomware, sovereign debt, pandemics, grid cascades — each with measurable warning signs, concrete precautions, and the mitigations that are actually working.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripwire-atlas.vercel.app"),
  title: {
    default: "Tripwire — an atlas of everything that could go wrong",
    template: "%s · Tripwire",
  },
  description: DESCRIPTION,
  applicationName: "Tripwire",
  keywords: [
    "risk atlas",
    "existential risk",
    "AI safety",
    "climate tipping points",
    "preparedness",
    "early warning indicators",
    "cybersecurity",
    "pandemic preparedness",
    "systemic risk",
  ],
  authors: [{ name: "Aniruddha Adak" }],
  creator: "Aniruddha Adak",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Tripwire — an atlas of everything that could go wrong",
    description: DESCRIPTION,
    siteName: "Tripwire",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tripwire — an atlas of everything that could go wrong",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const docs = buildSearchIndex(risks, (id) => getDomain(id).name);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <CommandProvider docs={docs}>
          <Atmosphere />
          <Nav count={risks.length} />
          <main className="relative z-10">{children}</main>
          <Footer
            counts={{
              risks: risks.length,
              signals: allSignals.length,
              precautions: precautionCount,
              sources: sourceCount,
            }}
          />
        </CommandProvider>
      </body>
    </html>
  );
}