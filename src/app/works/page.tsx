import WorkCarousel from "@/components/WorkCarousel";
import RecognitionBar from "@/components/RecognitionBar";
import PageMotion from "@/components/PageMotion";

export const metadata = {
  title: "Works — Wincore Agency",
  description: "Selected campaigns and immersive digital experiences by Wincore Agency.",
};

export default function WorksPage() {
  return (
    <main className="bg-background text-foreground">
      <PageMotion>
        <div className="page-motion-item" data-page-motion>
          <RecognitionBar />
        </div>
        <div className="page-motion-item" data-page-motion>
          <WorkCarousel />
        </div>
      </PageMotion>
    </main>
  );
}

