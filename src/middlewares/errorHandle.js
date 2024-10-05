import mongoose from "mongoose";
import BaseError from "../exceptions/BaseError.js";
import BadRequestException from "../exceptions/BadRequestException.js";
import ValidationError from "../exceptions/ValidationError.js";
import NotFound from "../exceptions/NotFound.js";

// eslint-disable-next-line no-unused-vars
function errorHandle(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new BadRequestException().sendResponse(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ValidationError(erro).sendResponse(res);
  } else if(erro instanceof NotFound){
    erro.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
}

export default errorHandle;
