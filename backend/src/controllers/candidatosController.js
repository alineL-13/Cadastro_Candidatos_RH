import sql from "mssql/msnodesqlv8.js";
import { getDatabase } from "../database.js";

export async function getCandidatos(req, res) {
  try {
    const db = getDatabase();
    const result = await db.request().query(`
      SELECT *
      FROM Candidatos
    `);
    res.status(200).json(result.recordset);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar candidatos", error: error.message });
  }
}

export async function createCandidato(req, res) {
  try {
    const {
      NomeCompleto,
      Email,
      Telefone,
      CargoDesejado,
      ResumoProfissional,
    } = req.body;

    // Validação do nome
    if (
      !NomeCompleto ||
      typeof NomeCompleto !== "string" ||
      !NomeCompleto.trim()
    ) {
      return res.status(400).json({
        message: "O campo de nome é obrigatório.",
      });
    }

    // Validação do email
    if (!Email || typeof Email !== "string" || !Email.trim()) {
      return res.status(400).json({
        message: "O campo de email é obrigatório.",
      });
    }

    const email = Email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "O campo de email possui um formato inválido.",
      });
    }

    // Validação do telefone
    let telefone = Telefone?.trim() || null;
    if (telefone) {
      const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/; //formato: (99) 99999-9999
      if (!telefoneRegex.test(telefone)) {
        return res.status(400).json({
          message: "O telefone deve estar no formato (99) 99999-9999.",
        });
      }
    }

    // Tratamento dos outros campos
    const nome = NomeCompleto.trim();
    const cargo = CargoDesejado?.trim() || null;
    const resumo = ResumoProfissional?.trim() || null;

    const db = getDatabase();

    const result = await db
      .request()
      .input("NomeCompleto", sql.NVarChar(200), nome)
      .input("Email", sql.NVarChar(254), email)
      .input("Telefone", sql.NVarChar(30), telefone)
      .input("CargoDesejado", sql.NVarChar(150), cargo)
      .input("ResumoProfissional", sql.NVarChar(sql.MAX), resumo)
      .query(`
        INSERT INTO Candidatos (
          NomeCompleto,
          Email,
          Telefone,
          CargoDesejado,
          ResumoProfissional
        )
        OUTPUT INSERTED.*
        VALUES (
          @NomeCompleto,
          @Email,
          @Telefone,
          @CargoDesejado,
          @ResumoProfissional
        )
      `);

    return res.status(201).json(result.recordset[0]);

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar candidato",
      error: error.message,
    });
  }
}


export async function getCandidatoById(req, res) {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ message: "O ID do candidato é obrigatório." });
        }
        const db = getDatabase();
        const result = await db.request()
        .input("ID", sql.Int, id)
        .query(
            `
                SELECT *
                FROM Candidatos
                WHERE ID = @ID
            `
        );
        return res.status(200).json(result.recordset[0]);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar candidato",
            error: error.message
        });
    }
}

export async function deleteCandidato(req, res) {
    try {
        const db = getDatabase();
        const result = await db.request()
        .input("ID", sql.Int, req.params.id)
        .query(`
        DELETE FROM
        Candidatos 
        WHERE ID = @ID
        `);
        return res.status(200).json({ message: "Candidato deletado com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error: error.message });
    }
}