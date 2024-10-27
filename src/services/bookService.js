import { author, book } from "../models/index.js";
import NotFound from "../exceptions/NotFound.js";

class BookService {
  static async updateBook(id, data) {
    return await book.findByIdAndUpdate(id, data);
  }

  static async createBook(newBookData) {
    const authorFound = await author.findById(newBookData.autor);
    const completedBook = { ...newBookData, autor: { ...authorFound._doc } };
    return await book.create(completedBook);
  }

  static async getBookById(id) {
    const bookFound = await book.findById(id).populate("autor", "nome").exec();
    if (!bookFound) throw new NotFound("Id do livro não localizado.");
    return bookFound;
  }

  static async getAllBooks() {
    return await book.find();
  }

  static async deleteBook(id) {
    return await book.findByIdAndDelete(id);
  }

  static async listBooksWithFilters(query) {
    const search = await this.processFilters(query);
    if (search === null) return [];
    return book.find(search).populate("autor");
  }

  static async processFilters(params) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;
    let search = {};

    if (editora) search.editora = editora;
    if (titulo) search.titulo = { $regex: titulo, $options: "i" };
    if (minPaginas || maxPaginas) search.paginas = {};
    if (minPaginas) search.paginas = { $gte: minPaginas };
    if (maxPaginas) search.paginas = { $lte: maxPaginas };

    if (nomeAutor) {
      const autor = await author.findOne({ nome: nomeAutor });
      if (autor) {
        search.autor = autor._id;
      } else {
        search = null;
      }
    }

    return search;
  }
}

export default BookService;
