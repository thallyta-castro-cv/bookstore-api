import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: {
      type: String,
      required: true,
      unique: true,
    },
    descricao: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const permission = mongoose.model("permissoes", permissionSchema);

export default permission;
