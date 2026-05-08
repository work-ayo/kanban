import { GlobalRole, TeamRole } from '@prisma/client';
export const requireAdmin=(role:GlobalRole)=>role==='ADMIN';
export const canAccessTeam=(isMember:boolean, role:GlobalRole)=>role==='ADMIN'||isMember;
export const requireTeamLeaderOrAdmin=(teamRole:TeamRole|undefined, role:GlobalRole)=>role==='ADMIN'||teamRole==='LEADER';
export const canEditDailyReport=(ownerId:string, userId:string, role:GlobalRole)=>role==='ADMIN'||ownerId===userId;
export const canEditTask=(ctx:{createdByUserId?:string|null;assignedUserId?:string|null}, userId:string, role:GlobalRole)=>role==='ADMIN'||ctx.createdByUserId===userId||ctx.assignedUserId===userId;
