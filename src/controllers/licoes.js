import {
  criarLicaoService,
  listarLicoesService,
  deletarLicaoService,
  atualizarLicaoService,
} from "../services/licoes.js";

const criarLicao = async (req, res) => {
  try {
    const licao = await criarLicaoService(req.body);
    return res.status(201).json(licao);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar lição" });
  }
};

const listarLicoes = async (req, res) => {
  try {
    const licoes = await listarLicoesService();
    return res.json(licoes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar lições" });
  }
};

const deletarLicao = async (req, res) => {
  try {
    const licao = await deletarLicaoService(req.params.id);
    return res.json(licao);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar lição" });
  }
};

const atualizarLicao = async (req, res) => {
  try {
    const licao = await atualizarLicaoService(req.params.id, req.body);
    return res.json(licao);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar lição" });
  }
};

export { criarLicao, listarLicoes, deletarLicao, atualizarLicao };
