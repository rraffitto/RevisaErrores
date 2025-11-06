import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Translation endpoint
  app.get("/api/translate", async (req, res) => {
    try {
      const querySchema = z.object({
        word: z.string().min(1, "La palabra es requerida"),
        from: z.enum(["es-ES", "em-EM"], { 
          errorMap: () => ({ message: "Idioma de origen inválido" }) 
        }),
        to: z.enum(["es-ES", "em-EM"], { 
          errorMap: () => ({ message: "Idioma de destino inválido" }) 
        }),
      });

      const validation = querySchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: validation.error.errors[0].message 
        });
      }

      const { word, from, to } = validation.data;

      // Validate that from and to are different
      if (from === to) {
        return res.status(400).json({ 
          error: "Los idiomas de origen y destino deben ser diferentes" 
        });
      }

      const translation = await storage.translateWord(word, from, to);

      if (!translation) {
        return res.status(404).json({ 
          error: "No se encontró traducción para esta palabra" 
        });
      }

      res.json({ translation });
    } catch (error) {
      console.error("Error en traducción:", error);
      res.status(500).json({ 
        error: "Error interno del servidor" 
      });
    }
  });

  // Get all dictionary words
  app.get("/api/dictionary", async (req, res) => {
    try {
      const words = await storage.getAllWords();
      res.json(words);
    } catch (error) {
      console.error("Error obteniendo diccionario:", error);
      res.status(500).json({ 
        error: "Error al obtener el diccionario" 
      });
    }
  });

  // Search words (optional endpoint for future use)
  app.get("/api/dictionary/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.trim().length === 0) {
        return res.status(400).json({ 
          error: "Parámetro de búsqueda requerido" 
        });
      }

      const results = await storage.searchWords(query);
      res.json(results);
    } catch (error) {
      console.error("Error en búsqueda:", error);
      res.status(500).json({ 
        error: "Error en la búsqueda" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
