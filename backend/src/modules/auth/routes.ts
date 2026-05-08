import { FastifyPluginAsync } from 'fastify';
import { authService } from './service.js';
import { loginBodySchema, refreshBodySchema, registerBodySchema } from './schema.js';
import { hashToken } from '../../utils/tokens.js';

export const authRoutes: FastifyPluginAsync = async (app) => {
  const service = authService(app);

  app.post('/auth/register', async (req, reply) => {
    const parsed = registerBodySchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(parsed.error.flatten());
    try {
      const user = await service.register(parsed.data);
      return { userId: user.userId };
    } catch (e) {
      return reply.code(409).send({ message: (e as Error).message });
    }
  });

  app.post('/auth/login', async (req, reply) => {
    const parsed = loginBodySchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(parsed.error.flatten());
    try {
      const { user, refreshToken } = await service.login(parsed.data);
      const accessToken = await reply.jwtSign({ userId: user.userId, globalRole: user.globalRole });
      return { user, tokens: { accessToken, refreshToken } };
    } catch {
      return reply.code(401).send({ message: 'INVALID_CREDENTIALS' });
    }
  });

  app.post('/auth/refresh', async (req, reply) => {
    const parsed = refreshBodySchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(parsed.error.flatten());
    const rt = await app.prisma.refreshToken.findFirst({ where: { tokenHash: hashToken(parsed.data.refreshToken), revokedAt: null } });
    if (!rt) return reply.code(401).send({ message: 'INVALID_REFRESH' });
    const accessToken = await reply.jwtSign({ userId: rt.userId });
    return { tokens: { accessToken, refreshToken: parsed.data.refreshToken } };
  });

  app.post('/auth/logout', async (req: any) => {
    const parsed = refreshBodySchema.parse(req.body);
    await app.prisma.refreshToken.updateMany({ where: { tokenHash: hashToken(parsed.refreshToken) }, data: { revokedAt: new Date() } });
    return { ok: true };
  });

  app.get('/auth/me', { preHandler: [app.requireAuth] }, async (req: any) => app.prisma.user.findUnique({ where: { userId: req.user.userId } }));
};
