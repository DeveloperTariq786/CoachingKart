import { Hero, SpecialOffer, ValleyBest, QualifiersChoice, HowItWorks, Promotion, NearByCenters } from "@/modules/platform/home";
import { InstitutionCourses } from "@/modules/platform/institution-courses";


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <InstitutionCourses />
      <QualifiersChoice />
      <Promotion />
      <NearByCenters />
      <SpecialOffer />
      <ValleyBest />
      <HowItWorks />
      {/* <TrustSection />
      <OwnerCta /> */}
    </main>
  );
}
