import User from "../models/User.js";
import TokenService from "../services/tokenService.js"

function roles(rolesList) {
  return async function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    const userId = TokenService.getUserIdFromToken(token);

    try {
      const user = await User.findById(userId).populate({
        path: "roles",
        select: "nome",
      });

      if (!user) {
        return res.status(401).send("Usuário não cadastrado");
      }

      const rolesCadastradas = user.roles
        .map((role) => role.nome)
        .some((role) => rolesList.includes(role));

      if (!rolesCadastradas) {
        return res.status(401).send("Usuário não possui acesso a essa rota");
      }

      return next();
    } catch (error) {
      return res.status(500).send("Erro no servidor", error.message);
    }
  };
}

export default roles;
