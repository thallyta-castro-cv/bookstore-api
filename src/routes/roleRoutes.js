import express from "express";
import RoleController from "../controllers/roleController.js";

const routes = express.Router();

routes.get("/roles", RoleController.getRoles);
routes.get("/roles/:id", RoleController.getRoleById);
routes.post("/roles", RoleController.createRole);
routes.put("/roles/:id", RoleController.updateRole);
routes.delete("/roles/:id", RoleController.deleteRole);

export default routes;
