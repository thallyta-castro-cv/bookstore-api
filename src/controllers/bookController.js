import book from "../models/Book.js"

class BookController {
  static async updateBook(req, res) {
    try {
      const id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado" });
    }catch(erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização do livro`});
    }    
  };

  static async createBooks(req, res) {
    try {
      const newBook = await book.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: newBook });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro!`});
    }
  };

  static async getById(req, res) {
    try {
      const id = req.params.id;
      const bookFound = await book.findById(id);
      res.status(200).json(bookFound);
    }catch(erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do livro`});
    }    
  };

  static async getBooks(req, res) {
    try {
      const listBooks = await book.find({});
      res.status(200).json(listBooks);
    }catch(erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição`});
    }    
  };

  static async deleteBook(req, res) {
    try {
      const id = req.params.id;
      await book.findByIdAndDelete(id, req.body);
      res.status(200).json({ message: "Livro deletado com sucesso" });
    }catch(erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão do livro`});
    }    
  };
};

export default BookController;