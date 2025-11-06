import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Tabla del diccionario Emberá-Español
export const diccionario = pgTable("diccionario", {
  id: serial("id").primaryKey(),
  espanol: text("espanol").notNull(),
  embera: text("embera").notNull(),
});

export const insertDiccionarioSchema = createInsertSchema(diccionario).omit({
  id: true,
});

export type InsertDiccionario = z.infer<typeof insertDiccionarioSchema>;
export type Diccionario = typeof diccionario.$inferSelect;

// Mantener tabla de usuarios para autenticación futura si es necesario
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
