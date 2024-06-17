import { Pool } from "pg";

const pool = new Pool({
  user: "newuser",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});

export default pool;
