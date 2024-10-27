import AuthService from "../services/authService.js";
import BadRequestException from "../exceptions/BadRequestException.js";

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new BadRequestException("Email e senha são obrigatórios");
      }
      const user = await AuthService.loginUser(email, password);
      res.status(200).json({ message: "Login bem-sucedido", user });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
