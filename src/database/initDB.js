import {getDB} from './db';

export const initDB = async () => {
  const db = await getDB();
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      deviceModel TEXT NOT NULL,
      deviceColor TEXT NOT NULL,
      category TEXT NOT NULL,
      phone TEXT NOT NULL,
      repairDate TEXT,
      deliveryDate TEXT,
      receiverName TEXT,
      price INTEGER,
      paidPrice INTEGER,
      notes TEXT,
      audioPath TEXT,
      photoPath TEXT,
      createdAt TEXT
    );
  `);
};
