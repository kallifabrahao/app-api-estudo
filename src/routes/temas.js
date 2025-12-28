import { Router } from "express";
import {
  listarTemas,
  criarTema,
  atualizarTema,
  deletarTema,
} from "../controllers/temas.js";

const temasRouter = Router();

temasRouter
  .get("/temas", listarTemas)
  .post("/temas", criarTema)
  .put("/temas/:id", atualizarTema)
  .delete("/temas/:id", deletarTema);

export default temasRouter;
