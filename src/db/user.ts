// Create User table

import Pg from "../libs/postgres";

async function createUserTable() {
  return await Pg.execute(`
  CREATE TABLE IF NOT EXISTS "users" (
    id SERIAL PRIMARY KEY,
    email varchar(100) UNIQUE NOT NULL,
    password varchar(100) NOT NULL,
    name varchar(100) NOT NULL,
    created_by varchar(50) NOT NULL DEFAULT 'system',
    created_at date NOT NULL DEFAULT NOW(),
    updated_by varchar(50),
    updated_at date
  );
  `);
}

async function getUser(email: string) {
  return (
    await Pg.execute(`
    SELECT * FROM users 
    WHERE email='${email}';
  `)
  ).rows;
}

async function addUser(email: string, name: string, password: string) {
  return await Pg.execute(`
    INSERT INTO users (email, password, name, created_by, created_at)
    VALUES ('${email}','${password}','${name}','system','${new Date().toISOString()}');
  `);
}

export default {
  createUserTable,
  getUser,
  addUser,
};
