import mongoose from "mongoose";

const TemasSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String, required: false },
    avatar: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Temas", TemasSchema);
