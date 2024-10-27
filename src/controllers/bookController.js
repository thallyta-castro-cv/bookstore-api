import BookService from "../services/bookService.js";

class BookController {
  static async updateBook(req, res, next) {
    try {
      const id = req.params.id;
      await BookService.updateBook(id, req.body);
      res.status(200).send({ message: "Livro atualizado" });
    } catch (error) {
      next(error);
    }
  }

  static async createBooks(req, res, next) {
    try {
      const createdBook = await BookService.createBook(req.body);
      res.status(201).json({ message: "Criado com sucesso", livro: createdBook });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const book = await BookService.getBookById(id);
      res.status(200).send(book);
    } catch (error) {
      next(error);
    }
  }

  static async getBooks(req, res, next) {
    try {
      const books = await BookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const id = req.params.id;
      await BookService.deleteBook(id);
      res.status(200).send({ message: "Livro deletado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  static async listBooksWithFilters(req, res, next) {
    try {
      const books = await BookService.listBooksWithFilters(req.query);
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
