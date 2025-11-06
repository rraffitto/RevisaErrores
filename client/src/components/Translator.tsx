import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, Copy, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export function Translator() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [fromLang, setFromLang] = useState("es-ES");
  const [toLang, setToLang] = useState("em-EM");
  const { toast } = useToast();

  const translateMutation = useMutation({
    mutationFn: async ({ word, from, to }: { word: string; from: string; to: string }) => {
      const response = await fetch(`/api/translate?word=${encodeURIComponent(word)}&from=${from}&to=${to}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'No se pudo encontrar la traducción');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setOutputText(data.translation || "");
    },
    onError: (error: any) => {
      toast({
        title: "Error en la traducción",
        description: error.message || "No se pudo encontrar la traducción. Intenta con otra palabra.",
        variant: "destructive",
      });
      setOutputText("");
    },
  });

  const handleSwapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleTranslate = () => {
    if (!inputText.trim()) {
      toast({
        title: "Campo vacío",
        description: "Por favor escribe una palabra para traducir.",
        variant: "destructive",
      });
      return;
    }
    translateMutation.mutate({ word: inputText.trim(), from: fromLang, to: toLang });
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      toast({
        title: "Copiado",
        description: "Traducción copiada al portapapeles.",
      });
    }
  };

  return (
    <section id="traductor" className="w-full py-12 md:py-20 scroll-mt-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Traductor Emberá-Español
            </h2>
            <p className="text-muted-foreground text-lg">
              Traduce palabras entre español y emberá de forma instantánea
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* From Language */}
                <div className="flex-1 min-w-[140px]">
                  <Select value={fromLang} onValueChange={setFromLang}>
                    <SelectTrigger data-testid="select-from-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es-ES">Español</SelectItem>
                      <SelectItem value="em-EM">Emberá</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Swap Button */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapLanguages}
                  data-testid="button-swap-languages"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>

                {/* To Language */}
                <div className="flex-1 min-w-[140px]">
                  <Select value={toLang} onValueChange={setToLang}>
                    <SelectTrigger data-testid="select-to-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es-ES">Español</SelectItem>
                      <SelectItem value="em-EM">Emberá</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Input Textarea */}
              <div>
                <Textarea
                  placeholder="Escribe una palabra..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[180px] resize-none text-base"
                  data-testid="input-translation"
                />
              </div>

              {/* Translate Button */}
              <Button
                onClick={handleTranslate}
                disabled={translateMutation.isPending}
                className="w-full"
                size="lg"
                data-testid="button-translate"
              >
                {translateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Traduciendo...
                  </>
                ) : (
                  "Traducir"
                )}
              </Button>

              {/* Output Area */}
              {(outputText || translateMutation.isPending) && (
                <div className="relative animate-fade-in">
                  <Textarea
                    value={outputText}
                    readOnly
                    className="min-h-[180px] resize-none text-base bg-muted/30"
                    placeholder={translateMutation.isPending ? "Traduciendo..." : "La traducción aparecerá aquí"}
                    data-testid="output-translation"
                  />
                  {outputText && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={handleCopy}
                      data-testid="button-copy"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              El traductor funciona palabra por palabra. Para frases completas, traduce cada palabra individualmente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
