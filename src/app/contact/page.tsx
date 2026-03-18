import ContactFooter from "@/components/ContactFooter";
import RecognitionBar from "@/components/RecognitionBar";

export const metadata = {
  title: "Contact — Wincore Agency",
  description: "Get in touch with Wincore Agency. Based in Sri Lanka, serving global clients.",
};

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <RecognitionBar />
      <ContactFooter />
    </main>
  );
}

