import mongoose from "mongoose";

const FrasesSchema = new mongoose.Schema(
  {
    idLicao: {
      type: String,
      ref: "Licoes",
      required: true,
    },
    frase: {
      type: String,
      required: true,
    },
    traducao: {
      type: String,
      required: false,
    },
    inicioAudio: {
      type: Number,
      required: false,
    },
    fimAudio: {
      type: Number,
      required: false,
    },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("Frases", FrasesSchema);
