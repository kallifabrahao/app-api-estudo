import mongoose from "mongoose";

const TextoSchema = new mongoose.Schema(
  {
    idLicao: {
      type: String,
      ref: "Frases",
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
    audioCompleto: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Texto", TextoSchema);
