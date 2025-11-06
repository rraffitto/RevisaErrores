import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

import image1 from "@assets/generated_images/Colorful_Emberá_beaded_jewelry_f790271e.png";
import image2 from "@assets/generated_images/Traditional_Emberá_pottery_collection_0e6f9c0e.png";
import image3 from "@assets/generated_images/Emberá_children_playing_outdoors_edff1153.png";
import image4 from "@assets/generated_images/Traditional_Emberá_handicrafts_closeup_47cfad29.png";
import image5 from "@assets/generated_images/Emberá_textile_weaving_process_9abbde10.png";
import image6 from "@assets/generated_images/Traditional_Emberá_musical_instruments_c28f1c1c.png";
import image7 from "@assets/generated_images/Emberá_language_teaching_scene_15d44657.png";
import image8 from "@assets/generated_images/Emberá_traditional_ceremony_gathering_566f25da.png";
import image9 from "@assets/generated_images/Emberá_community_in_traditional_dress_9487b4ea.png";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; category: string } | null>(null);

  const galleryImages = [
    { src: image1, alt: "Joyería de chaquiras Emberá", category: "Artesanía" },
    { src: image2, alt: "Cerámica tradicional Emberá", category: "Artesanía" },
    { src: image3, alt: "Niños Emberá jugando", category: "Comunidad" },
    { src: image4, alt: "Artesanías tradicionales", category: "Artesanía" },
    { src: image5, alt: "Proceso de tejido", category: "Artesanía" },
    { src: image6, alt: "Instrumentos musicales", category: "Música" },
    { src: image7, alt: "Enseñanza del idioma", category: "Educación" },
    { src: image8, alt: "Ceremonia tradicional", category: "Ceremonia" },
    { src: image9, alt: "Vestimenta tradicional", category: "Vestimenta" },
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
