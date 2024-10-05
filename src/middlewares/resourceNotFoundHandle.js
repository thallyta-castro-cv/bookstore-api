import NotFound from "../exceptions/NotFound.js";

function resourceNotFoundHandle(req, res, next) {
  const error404 = new NotFound();
  next(error404);
}

export default resourceNotFoundHandle;
