import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String },
    nacionalidade: { type: String }
}, { versionKey: false });

const author = mongoose.model("autores", authorSchema);

export { author, authorSchema };
