import ContactFooter from "@/components/ContactFooter";
import RecognitionBar from "@/components/RecognitionBar";
import PageMotion from "@/components/PageMotion";

export const metadata = {
  title: "Contact — Wincore Agency",
  description: "Get in touch with Wincore Agency. Based in Sri Lanka, serving global clients.",
};

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <PageMotion>
        <div className="page-motion-item" data-page-motion>
          <RecognitionBar />
        </div>
        <div className="page-motion-item" data-page-motion>
          <ContactFooter />
        </div>
      </PageMotion>
    </main>
  );
}

