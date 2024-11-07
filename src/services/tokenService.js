import jsonwebtoken from "jsonwebtoken";
import jsonSecret from "../../src/config/jsonSecret.js";

class TokenService {
  static getAccessToken(user) {
    return jsonwebtoken.sign(
      {
        id: user._id,
        email: user.email,
      },
      jsonSecret.secret,
      {
        expiresIn: 86400,
      }
    );
  }

  static getUserIdFromToken(token) {
    try {
      const decoded = jsonwebtoken.decode(token);
      return decoded?.id;
    } catch (error) {
      throw new Error("Erro ao decodificar o token", error.message);
    }
  }
}

export default TokenService;