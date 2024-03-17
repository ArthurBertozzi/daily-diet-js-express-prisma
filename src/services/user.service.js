// import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";

import bcrypt from "bcrypt";

import { EmailAlreadyExistsError } from "./exceptions/userWithThisEmailAlreadyExists.js";

export class UserService {
  constructor(userRepository) {
    this.userRepository = new userRepository();
  }

  async createUser(user) {
    const existingUser = await this.findUserByEmail(user.email);

    if (existingUser) {
      return new EmailAlreadyExistsError(
        "Este email já está em uso. Por favor, escolha outro."
      );
    }

    console.log(user);

    try {
      user.password = bcrypt.hashSync(user.password, 10);
      const createdUser = await this.userRepository.createUser(user);
      return createdUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteUser(userId) {
    await this.userRepository.deleteById(userId);
  }

  async findUserById(userId) {
    const user = await this.userRepository.findById(userId);
    console.log(user);
    return user;
  }

  async findUserByEmail(email) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}
