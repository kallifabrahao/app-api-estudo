import Licoes from "../models/licoes.js";
import Frases from "../models/frases.js";

const criarLicaoService = async (data) => {
  return Licoes.create({
    idTema: data.idTema,
    descricao: data.descricao,
    titulo: data.titulo,
    status: "estudando",
  });
};

const listarLicoesService = async (idTema, status) => {
  return Licoes.find({ idTema, deletedAt: null, status }).sort({
    createdAt: 1,
  });
};

const deletarLicaoService = async (licaoId) => {
  await Frases.deleteMany({
    idLicao: licaoId,
  });

  await Licoes.findByIdAndDelete(licaoId);

  return { message: "Lição e dependências removidas com sucesso" };
};

const atualizarLicaoService = async (_id, data) => {
  return Licoes.findByIdAndUpdate(
    _id,
    { ...data, updatedAt: new Date() },
    { new: true }
  );
};

const atualizarStatusLicaoService = async (_id, status) => {
  return Licoes.findByIdAndUpdate(
    _id,
    { status, updatedAt: new Date() },
    { new: true }
  );
};

export {
  criarLicaoService,
  listarLicoesService,
  deletarLicaoService,
  atualizarLicaoService,
  atualizarStatusLicaoService,
};
