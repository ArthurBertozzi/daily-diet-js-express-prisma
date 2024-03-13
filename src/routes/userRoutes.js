import express from "express";
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository.js";
import { UserService } from "../services/user.service.js";
import { parseReqId } from "./utils/parseIdToInt.js";
import { EmailAlreadyExistsError } from "../services/exceptions/userWithThisEmailAlreadyExists.js";

const router = express.Router();
const userService = new UserService(PrismaUserRepository);

router
  .route("/users/:user_id")
  .get(parseReqId("user_id"), async (req, res) => {
    const user = await userService.findUserById(req.params.user_id);
    res.json(user);
  })
  .delete(parseReqId("user_id"), async (req, res) => {
    await userService.deleteUser(req.params.user_id);
    res.json({ message: "User deleted" });
  });

router.route("/users").post(async (req, res) => {
  try {
    console.log(req.body);
    const userOrError = await userService.createUser(req.body);

    if (userOrError instanceof EmailAlreadyExistsError) {
      return res.status(400).json({ error: userOrError.message });
    }

    const user = userOrError;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
