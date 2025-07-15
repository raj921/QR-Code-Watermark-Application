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

      // Record the embedding operation in the database
      await storage.recordEmbedding({
        userId: null, // No user authentication for personal project
        originalFilename: req.file.originalname,
        payloadSize: validation.data.payload.length,
        encryptionKey: validation.data.key || null,
      });

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

      // Record the extraction attempt in the database
      await storage.recordExtraction({
        userId: null, // No user authentication for personal project
        filename: req.file.originalname,
        success: "true", // Assume success for now - actual processing is client-side
        extractedDataSize: null, // Will be updated when we get actual data
      });

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

  // Get usage statistics
  app.get("/api/stats", async (req, res) => {
    try {
      // Get recent activity stats
      const embeddings = await storage.getUserEmbeddings(0); // Get all embeddings
      const extractions = await storage.getUserExtractions(0); // Get all extractions
      
      res.json({
        totalEmbeddings: embeddings.length,
        totalExtractions: extractions.length,
        recentActivity: {
          embeddings: embeddings.slice(-5), // Last 5 embeddings
          extractions: extractions.slice(-5), // Last 5 extractions
        }
      });
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
