import mongoose from "mongoose";

const AudioSchema = new mongoose.Schema(
  {
    idLicao: {
      type: String,
      ref: "Licoes",
      required: true,
    },
    idAudio: {
      type: String,
      required: false,
    },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Audio", AudioSchema);
