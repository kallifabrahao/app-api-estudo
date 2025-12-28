import { Router } from "express";
import uploadAudio from "../middlewares/uploadAudio.js";
import {
  criarConteudo,
  listarFrasesPorLicao,
  deletarFrase,
  atualizarFrase,
} from "../controllers/frases.js";

const frasesRouter = Router();

frasesRouter
  .post("/frases", uploadAudio.any(), criarConteudo)
  .get("/frases/:idLicao", listarFrasesPorLicao)
  .put("/frases/:id", uploadAudio.any(), atualizarFrase)
  .delete("/frases/:id", deletarFrase);

export default frasesRouter;
