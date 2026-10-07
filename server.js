import express from "express";
import cors from "cors";
import OpenAI from "openai";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.post("/chat", async (req, res) => {
  try {
    const mensagem = req.body.mensagem;

    const resposta = await client.responses.create({
      model: "gpt-5-mini",
      input: mensagem
    });

    res.json({
      resposta: resposta.output_text
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao conectar com a IA."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
