import User from "../models/User.js";
import bcrypt from "bcryptjs";
import getAccessToken from "./tokenService.js";

class AuthService {
  static async login(email, senha) {
    const user = await User.findOne({ email }).select('+senha');

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const equalPasswords = await bcrypt.compare(senha, user.senha);

    if (!equalPasswords) {
      throw new Error("Usuário ou senha estão incorretos!");
    }

    const accessToken = getAccessToken(user);
    const expiresIn = 86400;

    return { accessToken, expiresIn };
  }  
}

export default AuthService;
