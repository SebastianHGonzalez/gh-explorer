import { SQLiteDatabase } from "expo-sqlite";
import { z } from "zod";
import { withPagination } from "./commonSchemas";

// Migrations

export async function createFavoritesTable(db: SQLiteDatabase) {
  await await db.execAsync(`
        CREATE TABLE Favorites (
            login STRING PRIMARY KEY NOT NULL,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        );
    `);
}

// Operations

export const favoritesSchema = z.object({
  login: z.string(),
  createdAt: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date().default(() => new Date())),
  updatedAt: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date().default(() => new Date())),
});
export type Favorites = z.infer<typeof favoritesSchema>;

export const getAllFavoritesInputSchema = withPagination();
export type GetAllFavoritesInput = z.infer<typeof getAllFavoritesInputSchema>;

export async function getAllFavorites(
  db: SQLiteDatabase,
  input?: Partial<GetAllFavoritesInput>,
): Promise<Favorites[]> {
  const { limit, offset } = getAllFavoritesInputSchema.parse(input);

  const rows = await db.getAllAsync(
    `SELECT * FROM Favorites ORDER BY updatedAt DESC LIMIT ? OFFSET ?`,
    [limit, offset],
  );
  return rows.map((row) => favoritesSchema.parse(row));
}

export const addFavoriteInputSchema = favoritesSchema.pick({ login: true });
export type AddFavoriteInput = z.infer<typeof addFavoriteInputSchema>;

export async function addFavorite(
  db: SQLiteDatabase,
  input: AddFavoriteInput,
): Promise<void> {
  const { login, createdAt, updatedAt } = favoritesSchema.parse(input);

  await db.runAsync(
    `INSERT OR REPLACE INTO Favorites (login, createdAt, updatedAt) VALUES (?, COALESCE((SELECT createdAt FROM Favorites WHERE login = ?), ?), ?)`,
    [login, login, createdAt?.toISOString(), updatedAt?.toISOString()],
  );
}

export const removeFavoriteInputSchema = favoritesSchema.pick({ login: true });
export type RemoveFavoriteInput = z.infer<typeof removeFavoriteInputSchema>;

export async function removeFavorite(
  db: SQLiteDatabase,
  input: RemoveFavoriteInput,
): Promise<void> {
  const { login } = removeFavoriteInputSchema.parse(input);

  await db.runAsync(`DELETE FROM Favorites WHERE login = ?`, [login]);
}

export const isFavoriteInputSchema = favoritesSchema.pick({ login: true });
export type IsFavoriteInput = z.infer<typeof isFavoriteInputSchema>;

export async function isFavorite(
  db: SQLiteDatabase,
  input: IsFavoriteInput,
): Promise<boolean> {
  const { login } = isFavoriteInputSchema.parse(input);

  const row = await db.getFirstAsync(
    `SELECT login FROM Favorites WHERE login = ? LIMIT 1`,
    [login],
  );

  return !!row;
}
