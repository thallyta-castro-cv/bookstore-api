import User from "../models/User.js";

class AuthService {
  static async loginUser(email, password) {
    const user = await User.findOne({ email });
    
    if (!user) throw new Error("Usuário não encontrado");

    if (user.password !== password) throw new Error("Credenciais inválidas");
    return { id: user._id, email: user.email, name: user.name };
  }
}

export default AuthService;