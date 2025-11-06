import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import craftsImage from "@assets/generated_images/Traditional_Emberá_handicrafts_closeup_47cfad29.png";
import weavingImage from "@assets/generated_images/Emberá_textile_weaving_process_9abbde10.png";
import musicImage from "@assets/generated_images/Traditional_Emberá_musical_instruments_c28f1c1c.png";
import ceremonyImage from "@assets/generated_images/Emberá_traditional_ceremony_gathering_566f25da.png";

export function HistoryCulture() {
  const culturalAspects = [
    {
      title: "Artesanías Tradicionales",
      description: "Cestos tejidos, collares de chaquiras y tallas en madera que reflejan su conexión con la naturaleza.",
      image: craftsImage,
      alt: "Artesanías tradicionales Emberá",
    },
    {
      title: "Tejido y Textiles",
      description: "Técnicas ancestrales de tejido con patrones geométricos que cuentan historias de su pueblo.",
      image: weavingImage,
      alt: "Proceso de tejido textil Emberá",
    },
    {
      title: "Música y Danza",
      description: "Instrumentos tradicionales como flautas y tambores acompañan ceremonias y celebraciones.",
      image: musicImage,
      alt: "Instrumentos musicales tradicionales Emberá",
    },
    {
      title: "Ceremonias Sagradas",
      description: "Rituales que conectan a la comunidad con sus ancestros y el mundo espiritual.",
      image: ceremonyImage,
      alt: "Ceremonia tradicional Emberá",
    },
  ];

  return (
    <section className="w-full py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Historia y Cultura
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Una rica herencia cultural que se mantiene viva a través de tradiciones, 
            artesanías y ceremonias ancestrales.
          </p>
        </div>

        {/* Cultural Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturalAspects.map((aspect, index) => (
            <Card key={index} className="overflow-hidden hover-elevate transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={aspect.image}
                  alt={aspect.alt}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  data-testid={`img-culture-${index}`}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{aspect.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {aspect.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="mt-16">
          <h3 className="font-heading font-bold text-2xl md:text-3xl mb-8 text-center">
            Momentos Históricos
          </h3>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                period: "Época Precolombina",
                description: "Los Emberá habitan las selvas del Pacífico, desarrollando una cultura en armonía con la naturaleza.",
              },
              {
                period: "Siglos XVI-XIX",
                description: "Resistencia y adaptación durante la colonización, manteniendo sus tradiciones y lengua.",
              },
              {
                period: "Siglo XX",
                description: "Reconocimiento de sus territorios ancestrales y derechos como pueblo indígena.",
              },
              {
                period: "Actualidad",
                description: "Esfuerzos de preservación cultural y lingüística, integrando tecnología moderna con tradiciones ancestrales.",
              },
            ].map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  {index < 3 && <div className="w-0.5 h-full bg-border mt-2" />}
                </div>
                <div className="pb-8">
                  <h4 className="font-semibold text-lg mb-1">{event.period}</h4>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
