import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import candidatosRoutes from "./routes/candidatosRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/candidatos", candidatosRoutes);
app.use("/pdf", pdfRoutes);

export default app;