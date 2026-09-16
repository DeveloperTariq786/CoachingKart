import type { Metadata } from "next";
import { Hero, ValleyBest, QualifiersChoice, HowItWorks, Promotion, NearByCenters, AppPromotion } from "@/modules/platform/home";
import { InstitutionCourses } from "@/modules/platform/institution-courses";

export const metadata: Metadata = {
  title: "CoachingKart — Make Offline Coaching Online & Accessible",
  description:
    "India's #1 digital operating system for coaching institutes. Launch your digital storefront in minutes — stream live classes, share recorded content, manage multi-center operations, track student performance & build custom-branded profiles. No tech infrastructure needed.",
  alternates: {
    canonical: "https://coachingkart.in",
  },
  openGraph: {
    title: "CoachingKart — Make Offline Coaching Online & Accessible",
    description:
      "India's #1 digital operating system for coaching institutes. Launch your digital storefront in minutes with live classes, recorded content, student tracking & more.",
    url: "https://coachingkart.in",
  },
  twitter: {
    title: "CoachingKart — Make Offline Coaching Online & Accessible",
    description:
      "India's #1 digital operating system for coaching institutes. Launch your digital storefront in minutes with live classes, recorded content, student tracking & more.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://coachingkart.in/#organization",
      name: "CoachingKart",
      url: "https://coachingkart.in",
      logo: {
        "@type": "ImageObject",
        url: "https://coachingkart.in/logos/logo_icon.png",
      },
      description:
        "The Digital Operating System for educational institutions that makes offline coaching online and accessible.",
      sameAs: [
        "https://twitter.com/coachingkart",
        "https://www.instagram.com/coachingkart",
        "https://www.linkedin.com/company/coachingkart",
      ],
    },
    {
      "@type": "WebApplication",
      "@id": "https://coachingkart.in/#webapp",
      name: "CoachingKart",
      url: "https://coachingkart.in",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web, Android, iOS",
      description:
        "Plug-and-play digital storefront for coaching institutes — live classes, recorded content, multi-center management, student performance tracking & custom-branded profiles.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        description: "Free to get started",
      },
      provider: {
        "@type": "Organization",
        "@id": "https://coachingkart.in/#organization",
      },
      featureList: [
        "Live class streaming",
        "Recorded content sharing",
        "Multi-center operations management",
        "Student performance tracking",
        "Custom-branded institute profiles",
        "Digital storefront creation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://coachingkart.in/#website",
      url: "https://coachingkart.in",
      name: "CoachingKart",
      publisher: {
        "@type": "Organization",
        "@id": "https://coachingkart.in/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://coachingkart.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <InstitutionCourses />
      <NearByCenters />
      <QualifiersChoice />
      {/* <Promotion /> */}

      {/* <SpecialOffer /> */}
      <ValleyBest />
      {/* <HowItWorks /> */}
      {/* <TrustSection />
      <OwnerCta /> */}
      <AppPromotion />
    </main>
  );
}
