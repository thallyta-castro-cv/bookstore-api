import { author } from "../models/index.js";
import NotFound from "../exceptions/NotFound.js";

class AuthorService {
  static async updateAuthor(id, data) {
    return await author.findByIdAndUpdate(id, data);
  }

  static async createAuthor(data) {
    return await author.create(data);
  }

  static async getAuthorById(id) {
    const authorFound = await author.findById(id);
    if (!authorFound) {
      throw new NotFound("Id do autor não encontrado.");
    }
    return authorFound;
  }

  static async getAllAuthors() {
    return await author.find();
  }

  static async deleteAuthor(id) {
    return await author.findByIdAndDelete(id);
  }
}

export default AuthorService;
