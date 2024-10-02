import express from 'express';
import BookController from "../controllers/bookController.js"

const routes = express.Router();

routes.get("/livros", BookController.getBooks)
routes.get("/livros/:id", BookController.getById);
routes.post("/livros", BookController.createBooks);
routes.put("/livros/:id", BookController.updateBook);
routes.delete("/livros/:id", BookController.deleteBook);

export default routes;
