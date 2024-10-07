import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória"],
    },
    paginas: {
      type: Number,
      min: [
        10,
        "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}",
      ],
      max: [
        5000,
        "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}",
      ],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O(a) autor(a) é obrigatório"],
    },
  },
  { versionKey: false }
);

const book = mongoose.model("livros", bookSchema);

export default book;
