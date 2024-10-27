import UserService from "../services/userService.js";
import BadRequestException from "../exceptions/BadRequestException.js";

class UserController {
  
  static async getUsers(req, res, next) {
    try {
      const users = await UserService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const userFound = await UserService.getUserById(id);
      res.status(200).json(userFound);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json({ message: "Usuário criado com sucesso", newUser });
    } catch (error) {
      if (error.name === "ValidationError") {
        next(new BadRequestException("Dados inválidos para criar o usuário"));
      } else {
        next(error);
      }
    }
  }

  static async updateUser(req, res, next) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json({ message: "Usuário atualizado com sucesso", updatedUser });
    } catch (error) {
      if (error.name === "ValidationError") {
        next(new BadRequestException("Dados inválidos para atualizar o usuário"));
      } else {
        next(error);
      }
    }
  }

  static async deleteUser(req, res, next) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
