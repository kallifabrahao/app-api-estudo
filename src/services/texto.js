import Texto from "../models/texto.js";
import { salvarAudio } from "./audio.js";

const criarTextoService = async (body, files) => {
  const audioId = await salvarAudio(files);

  return Texto.create({
    idLicao: body.idLicao,
    texto: body.texto,
    audioCompleto: audioId,
  });
};

const listarTextosPorLicaoService = async (idLicao) => {
  const textos = await Texto.find({ idLicao }).sort({ createdAt: 1 });

  return textos.map((texto) => ({
    _id: texto._id,
    texto: texto.texto,
    audioUrl: `${process.env.API_URL}/audios/${texto.audioCompleto}`,
  }));
};

const deletarTextoService = async (textoId) => {
  await Texto.findByIdAndDelete(textoId);

  return { message: "Texto removido com sucesso" };
};

const atualizarTextoService = async (textoId, data) => {
  return Texto.findByIdAndUpdate(textoId, data, { new: true });
};

export {
  criarTextoService,
  listarTextosPorLicaoService,
  deletarTextoService,
  atualizarTextoService,
};
