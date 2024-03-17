import { PrismaAuthRepository } from "../repositories/prisma/prisma-auth-repository.js";
import { hashToken } from "../utils/hashToken.js";

export class AuthService {
  constructor(authRepository) {
    this.authRepository = new authRepository();
  }

  async addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
    const hashedToken = hashToken(refreshToken);
    console.log("hashed token");
    console.log(hashedToken);
    console.log(jti);
    console.log("user id");
    console.log(userId);
    await this.authRepository.addRefreshTokenToWhitelist({
      id: jti,
      hashedToken,
      userId,
    });
  }

  async findRefreshTokenById(id) {
    const token = await this.authRepository.findById(id);
    return token;
  }

  async revokeRefreshToken(id) {
    await this.authRepository.deleteRefreshToken(id);
  }

  async revokeAllUserTokens(userId) {
    await this.authRepository.revokeTokens(userId);
  }
}
