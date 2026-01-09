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
    if (error.message === "Credenciais inválidas") {
      return res.status(403).json({ message: error.message });
    }

    if (error.message === "Unauthorized") {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({
      message: {
        title: "Erro inesperado",
        subTitle: error.message || "Por favor, tente novamente mais tarde.",
      },
    });
  }
};

export { cadastrarUsuario, login };
