import WorkCarousel from "@/components/WorkCarousel";
import PageMain from "@/components/PageMain";
import WorksHero from "@/components/WorksHero";
import WorksModernStats from "@/components/WorksModernStats";
import BrandWall from "@/components/BrandWall";

export const metadata = {
  title: "Works — Wincore Agency",
  description: "Selected campaigns and immersive digital experiences by Wincore Agency.",
};

export default function WorksPage() {
  return (
    <PageMain>
      <WorksHero />
      <WorkCarousel />
      <BrandWall />
      <WorksModernStats />
    </PageMain>
  );
}
