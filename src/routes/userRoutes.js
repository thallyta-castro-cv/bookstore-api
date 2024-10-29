import express from "express";
import UserController from "../controllers/userController.js";
import authenticated from "../middlewares/authenticated.js";

const routes = express.Router();

routes.use(authenticated);

routes.get("/usuarios", UserController.getUsers);
routes.get("/usuarios/:id", UserController.getById);
routes.post("/usuarios", UserController.createUser);
routes.put("/usuarios/:id", UserController.updateUser);
routes.delete("/usuarios/:id", UserController.deleteUser);

export default routes;
