import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';
import path from 'path';

const swaggerDocument = yamljs.load(path.resolve('src/swagger.yaml'));

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
