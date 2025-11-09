import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { AboutCommunity } from "@/components/AboutCommunity";
import { HistoryCulture } from "@/components/HistoryCulture";
import { LanguageSection } from "@/components/LanguageSection";
import { Gallery } from "@/components/Gallery";
import { ResguardoMap } from "@/components/ResguardoMap";
import { CulturalVideos } from "@/components/CulturalVideos";
import { FestivosCalendar } from "@/components/FestivosCalendar";

export default function Community() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader 
          title="La Comunidad Emberá" 
          subtitle="Descubre la rica cultura, historia y tradiciones del pueblo Emberá de Colombia"
        />
        <AboutCommunity />
        <ResguardoMap />
        <HistoryCulture />
        <LanguageSection />
        <CulturalVideos />
        <FestivosCalendar />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
