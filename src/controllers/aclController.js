import ACLService from "../services/aclService.js";

class ACLController {

  static async assignRoleToUser(req, res) {
    const { userId, roleId } = req.body;

    try {
      const updatedUser = await ACLService.assignRoleToUser(userId, roleId);
      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

export default ACLController;
