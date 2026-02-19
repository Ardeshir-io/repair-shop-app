import {getDB} from './db';

export const initDB = async () => {
  const db = await getDB();
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      phone TEXT,
      recipientName TEXT,
      device TEXT,
      deviceTypeColor TEXT,
      description TEXT,
      amount TEXT,
      amountPaid TEXT,
      photo TEXT,
      orderDate TEXT,
      repairDate TEXT,
      deliveryDate TEXT
    )
  `);
};

export const insertCustomer = async c => {
  const db = await getDB();
  await db.executeSql(
    `INSERT INTO customers 
     (fullName, phone, recipientName, device, deviceTypeColor, description, amount, amountPaid, photo, orderDate, repairDate, deliveryDate)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      c.fullName,
      c.phone,
      c.recipientName,
      c.device,
      c.deviceTypeColor,
      c.description,
      c.amount,
      c.amountPaid,
      c.photo,
      c.orderDate,
      c.repairDate,
      c.deliveryDate,
    ],
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
     SET fullName=?, phone=?, recipientName=?, device=?, deviceTypeColor=?, description=?, amount=?, amountPaid=?, photo=?, orderDate=?, repairDate=?, deliveryDate=? 
     WHERE id=?`,
    [
      customer.fullName,
      customer.phone,
      customer.recipientName,
      customer.device,
      customer.deviceTypeColor,
      customer.description,
      customer.amount,
      customer.amountPaid,
      customer.photo,
      customer.orderDate,
      customer.repairDate,
      customer.deliveryDate,
      customer.id,
    ],
  );
};
