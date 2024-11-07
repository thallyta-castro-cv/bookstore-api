import Role from "../models/Role.js";

class RoleService {
  static async getAllRoles() {
    try {
      return await Role.find().populate("permissoes");
    } catch (error) {
      throw new Error("Erro ao buscar roles: " + error.message);
    }
  }

  static async getRoleById(id) {
    try {
      const role = await Role.findById(id).populate("permissoes");
      if (!role) {
        throw new Error("Role não encontrada.");
      }
      return role;
    } catch (error) {
      throw new Error("Erro ao buscar role: " + error.message);
    }
  }

  static async createRole(data) {
    const { nome, descricao, permissoes } = data;

    const existingRole = await Role.findOne({ nome });
    if (existingRole) {
      throw new Error("Role já cadastrada.");
    }

    try {
      const newRole = new Role({ nome, descricao, permissoes });
      return await newRole.save();
    } catch (error) {
      throw new Error("Erro ao criar role: " + error.message);
    }
  }

  static async updateRole(id, data) {
    try {
      const { nome, descricao, permissoes } = data;
      const updatedRole = await Role.findByIdAndUpdate(
        id,
        { nome, descricao, permissoes },
        { new: true }
      ).populate("permissoes");

      if (!updatedRole) {
        throw new Error("Role não encontrada.");
      }

      return updatedRole;
    } catch (error) {
      throw new Error("Erro ao atualizar role: " + error.message);
    }
  }

  static async deleteRole(id) {
    try {
      const deletedRole = await Role.findByIdAndDelete(id);
      if (!deletedRole) {
        throw new Error("Role não encontrada.");
      }
      return deletedRole;
    } catch (error) {
      throw new Error("Erro ao excluir role: " + error.message);
    }
  }
}

export default RoleService;
