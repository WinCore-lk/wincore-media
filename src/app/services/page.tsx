import RecognitionBar from "@/components/RecognitionBar";
import ServicesPageContent from "@/components/ServicesPageContent";
import PageMotion from "@/components/PageMotion";

export const metadata = {
  title: "Services — Wincore Agency",
  description: "Digital-first branding, motion, AI-powered development, and WebGL experiences by Wincore Agency.",
};

export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="relative">
        <RecognitionBar />
        <ServicesPageContent />
      </div>
    </main>
  );
}

