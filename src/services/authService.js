import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import jsonSecret from "../../src/config/jsonSecret.js";

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

    const accessToken = this.getAccessToken(user);

    return { accessToken };
  }

  static getAccessToken(user) {
    return jsonwebtoken.sign({
        id: user.id,
        email: user.email,
      },
      jsonSecret.secret,{
        expiresIn: 86400,
      }
    );
  }
}

export default AuthService;
