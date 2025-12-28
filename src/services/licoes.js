import Licoes from "../models/licoes.js";
import Texto from "../models/texto.js";
import Frases from "../models/frases.js";

const criarLicaoService = async (data) => {
  return Licoes.create({
    titulo: data.titulo,
    status: data.status ?? "estudando",
  });
};

const listarLicoesService = async () => {
  return Licoes.find({ deletedAt: null }).sort({ createdAt: -1 });
};

const deletarLicaoService = async (licaoId) => {
  await Frases.deleteMany({
    idLicao: licaoId,
  });

  await Texto.deleteMany({
    idLicao: licaoId,
  });

  await Licoes.findByIdAndDelete(licaoId);

  return { message: "Lição e dependências removidas com sucesso" };
};

const atualizarLicaoService = async (id, data) => {
  return Licoes.findByIdAndUpdate(
    id,
    { ...data, updatedAt: new Date() },
    { new: true }
  );
};

export {
  criarLicaoService,
  listarLicoesService,
  deletarLicaoService,
  atualizarLicaoService,
};
