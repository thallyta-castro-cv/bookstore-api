import AuthService from "../services/authService.js";

class AuthController {
  
  static async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        res.status(400).json({ message: "Email e senha são obrigatórios" })
      }
      const user = await AuthService.login(email, senha);
      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  }
}

export default AuthController;
