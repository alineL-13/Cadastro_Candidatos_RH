import express from "express";
import { connectDatabase } from "./database.js";
import candidatosRoutes from "./routes/candidatosRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use("/candidatos", candidatosRoutes);
app.use("/pdf", pdfRoutes);

async function start() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Não foi possível iniciar a aplicação. Mensagem de erro: ", error);
    process.exit(1);
  }
}

start();
