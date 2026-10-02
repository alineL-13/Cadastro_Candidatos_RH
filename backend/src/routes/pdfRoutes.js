import express from "express";
import { upload, analisarPdf } from "../controllers/pdfController.js";

const router = express.Router();

router.post(
  "/analisar",
  upload.single("arquivo"),
  analisarPdf
);

export default router;