import user from "../models/User.js";
import NotFound from "../exceptions/NotFound.js";

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
    return await user.create(data);
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
