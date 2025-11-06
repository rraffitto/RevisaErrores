import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, Languages } from "lucide-react";
import bannerImage from "@assets/generated_images/Emberá_village_landscape_panorama_f36c28c5.png";

export function AboutCommunity() {
  const stats = [
    {
      icon: Users,
      label: "Población",
      value: "~200,000",
      description: "personas en Colombia y Panamá",
    },
    {
      icon: MapPin,
      label: "Regiones",
      value: "Chocó, Risaralda",
      description: "y otras zonas del Pacífico",
    },
    {
      icon: Languages,
      label: "Hablantes",
      value: "~80,000",
      description: "hablantes nativos activos",
    },
  ];

  return (
    <section className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Sobre la Comunidad Emberá
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            El pueblo Emberá es una comunidad indígena ancestral que habita principalmente 
            en las selvas tropicales del Pacífico colombiano.
          </p>
        </div>

        {/* Banner Image */}
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-12">
          <img
            src={bannerImage}
            alt="Paisaje del pueblo Emberá en Colombia"
            className="w-full h-64 md:h-96 object-cover"
            data-testid="img-community-banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 md:p-8">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white">
                Guardianes de la Selva
              </h3>
              <p className="text-white/90 mt-2">
                Una cultura milenaria en armonía con la naturaleza
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover-elevate transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-heading font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Description */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground">
              Los Emberá son conocidos por su profunda conexión con la naturaleza y sus 
              tradiciones culturales únicas. Su lengua, el emberá, es parte fundamental 
              de su identidad y patrimonio cultural.
            </p>
            <p className="text-muted-foreground">
              A través de generaciones, han mantenido viva su lengua, transmitiendo 
              conocimientos ancestrales sobre medicina tradicional, artesanías, 
              y su cosmovisión del mundo.
            </p>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground">
              Hoy en día, enfrentan el desafío de preservar su idioma y cultura en un 
              mundo en constante cambio. Proyectos como este traductor buscan apoyar 
              la revitalización lingüística y cultural del pueblo Emberá.
            </p>
            <p className="text-muted-foreground">
              Cada palabra en emberá lleva consigo siglos de sabiduría y una forma 
              única de entender y relacionarse con el entorno natural.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
