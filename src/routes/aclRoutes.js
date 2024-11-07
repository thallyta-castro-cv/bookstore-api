import express from "express";
import ACLController from "../controllers/aclController.js";

const routes = express.Router();

routes.post('/seguranca/acl', ACLController.assignRoleToUser);
export default routes; 