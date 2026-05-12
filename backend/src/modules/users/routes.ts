import { FastifyPluginAsync } from 'fastify';
export const usersRoutes: FastifyPluginAsync = async (app)=>{ app.get('/users', async ()=>app.prisma.user.findMany()); };
