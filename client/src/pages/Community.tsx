import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
        <div className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
              La Comunidad Emberá
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre la rica cultura, historia y tradiciones del pueblo Emberá de Colombia
            </p>
          </div>
        </div>
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
