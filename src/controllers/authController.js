import AuthService from "../services/authService.js";

class AuthController {
  // eslint-disable-next-line no-unused-vars
  static async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios" });
      }
      
      const { accessToken, expiresIn } = await AuthService.login(email, senha);
      
      return res.status(200).json({ accessToken, expiresIn });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}

export default AuthController;
