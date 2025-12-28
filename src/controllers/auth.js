import { cadastrarUsuarioService, loginService } from "../services/auth.js";

const cadastrarUsuario = async (req, res) => {
  try {
    const usuario = await cadastrarUsuarioService(req.body);
    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export { cadastrarUsuario, login };
