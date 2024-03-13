// import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";

import { EmailAlreadyExistsError } from "./exceptions/userWithThisEmailAlreadyExists.js";

export class UserService {
  constructor(userRepository) {
    this.userRepository = new userRepository();
  }

  async createUser(data) {
    console.log(data.email);
    const existingUser = await this.findUserByEmail(data.email);
    if (existingUser) {
      throw new EmailAlreadyExistsError(
        "Este email já está em uso. Por favor, escolha outro."
      );
    }
    const createdUser = await this.userRepository.createUser(data);
    return createdUser;
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
