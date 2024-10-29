import user from "../models/User.js";
import NotFound from "../exceptions/NotFound.js";
import bcrypt from "bcryptjs";

class UserService {
  static async getUsers() {
    return await user.find();
  }

  static async getUserById(id) {
    const userFound = await user.findById(id);
    if (!userFound) throw new NotFound("Id do usuário não encontrado.");
    return userFound;
  }

  static async createUser(data) {
    const isUser = await user.findOne({ email: data.email });
    if (isUser) {
      throw new Error("Usuário já cadastrado");
    }

    try {
      const passwordHash = await bcrypt.hash(data.senha, 8);

      const newUser = await user.create({
        nome: data.nome,
        email: data.email,
        senha: passwordHash,
      });

      return newUser;
      
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw new Error("Erro ao cadastrar usuário");
    }
  }

  static async updateUser(id, data) {
    const updatedUser = await user.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) throw new NotFound("Usuário não encontrado");
    return updatedUser;
  }

  static async deleteUser(id) {
    const deletedUser = await user.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFound("Usuário não encontrado");
    return deletedUser;
  }
}

export default UserService;
