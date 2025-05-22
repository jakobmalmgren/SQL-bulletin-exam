import pool from "./db.js";

async function setupDb() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Users table
    await client.query(`
        CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "email" varchar(100) UNIQUE NOT NULL
)
        `);
    // Channels table
    await client.query(`
CREATE TABLE IF NOT EXISTS "channels" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) UNIQUE NOT NULL,
  "owner_id" integer NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE CASCADE
)
            `);
    // Messages table
    await client.query(`
CREATE TABLE IF NOT EXISTS "messages" (
  "id" SERIAL PRIMARY KEY,
  "content" text NOT NULL,
  "user_id" integer NOT NULL,
  "channel_id" integer NOT NULL,
   "created_at" timestamp NOT NULL DEFAULT NOW(),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE CASCADE
)

                `);
    //junctiontable
    //subscriptions table
    await client.query(`
                   CREATE TABLE IF NOT EXISTS "subscriptions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "channel_id" integer NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE CASCADE
)`);
    await client.query("COMMIT");
    console.log("databasen och transaktionen åtminstonde startades");
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(
      `fel med koppling/transaktion av/mot db":error:${error.message}`
    );
  } finally {
    client.release();
    await pool.end();
  }
}

setupDb();
