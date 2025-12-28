import {
  criarTextoService,
  listarTextosPorLicaoService,
  atualizarTextoService,
  deletarTextoService,
} from "../services/texto.js";

const criarConteudo = async (req, res) => {
  try {
    const conteudo = await criarTextoService(req.body, req.files);
    res.status(201).json(conteudo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar conteúdo" });
  }
};

const listarTextosPorLicao = async (req, res) => {
  try {
    const { idLicao } = req.params;

    const textos = await listarTextosPorLicaoService(idLicao);

    return res.status(200).json(textos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao listar textos",
    });
  }
};

const atualizarTexto = async (req, res) => {
  try {
    const { id } = req.params;
    const textoAtualizado = await atualizarTextoService(
      id,
      req.body,
      req.files
    );
    res.status(200).json(textoAtualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar texto" });
  }
};

const deletarTexto = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await deletarTextoService(id);
    res.status(200).json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar texto" });
  }
};

export { criarConteudo, listarTextosPorLicao, atualizarTexto, deletarTexto };
