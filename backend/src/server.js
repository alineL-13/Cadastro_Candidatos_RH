import app from "./app.js";
import { connectDatabase } from "./database.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "Não foi possível iniciar a aplicação. Mensagem de erro:",
      error
    );

    process.exit(1);
  }
}

start();