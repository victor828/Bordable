import { Pool } from "pg";
require("dotenv").config();

export const pool = new Pool({
  user: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  host: process.env.PGSQL_HOST,
  port: Number(process.env.PGSQL_PORT),
  database: process.env.PGSQL_DATABASE,
});

console.log(
  process.env["PGUSER"]
);


export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};

pool
  .connect()
  .then(() => console.log("Conexión exitosa a la base de datos"))
  .catch((error: any) =>
    console.error(`Error de conexión a la base de datos: ${error}`)
  );