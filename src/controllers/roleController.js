import RoleService from "./../services/roleService.js";

class RoleController {
  static async getRoles(req, res, next) {
    try {
      const roles = await RoleService.getAllRoles();
      res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  }

  static async getRoleById(req, res, next) {
    try {
      const { id } = req.params;
      const role = await RoleService.getRoleById(id);
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }

  static async createRole(req, res, next) {
    try {
      const newRole = await RoleService.createRole(req.body);
      res.status(201).send(newRole);
    } catch (error) {
        console.error(error)
      next(error);
    }
  }

  static async updateRole(req, res, next) {
    try {
      const { id } = req.params;
      const updatedRole = await RoleService.updateRole(id, req.body);
      res
        .status(200)
        .json({ message: "Role atualizada com sucesso", role: updatedRole });
    } catch (error) {
      next(error);
    }
  }

  static async deleteRole(req, res, next) {
    try {
      const { id } = req.params;
      await RoleService.deleteRole(id);
      res.status(200).json({ message: "Role excluída com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}

export default RoleController;
