import { Router } from "express";
import uploadAudio from "../middlewares/uploadAudio.js";
import {
  criarConteudo,
  listarTextosPorLicao,
  atualizarTexto,
  deletarTexto,
} from "../controllers/texto.js";

const textoRouter = Router();

textoRouter
  .post("/texto", uploadAudio.any(), criarConteudo)
  .get("/texto/:idLicao", listarTextosPorLicao)
  .put("/texto/:id", uploadAudio.any(), atualizarTexto)
  .delete("/texto/:id", deletarTexto);

export default textoRouter;
