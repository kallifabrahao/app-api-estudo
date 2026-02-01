import express from "express";
import { streamAudio, atualizarAudioController } from "../controllers/audio.js";
import uploadAudio from "../middlewares/uploadAudio.js";

const audioRouter = express.Router();

audioRouter.get("/audios/:id", streamAudio);
audioRouter.put(
  "/audios/:idLicao",
  uploadAudio.array("audio"),
  atualizarAudioController,
);

export default audioRouter;
