import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Volume2, MessageCircle } from "lucide-react";
import languageImage from "@assets/generated_images/Emberá_language_teaching_scene_15d44657.png";

export function LanguageSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Estructura del Idioma",
      description: "El emberá es una lengua aglutinante con una rica morfología y sistema de prefijos y sufijos.",
    },
    {
      icon: Volume2,
      title: "Fonética Única",
      description: "Posee sonidos distintivos que reflejan los sonidos de la naturaleza que rodea a la comunidad.",
    },
    {
      icon: MessageCircle,
      title: "Tradición Oral",
      description: "Historias, mitos y conocimientos se transmiten oralmente de generación en generación.",
    },
  ];

  const commonPhrases = [
    { embera: "Panabá", spanish: "Hola", pronunciation: "pa-na-bá" },
    { embera: "Jinú parásida", spanish: "Buenos días", pronunciation: "ji-nú pa-rá-si-da" },
    { embera: "Benkruá", spanish: "Gracias", pronunciation: "ben-kru-á" },
    { embera: "Juí", spanish: "Agua", pronunciation: "ju-í" },
  ];

  return (
    <section className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            El Idioma Emberá
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Una lengua viva que conecta al pueblo Emberá con sus raíces ancestrales 
            y su entorno natural.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Image */}
          <div className="order-2 md:order-1">
            <img
              src={languageImage}
              alt="Enseñanza del idioma Emberá"
              className="w-full rounded-xl shadow-lg"
              data-testid="img-language-teaching"
            />
          </div>

          {/* Features */}
          <div className="space-y-6 order-1 md:order-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Common Phrases */}
        <div className="mt-16">
          <h3 className="font-heading font-bold text-2xl md:text-3xl mb-8 text-center">
            Frases Comunes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {commonPhrases.map((phrase, index) => (
              <Card key={index} className="hover-elevate transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{phrase.embera}</CardTitle>
                  <p className="text-sm text-muted-foreground italic">
                    /{phrase.pronunciation}/
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">{phrase.spanish}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Datos Interesantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">🌿 Nombres de la Naturaleza</h4>
                <p className="text-muted-foreground">
                  Muchas palabras en emberá describen elementos específicos de la selva tropical, 
                  reflejando el profundo conocimiento ecológico del pueblo.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📚 Variantes Regionales</h4>
                <p className="text-muted-foreground">
                  Existen diferentes dialectos del emberá según la región, como el emberá-catío 
                  y el emberá-chamí, cada uno con sus particularidades.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✍️ Preservación Digital</h4>
                <p className="text-muted-foreground">
                  Proyectos modernos combinan la tradición oral con herramientas digitales 
                  para documentar y preservar el idioma para futuras generaciones.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
