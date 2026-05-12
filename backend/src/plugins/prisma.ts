import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' { interface FastifyInstance { prisma: PrismaClient } }

export default fp(async (app) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL이 설정되지 않았습니다. backend/.env.example를 backend/.env로 복사 후 DATABASE_URL 값을 채워주세요.');
  }

  let client: PrismaClient;
  try {
    client = new PrismaClient();
    await client.$connect();
  } catch (error) {
    app.log.error(error);
    throw new Error('Prisma Client 초기화 실패: 1) backend/.env의 DATABASE_URL 확인 2) npm run prisma:generate 실행 3) npm run prisma:migrate 실행 후 재시작하세요.');
  }

  app.decorate('prisma', client);
  app.addHook('onClose', async () => {
    await client.$disconnect();
  });
});
