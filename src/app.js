import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await connectDatabase();

connection.on("error", (error) => {
    console.error("connection error", error);
});

connection.once("open", () => {
    console.log("connection successfully!");
});

const app = express();
routes(app);

export default app;