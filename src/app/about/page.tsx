import AboutTeaser from "@/components/AboutTeaser";
import AwardsStats from "@/components/AwardsStats";
import RecognitionBar from "@/components/RecognitionBar";

export const metadata = {
  title: "About — Wincore Agency",
  description: "Colombo-based, globally delivered. Meet Wincore Agency (Wincore Media).",
};

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <RecognitionBar />
      <AboutTeaser />
      <AwardsStats />
    </main>
  );
}

