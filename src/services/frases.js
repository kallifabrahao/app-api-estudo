import Frases from "../models/frases.js";
import { salvarAudio, deletarAudioService } from "./audio.js";
import { parseTextoParaFrases } from "../utils/parse.js";
import Audio from "../models/audio.js";

const criarFraseService = async (body, files) => {
  if (files.length > 0) {
    const audioId = await salvarAudio(files);
    await Audio.create({
      idLicao: body.idLicao,
      idAudio: audioId,
    });
  }

  const frases = parseTextoParaFrases(body.frase);

  for (const frase of frases) {
    await Frases.create({
      idLicao: body.idLicao,
      frase,
      inicioAudio: 0,
      fimAudio: 0,
    });
  }

  return true;
};

const listarFrasesPorLicaoService = async (idLicao) => {
  const frases = await Frases.find({ idLicao }).sort({ createdAt: 1 });
  const audio = await Audio.findOne({ idLicao });

  return {
    frases,
    audioUrl: audio ? `${process.env.API_URL}/audios/${audio.idAudio}` : null,
  };
};

const deletarFraseService = async (fraseId) => {
  const fraseExistente = await Frases.findById(fraseId);

  if (!fraseExistente) {
    throw new Error("Frase não encontrada");
  }

  const audioId = fraseExistente.audio;
  await deletarAudioService(audioId);

  await Frases.findByIdAndDelete(fraseId);

  return { message: "Frase removida com sucesso" };
};

const atualizarFraseService = async (fraseId, data, files) => {
  const fraseExistente = await Frases.findById(fraseId);

  if (!fraseExistente) {
    throw new Error("Frase não encontrada");
  }

  const audioId = fraseExistente.audio;

  if (files.length > 0) {
    await deletarAudioService(audioId);
    const novoAudioId = await salvarAudio(files);
    data.audio = novoAudioId;
  } else {
    data.audio = audioId;
  }

  return Frases.findByIdAndUpdate(fraseId, data, { new: true });
};

export {
  criarFraseService,
  listarFrasesPorLicaoService,
  deletarFraseService,
  atualizarFraseService,
};
