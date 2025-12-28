import {
  atualizarTemaService,
  criarTemaService,
  deletarTemaService,
  listarTemasService,
} from "../services/temas.js";

const listarTemas = async (req, res) => {
  try {
    const temas = await listarTemasService();
    res.status(200).json(temas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar temas" });
  }
};

const criarTema = async (req, res) => {
  try {
    const tema = await criarTemaService(req.body);
    res.status(201).json(tema);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar tema" });
  }
};

const atualizarTema = async (req, res) => {
  try {
    const { id } = req.params;
    const temaAtualizado = await atualizarTemaService(id, req.body);
    res.status(200).json(temaAtualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar tema" });
  }
};

const deletarTema = async (req, res) => {
  try {
    const { id } = req.params;
    await deletarTemaService(id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar tema" });
  }
};

export { listarTemas, criarTema, atualizarTema, deletarTema };
