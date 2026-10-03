import multer from "multer";
import pdf from "pdf-parse/lib/pdf-parse.js";

export const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, callback) => {
    if (file.mimetype !== "application/pdf") {
      return callback(new Error("O arquivo deve ser um PDF."));
    }

    callback(null, true);
  },
});

export const analisarPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Selecione um arquivo PDF.",
      });
    }

    const resultado = await pdf(req.file.buffer);
    const texto = resultado.text;

    const email =
      texto.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)?.[0] || "";

    const telefone =
      texto.match(
        /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2}\)?[\s.-]?)?\d{4,5}[\s.-]?\d{4}\b/,
      )?.[0] || "";

    const linhas = texto
      .split(/\r?\n/) //divide o texto em linhas
      .map((linha) => linha.trim())
      .filter(Boolean); //remove linhas vazias

    const nome =
      linhas.find((linha) => {
        const linhaMinuscula = linha.toLowerCase();

        const pareceContato = linha.includes("@") || /\d{4,}/.test(linha);

        const pareceTitulo =
          /currículo|curriculum vitae|resume|contato|experiência|objetivo/i.test(
            linhaMinuscula,
          );

        return !pareceContato && !pareceTitulo && linha.length <= 200;
      }) || "";

    return res.json({
      NomeCompleto: nome,
      Email: email,
      Telefone: telefone,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao analisar PDF:",
      error: error.message,
    });
  }
};
