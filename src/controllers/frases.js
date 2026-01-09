import {
  criarFraseService,
  listarFrasesPorLicaoService,
  deletarFraseService,
  atualizarFraseService,
} from "../services/frases.js";

const criarConteudo = async (req, res) => {
  try {
    const conteudo = await criarFraseService(req.body, req.files);
    res.status(201).json(conteudo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar conteúdo" });
  }
};

const listarFrasesPorLicao = async (req, res) => {
  try {
    const { idLicao } = req.params;

    const frases = await listarFrasesPorLicaoService(idLicao);

    return res.status(200).json(frases);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao listar frases",
    });
  }
};

const deletarFrase = async (req, res) => {
  try {
    const resposta = await deletarFraseService(req.params.id);
    return res.json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar frase" });
  }
};

const atualizarFrase = async (req, res) => {
  try {
    const fraseAtualizada = await atualizarFraseService(
      req.params.id,
      req.body,
      req.files
    );
    return res.json(fraseAtualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar frase" });
  }
};

export { criarConteudo, listarFrasesPorLicao, deletarFrase, atualizarFrase };
