import { Router } from "express";
import {
  criarLicao,
  listarLicoes,
  deletarLicao,
  atualizarLicao,
  atualizarStatusLicao,
} from "../controllers/licoes.js";

const licoesRouter = Router();

licoesRouter
  .post("/licoes", criarLicao)
  .get("/licoes/:idTema", listarLicoes)
  .delete("/licoes/:id", deletarLicao)
  .put("/licoes/:id", atualizarLicao)
  .patch("/licoes/:id/status", atualizarStatusLicao);

export default licoesRouter;
