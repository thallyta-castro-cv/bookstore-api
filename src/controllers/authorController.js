import AuthorService from "../services/authorService.js";

class AuthorController {
  static async updateAuthor(req, res, next) {
    try {
      const id = req.params.id;
      await AuthorService.updateAuthor(id, req.body);
      res.status(200).json({ message: "Autor atualizado" });
    } catch (error) {
      next(error);
    }
  }

  static async createAuthors(req, res, next) {
    try {
      const newAuthor = await AuthorService.createAuthor(req.body);
      res.status(201).json({ message: "Criado com sucesso", autor: newAuthor });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const authorFound = await AuthorService.getAuthorById(id);
      res.status(200).json(authorFound);
    } catch (error) {
      next(error);
    }
  }

  static async getAuthors(req, res, next) {
    try {
      const authors = await AuthorService.getAllAuthors();
      res.status(200).json(authors);
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      const id = req.params.id;
      await AuthorService.deleteAuthor(id);
      res.status(200).json({ message: "Autor deletado com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthorController;
