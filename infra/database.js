import { Pool } from "pg";

function createPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.DATABASE_MAX_CONNECTIONS) ?? 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    // depois mudar para certificado digital
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  });
}

const store = globalThis;
const pool = store.__quizPgPool || createPool();
if (process.env.NODE_ENV !== "production") {
  store.__quizPgPool = pool;
}

async function query(text, params) {
  return pool.query(text, params);
}

async function transaction(callback) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

const database = { query, transaction, pool };

export default database;
