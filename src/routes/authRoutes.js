import express from 'express';
import AuthController from '../controllers/authController';

const routes = express.Router();

routes.post('/auth/login', AuthController.login)

module.exports = routes;