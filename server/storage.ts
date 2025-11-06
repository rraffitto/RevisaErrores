// Referenced from javascript_database blueprint integration
import { users, diccionario, type User, type InsertUser, type Diccionario, type InsertDiccionario } from "@shared/schema";
import { db } from "./db";
import { eq, or, ilike } from "drizzle-orm";

// Storage interface with dictionary methods
export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Dictionary methods
  translateWord(word: string, fromLang: string, toLang: string): Promise<string | null>;
  getAllWords(): Promise<Diccionario[]>;
  searchWords(query: string): Promise<Diccionario[]>;
  addWord(word: InsertDiccionario): Promise<Diccionario>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Dictionary methods
  async translateWord(word: string, fromLang: string, toLang: string): Promise<string | null> {
    const searchWord = word.toLowerCase().trim();
    
    let result;
    if (fromLang === "es-ES" && toLang === "em-EM") {
      // Spanish to Emberá
      [result] = await db
        .select()
        .from(diccionario)
        .where(ilike(diccionario.espanol, searchWord));
      
      return result?.embera || null;
    } else if (fromLang === "em-EM" && toLang === "es-ES") {
      // Emberá to Spanish
      [result] = await db
        .select()
        .from(diccionario)
        .where(ilike(diccionario.embera, searchWord));
      
      return result?.espanol || null;
    }
    
    return null;
  }

  async getAllWords(): Promise<Diccionario[]> {
    return await db.select().from(diccionario).orderBy(diccionario.espanol);
  }

  async searchWords(query: string): Promise<Diccionario[]> {
    const searchPattern = `%${query.toLowerCase()}%`;
    return await db
      .select()
      .from(diccionario)
      .where(
        or(
          ilike(diccionario.espanol, searchPattern),
          ilike(diccionario.embera, searchPattern)
        )
      )
      .orderBy(diccionario.espanol);
  }

  async addWord(word: InsertDiccionario): Promise<Diccionario> {
    const [newWord] = await db
      .insert(diccionario)
      .values(word)
      .returning();
    return newWord;
  }
}

export const storage = new DatabaseStorage();
