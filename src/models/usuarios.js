import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    senha: { type: String, required: true },
    ativo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Usuario", UsuarioSchema);
