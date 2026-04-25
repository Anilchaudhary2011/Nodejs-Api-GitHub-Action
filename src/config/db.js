import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

let pools;

// Skip DB in test environment
if (process.env.NODE_ENV === "test") {
  console.log("⚠️ Test mode: Skipping DB connection");

  pools = {
    query: () => {
      throw new Error("DB not available in test mode");
    }
  };

} else {
  // Real DB connection
  pools = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  });

  pools.on("connect", () => {
    console.log(" DB connected");
  });
}

export default pools;