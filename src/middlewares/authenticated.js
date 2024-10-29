import jsonwebtoken from 'jsonwebtoken';
import jsonSecret from "../../src/config/jsonSecret.js";


async function authenticated(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Access token não informado" });
  }

  const [, accessToken] = token.split(" ");

  try {
    jsonwebtoken.verify(accessToken, jsonSecret.secret);

    const { id, email } = jsonwebtoken.decode(accessToken);

    req.userId = id;
    req.userEmail = email;

    return next();
  
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
     return res.status(401).send({ message: "Usuário não autorizado" });
  }
}

export default authenticated;
