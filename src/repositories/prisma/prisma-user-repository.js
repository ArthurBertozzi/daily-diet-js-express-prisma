import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaUserRepository {
  #uservalidation(user, id) {
    if (!user) {
      throw new Error(`User with id ${id} does not exist.`);
    }
  }

  async findAll() {
    const users = await prisma.user.findMany();
    return users;
  }

  async findById(id) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    this.#uservalidation(user, id);

    return user;
  }

  async findByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    this.#uservalidation(user, email);

    return user;
  }

  async deleteById(id) {
    const user = await this.findById(id);
    this.#uservalidation(user, id);
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async updateUser(id, data) {
    let user = await this.findById(id);
    user = {
      ...user,
      data,
    };
    this.#uservalidation(user, id);

    const updated_user = prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return updated_user;
  }

  async createUser(data) {
    const user = await prisma.user.create({ data });

    return user;
  }
}

const test = new PrismaUserRepository();
console.log(
  await test.createUser({ email: "test2223@gmail.com", name: "teste" })
);
