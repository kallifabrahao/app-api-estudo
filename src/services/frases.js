import Frases from "../models/frases.js";
import { salvarAudio, deletarAudioService } from "./audio.js";

const criarFraseService = async (body, files) => {
  const audioId = await salvarAudio(files);

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
  await Frases.findByIdAndDelete(fraseId);
  await deletarAudioService(fraseId);

  return { message: "Frase removida com sucesso" };
};

const atualizarFraseService = async (fraseId, data) => {
  return Frases.findByIdAndUpdate(fraseId, data, { new: true });
};

export {
  criarFraseService,
  listarFrasesPorLicaoService,
  deletarFraseService,
  atualizarFraseService,
};
