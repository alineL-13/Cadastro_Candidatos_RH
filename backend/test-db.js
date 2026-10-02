import sql from "mssql/msnodesqlv8.js";

const config = {
  server: "Notebook_Aline\\SQLEXPRESS",
  database: "Cadastro_Candidatos_RH",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  }
};

console.log(config);

try {
  await sql.connect(config);

  console.log("✅ CONECTOU!");

  const result = await sql.query`
    SELECT 
      @@SERVERNAME AS ServerName,
      DB_NAME() AS DatabaseName
  `;

  console.log(result.recordset);

  await sql.close();
} catch (error) {
  console.error("❌ ERRO:");
  console.error(error);
}
