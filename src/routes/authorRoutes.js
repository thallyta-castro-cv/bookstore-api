import express from 'express';
import AuthorController from "../controllers/authorController.js"
import pagination from "../middlewares/pagination.js";

const routes = express.Router();

routes.get("/v1/autores", AuthorController.getAuthors, pagination)
routes.get("/v1/autores/:id", AuthorController.getById);
routes.post("/v1/autores", AuthorController.createAuthors);
routes.put("/v1/autores/:id", AuthorController.updateAuthor);
routes.delete("/v1/autores/:id", AuthorController.deleteAuthor);

export default routes;
