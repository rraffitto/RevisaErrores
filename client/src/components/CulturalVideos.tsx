import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function CulturalVideos() {
  const videos = [
    {
      id: "2ZPYkLyKALc",
      title: "Danza del Pato - Emberá Dobida",
      description: "Danza tradicional del pueblo Emberá Dobida",
      channel: "La Rueda Flotante"
    },
    {
      id: "db1SnKYVE2k",
      title: "Cultura Emberá Dovida de Bojayá, Chocó",
      description: "Conoce la cultura del pueblo Emberá en Bojayá",
      channel: "Diony Cabrera"
    }
  ];

  return (
    <section className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Videos Culturales
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora la cultura Emberá a través de videos sobre danzas tradicionales y vida cotidiana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {videos.map((video, index) => (
            <Card key={index} className="overflow-hidden" data-testid={`video-card-${index}`}>
              <CardHeader>
                <CardTitle className="text-xl">{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative pb-[56.25%] h-0 overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    data-testid={`iframe-video-${index}`}
                  />
                </div>
                <div className="p-4 bg-muted/30">
                  <p className="text-sm text-muted-foreground">Canal: {video.channel}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
