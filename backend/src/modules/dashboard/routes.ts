import { FastifyPluginAsync } from 'fastify';
export const dashboardRoutes: FastifyPluginAsync = async (app)=>{ app.get('/dashboard/team',async(req:any)=>({teamId:req.query.teamId})); app.get('/dashboard/me',async(req:any)=>({teamId:req.query.teamId})); };
