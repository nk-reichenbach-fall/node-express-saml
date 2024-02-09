// Create User table

import Pg from "../libs/postgres";

async function createUserTable() {
  await Pg.execute("SELECT 1");
}

export default {
  createUserTable,
};
