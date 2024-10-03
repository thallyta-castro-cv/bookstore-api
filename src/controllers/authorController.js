import { author } from "../models/Author.js"

class AuthorController {
  static async updateAuthor(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado" });
    }catch(erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização do autor`});
    }    
  };

  static async createAuthors(req, res) {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: newAuthor });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar autor!`});
    }
  };

  static async getById(req, res) {
    try {
      const id = req.params.id;
      const authorFound = await author.findById(id);
      res.status(200).json(authorFound);
    }catch(erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do autor`});
    }    
  };

  static async getAuthors(req, res) {
    try {
      const listAuthors = await author.find({});
      res.status(200).json(listAuthors);
    }catch(erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição`});
    }    
  };

  static async deleteAuthor(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id, req.body);
      res.status(200).json({ message: "Autor deletado com sucesso" });
    }catch(erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão do autor`});
    }    
  };
};

export default AuthorController;