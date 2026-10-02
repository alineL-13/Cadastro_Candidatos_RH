import odbc from "odbc";

const connectionString =
  "Driver={ODBC Driver 18 for SQL Server};" +
  "Server=Notebook_Aline\\SQLEXPRESS;" +
  "Database=Cadastro_Candidatos_RH;" +
  "Trusted_Connection=Yes;" +
  "TrustServerCertificate=Yes;";

try {
  const connection = await odbc.connect(connectionString);

  console.log("✅ ODBC CONECTOU!");

  const result = await connection.query(`
    SELECT 
      @@SERVERNAME AS ServerName,
      DB_NAME() AS DatabaseName
  `);

  console.log(result);

  await connection.close();
} catch (error) {
  console.error("❌ ERRO ODBC:");
  console.error(error);
}
