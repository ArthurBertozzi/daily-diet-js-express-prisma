// import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";

export class UserService {
  constructor(userRepository) {
    this.userRepository = new userRepository();
  }

  async createUser(data) {
    const createdUser = await this.userRepository(data);
    return createdUser;
  }

  async deleteUser(userId) {
    await this.userRepository.deleteById(userId);
  }

  async findUserById(userId) {
    const user = await this.userRepository.findById(userId);
    return user;
  }

  async findUserByEmail(email) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}
