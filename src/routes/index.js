import express from "express";
import books from "./booksRoutes.js";
import authors from "./authorRoutes.js";
import users from "./userRoutes.js"
import auth from "./authRoutes.js"

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));
  app.use(express.json(), books, authors, users, auth);
};
 
export default routes;
 