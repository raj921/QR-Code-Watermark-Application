import { users, embeddings, extractions, type User, type InsertUser, type Embedding, type InsertEmbedding, type Extraction, type InsertExtraction } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Embedding tracking
  recordEmbedding(embedding: InsertEmbedding): Promise<Embedding>;
  getUserEmbeddings(userId: number): Promise<Embedding[]>;
  
  // Extraction tracking
  recordExtraction(extraction: InsertExtraction): Promise<Extraction>;
  getUserExtractions(userId: number): Promise<Extraction[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async recordEmbedding(embedding: InsertEmbedding): Promise<Embedding> {
    const [result] = await db
      .insert(embeddings)
      .values(embedding)
      .returning();
    return result;
  }

  async getUserEmbeddings(userId: number): Promise<Embedding[]> {
    return await db.select().from(embeddings).where(eq(embeddings.userId, userId));
  }

  async recordExtraction(extraction: InsertExtraction): Promise<Extraction> {
    const [result] = await db
      .insert(extractions)
      .values(extraction)
      .returning();
    return result;
  }

  async getUserExtractions(userId: number): Promise<Extraction[]> {
    return await db.select().from(extractions).where(eq(extractions.userId, userId));
  }
}

export const storage = new DatabaseStorage();
