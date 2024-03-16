import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaUserRepository {
  #uservalidation(user) {
    if (!user) {
      return false;
    }
    return true;
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

    // alguma forma de deixar isso menos repetitivo entre as requests?
    if (this.#uservalidation(user) === false) {
      return { message: `User with id ${id} does not exist.` };
    }

    return user;
  }

  async findByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async deleteById(id) {
    const user = await this.findById(id);
    if (this.#uservalidation(user) === false) {
      return { message: `User with id ${id} does not exist.` };
    }
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
    if (this.#uservalidation(user) === false) {
      return { message: `User with id ${id} does not exist.` };
    }

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

// const test = new PrismaUserRepository();
// console.log(
//   await test.createUser({ email: "test2223@gmail.com", name: "teste" })
// );
