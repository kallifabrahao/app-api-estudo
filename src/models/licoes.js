import mongoose from "mongoose";

const LicoesSchema = new mongoose.Schema(
  {
    idTema: {
      type: String,
      ref: "Temas",
      required: true,
    },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    status: { type: String, required: false, default: "estudando" },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Licoes", LicoesSchema);
