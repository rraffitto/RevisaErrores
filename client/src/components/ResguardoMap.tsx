import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ResguardoMap() {
  return (
    <section className="w-full py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Ubicación del Resguardo
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mapa del Resguardo Alto Río Bojayá, hogar del pueblo Emberá Dobida
          </p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden">
          <CardHeader>
            <CardTitle>Resguardo Alto Río Bojayá</CardTitle>
            <CardDescription>
              Territorio indígena ubicado en el departamento del Chocó, Colombia
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative pb-[56.25%] h-0 overflow-hidden bg-muted">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127165.48654425848!2d-76.98!3d5.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNTcnMDAuMCJOIDc2wrA1OCc0OC4wIlc!5e0!3m2!1sen!2sco!4v1234567890"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa del Resguardo Alto Río Bojayá"
                data-testid="iframe-resguardo-map"
              />
            </div>
            <div className="p-4 bg-background">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Ubicación:</span> Alto Río Bojayá, Chocó, Colombia
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">Región:</span> Pacífico colombiano
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
