import dotenv from "dotenv";
import sql from "mssql/msnodesqlv8.js";
import { fileURLToPath } from "node:url";

dotenv.config({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

const connectionString =
  "Driver={ODBC Driver 18 for SQL Server};" +
  `Server=${process.env.DB_SERVER};` +
  `Database=${process.env.DB_DATABASE};` +
  `Trusted_Connection=Yes;` +
  `TrustServerCertificate=Yes;`;

let connection = null;

export async function connectDatabase() {
  try {
    connection = await sql.connect({ connectionString });
    //console.log("Conectado ao SQL Server!");
    return connection;
  } catch (error) {
    console.error("Erro ao conectar ao banco: ", error);
    throw error;
  }
}

export function getDatabase() {
  if (!connection) {
    throw new Error("Banco de dados não conectado.");
  }

  return connection;
}
