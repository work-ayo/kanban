import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' { interface FastifyInstance { prisma: PrismaClient } }

export default fp(async (app) => {
  let client: PrismaClient;
  try {
    client = new PrismaClient();
    await client.$connect();
  } catch (error) {
    app.log.error(error);
    throw new Error('Prisma Client 초기화 실패: backend 폴더에서 "npm run prisma:generate" 실행 후 다시 시작하세요.');
  }

  app.decorate('prisma', client);
  app.addHook('onClose', async () => {
    await client.$disconnect();
  });
});
