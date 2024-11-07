import express from 'express';
import BookController from "../controllers/bookController.js"
import pagination from '../middlewares/pagination.js';
import roles from '../middlewares/roles.js';
import permissions from '../middlewares/permissions.js';

const routes = express.Router();

routes.get("/livros", permissions(['viwer']), BookController.getBooks);
routes.get("/livros/busca", roles(['admin']), BookController.listBooksWithFilters, pagination);
routes.get("/livros/:id", roles(['admin']), BookController.getById);
routes.post("/livros", roles(['admin']), BookController.createBooks);
routes.put("/livros/:id", roles(['admin']), BookController.updateBook);
routes.delete("/livros/:id", roles(['admin']), BookController.deleteBook);

export default routes;
