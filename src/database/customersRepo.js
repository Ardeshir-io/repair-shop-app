import {getDB} from './db';

export const initDB = async () => {
  const db = await getDB();
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      phone TEXT,
      device TEXT,
      description TEXT,
      photo TEXT,
      audio TEXT,
      date TEXT
    )
  `);
};

export const insertCustomer = async c => {
  const db = await getDB();
  await db.executeSql(
    `INSERT INTO customers 
     (fullName, phone, device, description, photo, audio, date)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [c.fullName, c.phone, c.device, c.description, c.photo, c.audio, c.date],
  );
};

export const getCustomers = async () => {
  const db = await getDB();
  const res = await db.executeSql(
    `SELECT * FROM customers ORDER BY fullName COLLATE NOCASE`,
  );
  return res[0].rows.raw();
};

export const searchCustomers = async q => {
  const db = await getDB();
  const res = await db.executeSql(
    `SELECT * FROM customers 
     WHERE fullName LIKE ? OR phone LIKE ? OR device LIKE ?`,
    [`%${q}%`, `%${q}%`, `%${q}%`],
  );
  return res[0].rows.raw();
};

export const getCustomerById = async id => {
  const db = await getDB();
  const res = await db.executeSql(`SELECT * FROM customers WHERE id = ?`, [id]);
  return res[0].rows.item(0);
};

export const deleteCustomer = async id => {
  const db = await getDB(); // همون متدی که قبلاً داری
  await db.executeSql('DELETE FROM customers WHERE id = ?', [id]);
};

export const updateCustomer = async customer => {
  const db = await getDB();
  await db.executeSql(
    `UPDATE customers 
     SET fullName=?, phone=?, device=?, description=?, photo=?, audio=?, date=? 
     WHERE id=?`,
    [
      customer.fullName,
      customer.phone,
      customer.device,
      customer.description,
      customer.photo,
      customer.audio,
      customer.date,
      customer.id,
    ],
  );
};
