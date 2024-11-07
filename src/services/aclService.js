import User from "../models/User.js";
import Role from "../models/Role.js";

class ACLService {
    static async assignRoleToUser(userId, roleId) {
        try {
          const user = await User.findById(userId);
      
          if (!user) {
            throw new Error("Usuário não encontrado.");
          }
      
          const role = await Role.findById(roleId);
          if (!role) {
            throw new Error("Role não encontrada.");
          }
      
          user.roles = [role._id];
          await user.save();
      
          return user;
        } catch (error) {
          throw new Error("Erro ao atribuir role ao usuário: " + error.message);
        }
      }
      
}

export default ACLService;
