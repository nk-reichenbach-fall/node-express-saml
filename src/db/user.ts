// Create User table

import Pg from "../libs/postgres";

async function createUserTable() {
  return await Pg.execute(`
  CREATE TABLE IF NOT EXISTS "users" (
    email varchar(100),
    password varchar(100),
    created_by varchar(50),
    creared_date date,
    updated_by varchar(50),
    updated_date date
  );
  `);
}

async function getUser(email: string) {
  return await Pg.execute(`
    SELECT password FROM users 
    WHERE email='${email}';
  `);
}

export default {
  createUserTable,
  getUser,
};
