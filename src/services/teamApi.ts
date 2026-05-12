import { api } from '../lib/api'; import type { Team, TeamMember } from '../types/team';
export const teamApi={list:()=>api.get<Team[]>('/teams').then(r=>r.data),create:(p:{name:string})=>api.post<Team>('/teams',p).then(r=>r.data),members:(teamId:string)=>api.get<TeamMember[]>(`/teams/${teamId}/members`).then(r=>r.data)};
