import { Hero, ValleyBest, QualifiersChoice, HowItWorks, Promotion, NearByCenters, AppPromotion } from "@/modules/platform/home";
import { InstitutionCourses } from "@/modules/platform/institution-courses";


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
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
