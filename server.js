import "dotenv/config";
import app from "./src/app.js";
import logger from "./src/config/logger.js";

const port = process.env.PORT || 3000;


app.listen(port, () => {
  logger.info(`🚀 Servidor rodando em: http://localhost:${port}`);
});
