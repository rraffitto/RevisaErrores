import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FestivosCalendar() {
  return (
    <section className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Calendario de Festivos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Festivos en Colombia - Calendario cultural
          </p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden">
          <CardHeader>
            <CardTitle>Festivos en Colombia</CardTitle>
            <CardDescription>
              Calendario de días festivos y celebraciones en Colombia
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative" style={{ paddingBottom: "600px", height: 0, overflow: "hidden" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.google.com/calendar/embed?color=%2316a765&src=es.co%23holiday@group.v.calendar.google.com"
                style={{ border: 0 }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
                title="Calendario de Festivos en Colombia"
                data-testid="iframe-festivos-calendar"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
