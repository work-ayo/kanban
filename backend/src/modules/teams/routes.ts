import crypto from "crypto";
import { FastifyPluginAsync } from 'fastify';
export const teamsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/teams', { preHandler:[app.requireAuth] }, async ()=> app.prisma.team.findMany());
  app.post('/teams', { preHandler:[app.requireAuth] }, async (req:any)=> app.prisma.team.create({data:{name:req.body.name,joinCode:crypto.randomUUID()}}));
  app.get('/teams/:teamId', { preHandler:[app.requireAuth] }, async (req:any)=> app.prisma.team.findUnique({where:{teamId:req.params.teamId}}));
  app.patch('/teams/:teamId', { preHandler:[app.requireAuth] }, async (req:any)=> app.prisma.team.update({where:{teamId:req.params.teamId},data:req.body}));
  app.delete('/teams/:teamId', { preHandler:[app.requireAuth] }, async (req:any)=> app.prisma.team.delete({where:{teamId:req.params.teamId}}));
  app.post('/teams/:teamId/join', { preHandler:[app.requireAuth] }, async ()=>({ok:true}));
  app.get('/teams/:teamId/members', { preHandler:[app.requireAuth] }, async (req:any)=> app.prisma.teamMember.findMany({where:{teamId:req.params.teamId}}));
  app.patch('/teams/:teamId/members/:userId', { preHandler:[app.requireAuth] }, async ()=>({ok:true}));
  app.delete('/teams/:teamId/members/:userId', { preHandler:[app.requireAuth] }, async ()=>({ok:true}));
};
