import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();
/*
 * In the .env file - Create the below env variables
 * PGUSER
 * PGPASSWORD
 * PGHOST
 * PGDATABASE
 * PGPORT
 */

async function execute(sql: string) {
  const client = new Client();
  await client.connect();
  const results = await client.query(sql);
  await client.end();

  return results;
}

export default {
  execute,
};
