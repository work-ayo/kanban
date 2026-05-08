import crypto from "crypto";
import { FastifyPluginAsync } from 'fastify';
import { hashPassword, verifyPassword } from '../../utils/password.js';
import { hashToken } from '../../utils/tokens.js';

export const authRoutes: FastifyPluginAsync = async (app) => {
  app.post('/auth/register', async (req:any) => {
    const { loginId, password, name, department } = req.body;
    const user = await app.prisma.user.create({ data: { loginId, passwordHash: await hashPassword(password), name, department } });
    return { userId: user.userId };
  });
  app.post('/auth/login', async (req:any, reply) => {
    const { loginId, password } = req.body;
    const user = await app.prisma.user.findUnique({ where: { loginId } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) return reply.code(401).send({ message: 'invalid' });
    const accessToken = await reply.jwtSign({ userId: user.userId, globalRole: user.globalRole });
    const refreshToken = crypto.randomUUID();
    await app.prisma.refreshToken.create({ data: { userId: user.userId, tokenHash: hashToken(refreshToken), expiresAt: new Date(Date.now()+1000*60*60*24*7) } });
    return { user, tokens: { accessToken, refreshToken } };
  });
  app.post('/auth/refresh', async (req:any, reply) => { const { refreshToken } = req.body; const rt = await app.prisma.refreshToken.findFirst({ where: { tokenHash: hashToken(refreshToken), revokedAt: null } }); if(!rt) return reply.code(401).send({message:'invalid'}); const accessToken = await reply.jwtSign({ userId: rt.userId }); return { tokens: { accessToken, refreshToken } }; });
  app.post('/auth/logout', async (req:any) => { const { refreshToken } = req.body; await app.prisma.refreshToken.updateMany({ where: { tokenHash: hashToken(refreshToken) }, data: { revokedAt: new Date() } }); return { ok: true }; });
  app.get('/auth/me', { preHandler: [app.requireAuth] }, async (req:any) => app.prisma.user.findUnique({ where: { userId: req.user.userId } }));
};
