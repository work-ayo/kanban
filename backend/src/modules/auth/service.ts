import crypto from 'crypto';
import { FastifyInstance } from 'fastify';
import { hashPassword, verifyPassword } from '../../utils/password.js';
import { hashToken } from '../../utils/tokens.js';

export const authService = (app: FastifyInstance) => ({
  async register(input: { loginId: string; password: string; name: string; department?: string }) {
    const exists = await app.prisma.user.findUnique({ where: { loginId: input.loginId } });
    if (exists) throw new Error('LOGIN_ID_EXISTS');
    return app.prisma.user.create({
      data: {
        loginId: input.loginId,
        passwordHash: await hashPassword(input.password),
        name: input.name,
        department: input.department,
      },
    });
  },
  async login(input: { loginId: string; password: string }) {
    const user = await app.prisma.user.findUnique({ where: { loginId: input.loginId } });
    if (!user || !(await verifyPassword(input.password, user.passwordHash))) throw new Error('INVALID_CREDENTIALS');
    const refreshToken = crypto.randomUUID();
    await app.prisma.refreshToken.create({
      data: {
        userId: user.userId,
        tokenHash: hashToken(refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      },
    });
    return { user, refreshToken };
  },
});
