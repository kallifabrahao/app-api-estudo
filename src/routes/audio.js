import express from "express";
import { streamAudio } from "../controllers/audio.js";

const audioRouter = express.Router();

audioRouter.get("/audios/:id", streamAudio);

export default audioRouter;
