import BadRequestException from './../exceptions/BadRequestException.js';

async function pagination(req, res, next) {
  try {  
    // eslint-disable-next-line prefer-const
    let { limit = 5, page = 1, ordenacao = "_id:-1" } = req.query;
    // eslint-disable-next-line prefer-const
    let [campoOrdenacao, order] = ordenacao.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const resultado = req.resultado;

    if (limit > 0 && page > 0) {
      const paginatedResult = await resultado.find()
        .sort({ [campoOrdenacao]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      res.status(200).json(paginatedResult);
    } else {
      next(new BadRequestException());
    }
  } catch (error) {
    next(error);
  }
}

export default pagination;
