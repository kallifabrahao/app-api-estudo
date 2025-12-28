import { Router } from "express";
import {
  criarLicao,
  listarLicoes,
  deletarLicao,
  atualizarLicao,
} from "../controllers/licoes.js";

const licoesRouter = Router();

licoesRouter
  .post("/licoes", criarLicao)
  .get("/licoes", listarLicoes)
  .delete("/licoes/:id", deletarLicao)
  .put("/licoes/:id", atualizarLicao);

export default licoesRouter;
