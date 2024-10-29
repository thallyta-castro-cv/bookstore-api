import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome do papel é obrigatório"],
      unique: true
    },
    descricao: {
      type: String,
      required: [true, "A descrição do papel é obrigatória"],
      maxlength: [100, "A descrição não pode exceder 100 caracteres"],
    },
  },
  { versionKey: false }
);

const role = mongoose.model("roles", roleSchema);

export default role;
