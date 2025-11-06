import { Link } from "wouter";
import { Languages } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/20 mt-20">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Languages className="h-5 w-5 text-primary" />
              <span className="font-heading font-bold text-lg">Emberá-Español</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plataforma dedicada a preservar y promover el idioma y la cultura del pueblo Emberá de Colombia.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" data-testid="link-footer-traductor">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Traductor
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/comunidad" data-testid="link-footer-comunidad">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Comunidad
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/diccionario" data-testid="link-footer-diccionario">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Diccionario
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Sobre el Proyecto
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Contribuir
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Documentación
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <p className="text-sm text-muted-foreground">
              Para más información sobre el pueblo Emberá y la preservación de su lengua.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Traductor Emberá-Español.
            Honrando y preservando la lengua del pueblo Emberá.
          </p>
        </div>
      </div>
    </footer>
  );
}
