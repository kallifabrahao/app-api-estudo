import express from "express";
import cors from "cors";
import frasesRouter from "./frases.js";
import authRouter from "./auth.js";
import licoesRouter from "./licoes.js";
import audioRouter from "./audio.js";
import textoRouter from "./texto.js";
import temasRouter from "./temas.js";
import { verifyToken } from "../middlewares/verificarToken.js";

const corsOptions = {
  origin: [process.env.FRONT_END],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const router = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ status: "ok" });
  });

  app.use(
    express.json(),
    cors(corsOptions),
    authRouter,
    verifyToken,
    audioRouter,
    frasesRouter,
    licoesRouter,
    textoRouter,
    temasRouter
  );
};

export default router;
