import Permission from "../models/Permission.js";

class PermissionService {
  static async createPermission(data) {
    const { nome, descricao } = data;

    const permissionFound = await Permission.findOne({ nome: nome });

    if (permissionFound) {
      throw new Error("Permissão com nome indicado já existe!");
    }

    try {
      const newPermission = new Permission({ nome, descricao });
      return await newPermission.save();
    } catch (error) {
      throw new Error("Erro ao criar permissão: " + error.message);
    }
  }

  static async getAllPermissions() {
    return await Permission.find();
  }

  static async updatePermission(id, data) {
    return await Permission.findByIdAndUpdate(id, data, { new: true });
  }

  static async deletePermission(id) {
    return await Permission.findByIdAndDelete(id);
  }

  static async getPermissionById(id) {
    return await Permission.findById(id);
  }
}

export default PermissionService;
