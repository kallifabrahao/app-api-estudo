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
    audioCurto: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Frases", FrasesSchema);
