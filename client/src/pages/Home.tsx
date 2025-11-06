import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Translator } from "@/components/Translator";
import { AboutCommunity } from "@/components/AboutCommunity";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Translator />
        <AboutCommunity />
      </main>
      <Footer />
    </div>
  );
}
