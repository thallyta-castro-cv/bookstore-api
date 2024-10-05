import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandle from "./middlewares/errorHandle.js";

const connection = await connectDatabase();

connection.on("error", (error) => {
    console.error("connection error", error);
});

connection.once("open", () => {
    console.log("connection successfully!");
});

const app = express();

routes(app);

app.use(express.json());
app.use(errorHandle);

export default app;