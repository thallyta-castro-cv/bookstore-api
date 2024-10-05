import BadRequestException from "./BadRequestException.js";

class ValidationError extends BadRequestException {
  constructor(error) {
    const errorMessage = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${errorMessage}`);
  }
}

export default ValidationError;
