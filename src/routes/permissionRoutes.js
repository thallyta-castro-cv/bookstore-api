import express from "express";
import PermissionController from "../controllers/permissionController.js";

const routes = express.Router();

routes.get("/permissoes", PermissionController.findAll);
routes.get("/permissoes/:id", PermissionController.getById);
routes.post("/permissoes", PermissionController.create);
routes.put("/permissoes/:id", PermissionController.update);
routes.delete("/permissoes/:id", PermissionController.delete);

export default routes;