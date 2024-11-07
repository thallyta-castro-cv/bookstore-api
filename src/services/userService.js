import user from "../models/User.js";
import NotFound from "../exceptions/NotFound.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

class UserService {
  static async getUsers() {
    return await user.find()
      .populate("roles")
  }

  static async getUserById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    const userFound = await user
      .findById(id)
      .populate("roles");
    if (!userFound) throw new NotFound("Id do usuário não encontrado.");
    return userFound;
  }

  static async deleteUser(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    const deletedUser = await user
      .findByIdAndDelete(id);

    if (!deletedUser) throw new NotFound("Usuário não encontrado");
    return deletedUser;
  }

  static async updateUser(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }
  
    try {
      const updatedUser = await user.findByIdAndUpdate(
        id,
        {
          $set: {
            nome: data.nome,
            email: data.email,
          },
        },
        { new: true }
      );
  
      if (!updatedUser) throw new Error("Usuário não encontrado");
      return updatedUser;
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }
  

  static async createUser(data) {
    if (await user.findOne({ email: data.email })) {
      throw new Error("Usuário já cadastrado");
    }

    try {
      const newUser = await user.create({
        ...data,
        senha: await bcrypt.hash(data.senha, 8),
      });
      return { newUser };
    } catch (error) {
      throw new Error(error.message);
    } 
  }
}

export default UserService;
