import express from 'express';
import BookController from "../controllers/bookController.js"
import pagination from '../middlewares/pagination.js';
import roles from '../middlewares/roles.js';
import permissions from '../middlewares/permissions.js';

const routes = express.Router();

routes.get("/v1/livros", permissions(['viwer']), BookController.getBooks);
routes.get("/v1/livros/busca", roles(['admin']), BookController.listBooksWithFilters, pagination);
routes.get("/v1/livros/:id", roles(['admin']), BookController.getById);
routes.post("/v1/livros", roles(['admin']), BookController.createBooks);
routes.put("/v1/livros/:id", roles(['admin']), BookController.updateBook);
routes.delete("/v1/livros/:id", roles(['admin']), BookController.deleteBook);

export default routes;
