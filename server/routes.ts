import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { embedRequestSchema, extractRequestSchema } from "@shared/schema";
import { storage } from "./storage";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // File upload middleware
  const upload = multer({ storage: multer.memoryStorage() });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Embed data endpoint
  app.post("/api/embed", upload.single("image"), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const validation = embedRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      // For now, just return success - the actual processing is done client-side
      res.json({ 
        success: true, 
        message: "Image processed successfully",
        filename: req.file.originalname
      });
    } catch (error) {
      console.error("Embed error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Extract data endpoint
  app.post("/api/extract", upload.single("image"), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const validation = extractRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      // For now, just return success - the actual processing is done client-side
      res.json({ 
        success: true, 
        message: "Data extracted successfully",
        filename: req.file.originalname
      });
    } catch (error) {
      console.error("Extract error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
