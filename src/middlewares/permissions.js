import User from "../models/User.js";
import Role from "../models/Role.js";
import TokenService from "../services/tokenService.js";

function permissionsRoles(listPermissions) {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    const userId = TokenService.getUserIdFromToken(token);

    try {
      const user = await User.findById(userId).populate({
        path: "roles",
        select: "id nome",
      });

      if (!user) {
        return res.status(401).send("Usuário não cadastrado");
      }

      const listRolesId = user.roles.map((role) => role.id);

      if (listRolesId.length === 0) {
        return res.status(401).send("Usuário não possui acesso a essa rota");
      }

      const roles = await Role.find({
        _id: { $in: listRolesId },
      }).populate({
        path: "permissoes",
        select: "id nome",
      });

      const hasPermission = roles.some((role) =>
        role.permissoes.some((permissao) =>
          listPermissions.includes(permissao.nome)
        )
      );

      if (!hasPermission) {
        return res.status(401).send("Usuário não tem acesso a essa rota");
      }

      return next();
    } catch (error) {
      return res.status(500).send("Erro no servidor", error.message);
    }
  };
}

export default permissionsRoles;
