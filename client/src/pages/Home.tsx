import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Translator } from "@/components/Translator";
import { AboutCommunity } from "@/components/AboutCommunity";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader 
          title="Traductor Emberá-Español" 
          subtitle="Preservando y promoviendo el idioma y la cultura del pueblo Emberá de Colombia"
        />
        <Translator />
        <AboutCommunity />
      </main>
      <Footer />
    </div>
  );
}
