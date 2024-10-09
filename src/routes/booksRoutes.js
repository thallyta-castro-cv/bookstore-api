import express from 'express';
import BookController from "../controllers/bookController.js"
import pagination from '../middlewares/pagination.js';

const routes = express.Router();

routes.get("/livros", BookController.getBooks, pagination);
routes.get("/livros/busca", BookController.listBooksWithFilters, pagination);
routes.get("/livros/:id", BookController.getById);
routes.post("/livros", BookController.createBooks);
routes.put("/livros/:id", BookController.updateBook);
routes.delete("/livros/:id", BookController.deleteBook);

export default routes;
