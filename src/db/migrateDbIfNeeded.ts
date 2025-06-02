import { SQLiteDatabase } from "expo-sqlite";
import { createFavoritesTable } from "./favorites";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  const pragma = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  let currentDbVersion = pragma?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`PRAGMA journal_mode = 'wal';`);

    createFavoritesTable(db);

    currentDbVersion = 1;
  }

  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
