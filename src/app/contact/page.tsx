import ContactPageContent from "@/components/ContactPageContent";
import PageMain from "@/components/PageMain";

export const metadata = {
  title: "Contact — Wincore",
  description: "Get in touch with Wincore. Based in Sri Lanka, serving global clients.",
};

export default function ContactPage() {
  return (
    <PageMain variant="inner">
      <ContactPageContent />
    </PageMain>
  );
}
