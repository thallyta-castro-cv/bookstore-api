import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandle from "./middlewares/errorHandle.js";
import resourceNotFoundHandle from "./middlewares/resourceNotFoundHandle.js";
import swaggerSetup from "./config/swaggerConfig.js";
import logger from "./config/logger.js" 

const db = await connectDatabase();

db.on("error", (error) => {
  logger.info(`Erro de conexão: ${error}`);
});

db.once("open", () => {
  logger.info("Conexão com o banco feita com sucesso");
});


const app = express();
app.use(express.json());
routes(app);
swaggerSetup(app);

app.use(resourceNotFoundHandle);
app.use(errorHandle);

export default app;