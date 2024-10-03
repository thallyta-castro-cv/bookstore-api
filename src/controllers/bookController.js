import { author } from "../models/Author.js";
import book from "../models/Book.js";

class BookController {
  static async updateBook(req, res) {
    try {
      const id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na atualização do livro` });
    }
  }

  static async createBooks(req, res) {
    const newBook = req.body;

    try {
      const authorFound = await author.findById(newBook.autor);
      const completedBook = { ...newBook, autor: { ...authorFound._doc } };
      const createdBook = await book.create(completedBook);
      res
        .status(201)
        .json({ message: "criado com sucesso", livro: createdBook });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao cadastrar livro!` });
    }
  }

  static async getById(req, res) {
    try {
      const id = req.params.id;
      const bookFound = await book.findById(id);
      res.status(200).json(bookFound);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição do livro` });
    }
  }

  static async getBooks(req, res) {
    try {
      const listBooks = await book.find({});
      res.status(200).json(listBooks);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async deleteBook(req, res) {
    try {
      const id = req.params.id;
      await book.findByIdAndDelete(id, req.body);
      res.status(200).json({ message: "Livro deletado com sucesso" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na exclusão do livro` });
    }
  }

  static async listBooksByEditora(req, res) {
    const editora = req.query.editora;
    try {
      const booksByEditora = await book.find({ editora: editora });
      res.status(200).json(booksByEditora);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na busca` });
    }
  }
}

export default BookController;
