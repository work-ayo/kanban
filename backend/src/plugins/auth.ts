import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
export default fp(async(app)=>{ await app.register(jwt,{secret:process.env.JWT_ACCESS_SECRET || 'access-secret'}); app.decorate('requireAuth', async (req:any, reply:any)=>{await req.jwtVerify();});});
declare module 'fastify' { interface FastifyInstance { requireAuth: (req:any, reply:any)=>Promise<void> } }
