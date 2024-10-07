import { author } from "../models/index.js";
import { book } from "../models/index.js";

class BookController {
  static async updateBook(req, res, next) {
    try {
      const id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(200).send({ message: "Livro atualizado" });
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
      res.status(200).send(bookFound);
    } catch (erro) {
      next(erro);
    }
  }

  static async getBooks(req, res, next) {
    try {
      const listBooks = await book.find({});
      res.status(200).send(listBooks);
    } catch (erro) {
      next(erro);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const id = req.params.id;
      await book.findByIdAndDelete(id, req.body);
      res.status(200).send({ message: "Livro deletado com sucesso" });
    } catch (erro) {
      next(erro);
    }
  }

  static async listBooksWithFilters(req, res, next) {
    const busca = await processFilters(req.query);

    try {
      if (busca !== null) {
        const books = await book.find(busca).populate("autor");
        res.status(200).send(books);
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  }
}

async function processFilters(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;
  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas || maxPaginas) busca.paginas = {};
  if (minPaginas) busca.paginas = { $gte: minPaginas };
  if (maxPaginas) busca.paginas = { $lte: maxPaginas };

  if (nomeAutor) {
    const autor = await author.findOne({ nome: nomeAutor });

    if (autor !== null) {
      const autorId = autor._id;
      busca.autor = autorId;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default BookController;
