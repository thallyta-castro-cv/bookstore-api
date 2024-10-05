import { author } from "../models/Author.js"
import NotFound from "../exceptions/NotFound.js";

class AuthorController {
  static async updateAuthor(req, res, next) {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado" });
    } catch(erro) {
      next(erro);
    }    
  };

  static async createAuthors(req, res, next) {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: newAuthor });
    } catch (erro) {
      next(erro);
    }
  };

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const authorFound = await author.findById(id);
      if(authorFound !== null){
        res.status(200).json(authorFound);
      } else {
        next(new NotFound("Id do autor não encontrado."));
      }
    } catch(erro) {
      next(erro);    
    }    
  };

  static async getAuthors(req, res, next) {
    try {
      const listAuthors = await author.find({});
      res.status(200).json(listAuthors);
    } catch(erro) {
      next(erro);
    }    
  };

  static async deleteAuthor(req, res, next) {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id, req.body);
      res.status(200).json({ message: "Autor deletado com sucesso" });
    } catch(erro) {
      next(erro);
    }    
  };
};

export default AuthorController;