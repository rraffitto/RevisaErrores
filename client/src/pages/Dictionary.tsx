import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Diccionario } from "@shared/schema";

export default function Dictionary() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: words = [], isLoading } = useQuery<Diccionario[]>({
    queryKey: ["/api/dictionary"],
  });

  const filteredWords = words.filter((word) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      word.espanol.toLowerCase().includes(searchLower) ||
      word.embera.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader 
          title="Diccionario Emberá-Español" 
          subtitle="Explora el vocabulario completo del idioma Emberá"
        />
        <div className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 md:px-8">
            {/* Search */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar palabra en español o emberá..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                  data-testid="input-dictionary-search"
                />
              </div>
            </div>

            {/* Results */}
            <div className="max-w-5xl mx-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredWords.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      {searchTerm
                        ? "No se encontraron palabras que coincidan con tu búsqueda."
                        : "No hay palabras en el diccionario aún. Pronto se agregará contenido."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredWords.map((word) => (
                    <Card key={word.id} className="hover-elevate transition-all" data-testid={`word-card-${word.id}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl text-primary">
                          {word.embera}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-medium text-foreground">
                          {word.espanol}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Results Count */}
              {!isLoading && filteredWords.length > 0 && (
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Mostrando {filteredWords.length} {filteredWords.length === 1 ? "palabra" : "palabras"}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
