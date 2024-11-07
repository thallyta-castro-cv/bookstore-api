import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true,
    },
    descricao: {
      type: String,
      required: true,
    }
  },
  { versionKey: false, timestamps: true}
);

const permission = mongoose.model("permissoes", permissionSchema);

export default permission;
