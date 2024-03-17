import { prisma_db } from "../../utils/db.js";
import { hashToken } from "../../utils/hashToken.js";

export class PrismaAuthRepository {
  async addRefreshTokenToWhitelist(data) {
    console.log(data);
    const refreshToken = await prisma_db.refreshToken.create({
      data,
    });

    console.log(`db refresh token: ${refreshToken}`);
    return refreshToken;
  }

  async findById(id) {
    return prisma_db.refreshToken.findUnique({
      where: {
        id,
      },
    });
  }
  async deleteRefreshToken(id) {
    return prisma_db.refreshToken.update({
      where: {
        id,
      },
      data: {
        revoked: true,
      },
    });
  }

  async revokeTokens(userId) {
    return prisma_db.refreshToken.updateMany({
      where: {
        userId,
      },
      data: {
        revoked: true,
      },
    });
  }
}

// const test = new PrismaUserRepository();
// console.log(
//   await test.createUser({ email: "test2223@gmail.com", name: "teste" })
// );
