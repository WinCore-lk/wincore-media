import RecognitionBar from "@/components/RecognitionBar";
import ServicesPageContent from "@/components/ServicesPageContent";
import PageMain from "@/components/PageMain";

export const metadata = {
  title: "Services — Wincore",
  description:
    "Digital-first branding, motion, AI-powered development, and WebGL experiences by Wincore.",
};

export default function ServicesPage() {
  return (
    <PageMain>
      <RecognitionBar />
      <ServicesPageContent />
    </PageMain>
  );
}
