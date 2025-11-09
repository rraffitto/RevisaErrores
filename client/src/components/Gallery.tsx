import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

import image1 from "@assets/041_1762692764925.png";
import image2 from "@assets/098_1762692764925.png";
import image3 from "@assets/Embera dobida_1762692764926.jpg";
import image4 from "@assets/embera_1762692764927.jpg";
import image5 from "@assets/foto de chano_1762692764927.jpeg";
import image6 from "@assets/Fotografia-2-1-scaled_1762692764928.jpg";
import image7 from "@assets/getlstd-property-photo_1762692764928.jpg";
import image8 from "@assets/hq720_1762692764929.jpg";
import image9 from "@assets/kipara-te_1762692764929.jpg";
import image10 from "@assets/Nepono Werara_1762692764930.jpg";
import image11 from "@assets/Tambo_1762692764930.jpg";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; category: string } | null>(null);

  const galleryImages = [
    { src: image1, alt: "Artesana Emberá tejiendo", category: "Artesanía" },
    { src: image2, alt: "Tambó - Casa tradicional Emberá", category: "Arquitectura" },
    { src: image3, alt: "Mujeres Emberá Dobida con vestimenta tradicional", category: "Vestimenta" },
    { src: image4, alt: "Danza tradicional Emberá", category: "Danza" },
    { src: image5, alt: "Grupo Emberá con instrumentos tradicionales", category: "Música" },
    { src: image6, alt: "Gran familia Emberá reunida", category: "Comunidad" },
    { src: image7, alt: "Mujeres y niños con vestimenta colorida", category: "Vestimenta" },
    { src: image8, alt: "Danza Emberá en interior", category: "Danza" },
    { src: image9, alt: "Danza tradicional en Kipara-té", category: "Danza" },
    { src: image10, alt: "Grupo de mujeres Emberá", category: "Comunidad" },
    { src: image11, alt: "Tambó tradicional", category: "Arquitectura" },
  ];

  return (
    <section className="w-full py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Galería Cultural
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora la riqueza visual de la cultura Emberá a través de imágenes 
            de artesanías, ceremonias y vida cotidiana.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover-elevate transition-all group"
              onClick={() => setSelectedImage(image)}
              data-testid={`gallery-image-${index}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium text-sm">{image.alt}</p>
                  <p className="text-white/80 text-xs mt-1">{image.category}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
            {selectedImage && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-12 right-0 text-white hover:bg-white/20"
                  onClick={() => setSelectedImage(null)}
                  data-testid="button-close-lightbox"
                >
                  <X className="h-6 w-6" />
                </Button>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto rounded-lg"
                  data-testid="img-lightbox"
                />
                <div className="bg-background/95 backdrop-blur p-4 rounded-b-lg">
                  <p className="font-medium">{selectedImage.alt}</p>
                  <p className="text-sm text-muted-foreground">{selectedImage.category}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
