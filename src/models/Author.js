import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatório"],
    },
    nacionalidade: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const author = mongoose.model("autores", authorSchema);

export { author, authorSchema };
