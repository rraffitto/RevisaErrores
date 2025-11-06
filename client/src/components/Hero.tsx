import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Emberá_community_in_traditional_dress_9487b4ea.png";

export function Hero() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[500px] md:min-h-[600px]">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Preservando el Idioma Emberá
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Descubre y aprende la lengua del pueblo Emberá de Colombia. 
              Un puente cultural entre tradiciones ancestrales y el mundo moderno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#traductor">
                <Button size="lg" className="group" data-testid="button-comenzar-traducir">
                  Comenzar a Traducir
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/comunidad">
                <Button size="lg" variant="outline" data-testid="button-conocer-comunidad">
                  Conocer la Comunidad
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Comunidad Emberá en vestimenta tradicional"
                className="w-full h-auto object-cover"
                data-testid="img-hero"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
