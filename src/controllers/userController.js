import NotFound from "../exceptions/NotFound.js";
import BadRequestException from "../exceptions/BadRequestException.js";
import user from "../models/User.js";

class UserController {
  
  static async getUsers(req, res, next) {
    try {
      const users = await user.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const userFound = await user.findById(id);
      if (userFound !== null) {
        res.status(200).json(userFound);
      } else {
        next(new NotFound("Id do usuário não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const newUser = await user.create(req.body);
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
      const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) throw new NotFound("Usuário não encontrado");
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
      const deletedUser = await user.findByIdAndDelete(req.params.id);
      if (!deletedUser) throw new NotFound("Usuário não encontrado");
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
