import Frases from "../models/frases.js";
import { salvarAudio, deletarAudioService } from "./audio.js";

const criarFraseService = async (body, files) => {
  let audioId = null;

  if (files.length > 0) {
    audioId = await salvarAudio(files);
  }

  return Frases.create({
    idLicao: body.idLicao,
    frase: body.frase,
    audioCurto: audioId,
  });
};

const listarFrasesPorLicaoService = async (idLicao) => {
  const frases = await Frases.find({ idLicao }).sort({ createdAt: 1 });

  return frases.map((frase) => ({
    _id: frase._id,
    frase: frase.frase,
    audioUrl: `${process.env.API_URL}/audios/${frase.audioCurto}`,
  }));
};

const deletarFraseService = async (fraseId) => {
  const fraseExistente = await Frases.findById(fraseId);

  if (!fraseExistente) {
    throw new Error("Frase não encontrada");
  }

  const audioId = fraseExistente.audioCurto;
  await deletarAudioService(audioId);

  await Frases.findByIdAndDelete(fraseId);

  return { message: "Frase removida com sucesso" };
};

const atualizarFraseService = async (fraseId, data, files) => {
  const fraseExistente = await Frases.findById(fraseId);

  if (!fraseExistente) {
    throw new Error("Frase não encontrada");
  }

  const audioId = fraseExistente.audioCurto;

  if (files.length > 0) {
    await deletarAudioService(audioId);
    const novoAudioId = await salvarAudio(files);
    data.audioCurto = novoAudioId;
  } else {
    data.audioCurto = audioId;
  }

  return Frases.findByIdAndUpdate(fraseId, data, { new: true });
};

export {
  criarFraseService,
  listarFrasesPorLicaoService,
  deletarFraseService,
  atualizarFraseService,
};
