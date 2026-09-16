import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/core/components/providers/QueryProvider";
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CoachingKart — The Digital Operating System for Coaching Institutes",
    template: "%s | CoachingKart",
  },
  description:
    "CoachingKart makes offline coaching online & accessible. Launch a plug-and-play digital storefront in minutes — live classes, recorded content, multi-center ops, student tracking & custom-branded profiles. No tech infrastructure needed.",
  keywords: [
    "CoachingKart",
    "coaching institute software",
    "digital coaching platform",
    "online coaching management",
    "coaching center management system",
    "live classes platform",
    "offline to online coaching",
    "education technology India",
    "coaching institute app",
    "multi-center coaching management",
    "student performance tracking",
    "digital storefront for coaching",
    "recorded lectures platform",
    "coaching institute digitization",
  ],
  authors: [{ name: "CoachingKart" }],
  creator: "CoachingKart",
  publisher: "CoachingKart",
  metadataBase: new URL("https://coachingkart.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://coachingkart.in",
    siteName: "CoachingKart",
    title: "CoachingKart — The Digital Operating System for Coaching Institutes",
    description:
      "Launch your coaching institute's digital storefront in minutes. Live classes, recorded content, multi-center management, student tracking & branded profiles — all without technical infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CoachingKart — Make Offline Coaching Online & Accessible",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoachingKart — The Digital Operating System for Coaching Institutes",
    description:
      "Launch your coaching institute's digital storefront in minutes. Live classes, recorded content, multi-center management & more.",
    images: ["/og-image.png"],
    creator: "@coachingkart",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logos/logo_icon.png",
    apple: "/logos/logo_icon.png",
  },
  category: "Education Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster position="top-center" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
