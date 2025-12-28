import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuarios.js";

const cadastrarUsuarioService = async (data) => {
  const usuarioExiste = await Usuario.findOne({ email: data.email });

  if (usuarioExiste) {
    throw new Error("Usuário já existe");
  }

  const senhaHash = await bcrypt.hash(data.senha, 10);

  return Usuario.create({
    nome: data.nome,
    email: data.email,
    senha: senhaHash,
  });
};

const loginService = async ({ email, senha }) => {
  const usuario = await Usuario.findOne({ email });

  if (!usuario || !usuario.ativo) {
    throw new Error("Credenciais inválidas");
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
    usuario: {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
    },
  };
};

export { cadastrarUsuarioService, loginService };
