import express from "express";
import { getCandidatos, createCandidato, getCandidatoById } from "../controllers/candidatosController.js";

const router = express.Router();


router.get("/", getCandidatos);
router.post("/", createCandidato);
router.get("/:id", getCandidatoById);

export default router;