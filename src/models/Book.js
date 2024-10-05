import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O(a) autor(a) é obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória"],
    },
    numeroPaginas: { type: Number },
  },
  { versionKey: false }
);

const book = mongoose.model("livros", bookSchema);

export default book;
