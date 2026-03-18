import ServiceCards from "@/components/ServiceCards";
import RecognitionBar from "@/components/RecognitionBar";

export const metadata = {
  title: "Services — Wincore Agency",
  description: "Digital-first branding, motion, AI-powered development, and WebGL experiences by Wincore Agency.",
};

export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground">
      <RecognitionBar />
      <ServiceCards />
    </main>
  );
}

