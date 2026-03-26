import AboutPageContent from "@/components/AboutPageContent";
import PageMotion from "@/components/PageMotion";
import PageMain from "@/components/PageMain";
import ContactFooter from "@/components/ContactFooter";

export const metadata = {
  title: "About — Wincore",
  description: "Colombo-based, globally delivered. Meet Wincore.",
};

export default function AboutPage() {
  return (
    <PageMain>
      <PageMotion>
        <div className="page-motion-item" data-page-motion>
          <AboutPageContent />
        </div>
        <div className="page-motion-item" data-page-motion>
          <ContactFooter />
        </div>
      </PageMotion>
    </PageMain>
  );
}
