import type { Metadata } from "next";
import { Poppins, Space_Grotesk, Space_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.scss";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { Navigation } from "@/components/Navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LoaderProvider } from "@/lib/loader-context";

const spaceGrotesk = Space_Grotesk({
  variable: "--next-font-display",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--next-font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--next-font-numeral",
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const { metadata: meta } = site;

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: `%s - ${site.name}`,
  },
  description: meta.description,
  metadataBase: new URL(meta.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: meta.url,
    siteName: meta.siteName,
    title: meta.title,
    description: meta.description,
    locale: meta.locale,
    images: [{ url: meta.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: meta.description,
  url: meta.url,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location,
  },
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${poppins.variable}`}
    >
      <body>
        <LoaderProvider>
          <CustomCursor />
          <Preloader />
          <Navigation />
          <SmoothScroll>{children}</SmoothScroll>
        </LoaderProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
