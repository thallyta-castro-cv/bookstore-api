import PermissionService from '../services/permissionService.js';

class PermissionController {
  static async create(req, res) {
    const { nome, descricao } = req.body;

    try {
      const permission = await PermissionService.createPermission({ nome, descricao });
      res.status(201).send(permission);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const permissions = await PermissionService.getAllPermissions();
      res.status(200).json(permissions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    try {
      const updatedPermission = await PermissionService.updatePermission(
        id,
        req.body
      );
      if (!updatedPermission) {
        return res.status(404).json({ message: "Permissão não encontrada" });
      }
      return res.status(200).json(updatedPermission);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedPermission = await PermissionService.deletePermission(id);
      if (!deletedPermission) {
        return res.status(404).json({ message: "Permissão não encontrada" });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const permission = await PermissionService.getPermissionById(id);
      if (!permission) {
        return res.status(404).json({ message: "Permissão não encontrada" });
      }
      return res.status(200).json(permission);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default PermissionController;