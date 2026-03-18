import Hero from "@/components/Hero";
import RecognitionBar from "@/components/RecognitionBar";
import WorkCarousel from "@/components/WorkCarousel";
import AwardsStats from "@/components/AwardsStats";
import ServiceCards from "@/components/ServiceCards";
import AboutTeaser from "@/components/AboutTeaser";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <RecognitionBar />
      <WorkCarousel />
      <AwardsStats />
      <ServiceCards />
      <AboutTeaser />
      <ContactFooter />
    </main>
  );
}

