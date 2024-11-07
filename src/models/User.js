import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome do(a) usuário é obrigatório"],
    },
    email: {
      type: String,
      required: [true, "O email do usuário é obrigatório"],
      unique: [true, "E-mail já cadastrado!"],
      match: [/.+@.+\..+/, "Por favor, insira um email válido"],
    },
    senha: {
      type: String,
      required: [true, "A senha é obrigatória"],
      minlength: [6, "A senha precisa ter pelo menos 6 caracteres"],
      select: false
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles'
      }
    ]
  },
  { versionKey: false, timestamps: true }
);

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.senha;
    return ret;
  }
});

const user = mongoose.model("usuarios", userSchema);

export default user;
