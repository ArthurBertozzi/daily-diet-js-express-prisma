import express from "express";
import { PrismaAuthRepository } from "../repositories/prisma/prisma-auth-repository.js";
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository.js";
import { AuthService } from "../services/auth.service.js";
import { UserService } from "../services/user.service.js";
import { parseReqId } from "./utils/parseIdToInt.js";
import { registerUserSchema } from "./validations/registerValidation.js";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { EmailAlreadyExistsError } from "../services/exceptions/userWithThisEmailAlreadyExists.js";
import { v4 } from "uuid";
import { generateTokens } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hashToken } from "../utils/hashToken.js";

const router = express.Router();
const authService = new AuthService(PrismaAuthRepository);
const userService = new UserService(PrismaUserRepository);

// All meals from an user
router.route("/register").post(async (req, res) => {
  try {
    registerUserSchema.parse(req.body);

    const userOrError = await userService.createUser(req.body);

    if (userOrError instanceof EmailAlreadyExistsError) {
      return res.status(400).json({ error: userOrError.message });
    }
    const jti = v4();
    console.log(`token jti: ${jti}`);

    const { accessToken, refreshToken } = generateTokens({ userOrError, jti });
    console.log(accessToken);
    console.log(refreshToken);
    await authService.addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: userOrError.id,
    });
    res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);
      res.status(400).json({ error: validationError.toString() });
    }
  }
});

router.route("/login").post(async (req, res, next) => {
  try {
    registerUserSchema.parse(req.body);

    const { email, password } = req.body;

    const userExists = await userService.findUserByEmail(email);

    if (!userExists) {
      return res.status(403).json({ error: "Invalid login credentials." });
    }

    const validPassword = await bcrypt.compare(password, userExists.password);

    console.log(validPassword);

    if (!validPassword) {
      return res.status(403).json({ error: "Invalid login credentials." });
    }
    const jti = v4();
    console.log(`token jti: ${jti}`);

    const { accessToken, refreshToken } = generateTokens(userExists, jti);
    console.log("accesstoken");
    console.log(accessToken, refreshToken);
    await authService.addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: userExists.id,
    });
    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);
      res.status(400).json({ error: validationError.toString() });
    }
  }
});

router.route("/refreshToken").post(async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error("Missing refresh token.");
    }
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await authService.findRefreshTokenById(
      payload.jti
    );

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const user = await userService.findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    await authService.deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await authService.addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
});

router.route("/revokeRefreshTokens").post(async (req, res, next) => {
  try {
    const { userId } = req.body;
    await authService.revokeAllUserTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (err) {
    next(err);
  }
});

export default router;
