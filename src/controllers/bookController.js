import NotFound from "../exceptions/NotFound.js";
import { author, book } from "../models/index.js";

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

      const livroResultado = await book.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NotFound("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async getBooks(req, res, next) {
    try {
      const listBooks = book.find();
      req.resultado = listBooks;
      next();
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
    try {
      const search = await processFilters(req.query);

      if (search !== null) {
        const booksFound = book
          .find(search)
          .populate("autor");

        req.resultado = booksFound;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processFilters(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;
  let search = {};

  if (editora) search.editora = editora;
  if (titulo) search.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas || maxPaginas) search.paginas = {};
  if (minPaginas) search.paginas = { $gte: minPaginas };
  if (maxPaginas) search.paginas = { $lte: maxPaginas };

  if (nomeAutor) {
    const autor = await author.findOne({ nome: nomeAutor });

    if (autor !== null) {
      const autorId = autor._id;
      search.autor = autorId;
    } else {
      search = null;
    }
  }

  return search;
}

export default BookController;
