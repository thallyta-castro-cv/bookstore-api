import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandle from "./middlewares/errorHandle.js";
import resourceNotFoundHandle from "./middlewares/resourceNotFoundHandle.js";
import swaggerSetup from "./config/swaggerConfig.js"; 

const db = await connectDatabase();

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});


const app = express();
app.use(express.json());
routes(app);
swaggerSetup(app);

app.use(resourceNotFoundHandle);
app.use(errorHandle);

export default app;