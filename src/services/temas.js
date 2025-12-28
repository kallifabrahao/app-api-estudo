import Temas from "../models/temas.js";
import Licoes from "../models/licoes.js";
import Texto from "../models/texto.js";
import Frases from "../models/frases.js";

const listarTemasService = async () => {
  const temas = await Temas.find({}).sort({ createdAt: 1 });

  return temas;
};

const criarTemaService = async (data) => {
  return Temas.create(data);
};

const atualizarTemaService = async (id, data) => {
  return Temas.findByIdAndUpdate(id, data, { new: true });
};

const deletarTemaService = async (temaId) => {
  const licoes = await Licoes.find({ idTema: temaId }).select("_id");

  const licoesIds = licoes.map((l) => l._id);

  await Frases.deleteMany({
    idLicao: { $in: licoesIds },
  });

  await Texto.deleteMany({
    idLicao: { $in: licoesIds },
  });

  await Licoes.deleteMany({
    idTema: temaId,
  });

  await Temas.findByIdAndDelete(temaId);

  return { message: "Tema e dependências removidos com sucesso" };
};

export {
  listarTemasService,
  criarTemaService,
  atualizarTemaService,
  deletarTemaService,
};
