import { author } from "../models/Author.js";
import book from "../models/Book.js";

class BookController {
  static async updateBook(req, res, next) {
    try {
      const id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado" });
    } catch (erro) {
      next(erro);
    }
  }

  static async createBooks(req, res, next) {
    const newBook = req.body;

    try {
      const authorFound = await author.findById(newBook.autor);
      const completedBook = { ...newBook, autor: { ...authorFound._doc } };
      const createdBook = await book.create(completedBook);
      res
        .status(201)
        .json({ message: "criado com sucesso", livro: createdBook });
    } catch (erro) {
      next(erro);
    }
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const bookFound = await book.findById(id);
      res.status(200).json(bookFound);
    } catch (erro) {
      next(erro);
    }
  }

  static async getBooks(req, res, next) {
    try {
      const listBooks = await book.find({});
      res.status(200).json(listBooks);
    } catch (erro) {
      next(erro);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const id = req.params.id;
      await book.findByIdAndDelete(id, req.body);
      res.status(200).json({ message: "Livro deletado com sucesso" });
    } catch (erro) {
      next(erro);
    }
  }

  static async listBooksByEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const booksByEditora = await book.find({ editora: editora });
      res.status(200).json(booksByEditora);
    } catch (erro) {
      next(erro);
    }
  }
}

export default BookController;
