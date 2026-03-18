import WorkCarousel from "@/components/WorkCarousel";
import RecognitionBar from "@/components/RecognitionBar";

export const metadata = {
  title: "Works — Wincore Agency",
  description: "Selected campaigns and immersive digital experiences by Wincore Agency.",
};

export default function WorksPage() {
  return (
    <main className="bg-background text-foreground">
      <RecognitionBar />
      <WorkCarousel />
    </main>
  );
}

