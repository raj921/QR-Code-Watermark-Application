import { z } from "zod";
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

// Database tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const embeddings = pgTable("embeddings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  originalFilename: text("original_filename").notNull(),
  payloadSize: integer("payload_size").notNull(),
  encryptionKey: text("encryption_key"), // Optional for tracking
  createdAt: timestamp("created_at").defaultNow(),
});

export const extractions = pgTable("extractions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  filename: text("filename").notNull(),
  success: text("success").notNull(), // 'true' or 'false' as text
  extractedDataSize: integer("extracted_data_size"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  embeddings: many(embeddings),
  extractions: many(extractions),
}));

export const embeddingsRelations = relations(embeddings, ({ one }) => ({
  user: one(users, {
    fields: [embeddings.userId],
    references: [users.id],
  }),
}));

export const extractionsRelations = relations(extractions, ({ one }) => ({
  user: one(users, {
    fields: [extractions.userId],
    references: [users.id],
  }),
}));

// Zod schemas for API validation
export const embedRequestSchema = z.object({
  payload: z.string().max(256, "Payload must be 256 bytes or less"),
  key: z.string().optional(),
});

export const extractRequestSchema = z.object({
  key: z.string().optional(),
});

export const steganographyResultSchema = z.object({
  success: z.boolean(),
  data: z.string().optional(),
  error: z.string().optional(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertEmbeddingSchema = createInsertSchema(embeddings).omit({ id: true, createdAt: true });
export const insertExtractionSchema = createInsertSchema(extractions).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Embedding = typeof embeddings.$inferSelect;
export type InsertEmbedding = z.infer<typeof insertEmbeddingSchema>;
export type Extraction = typeof extractions.$inferSelect;
export type InsertExtraction = z.infer<typeof insertExtractionSchema>;
export type EmbedRequest = z.infer<typeof embedRequestSchema>;
export type ExtractRequest = z.infer<typeof extractRequestSchema>;
export type SteganographyResult = z.infer<typeof steganographyResultSchema>;
