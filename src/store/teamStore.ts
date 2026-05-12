import { create } from 'zustand'; import type { Team } from '../types/team';
interface TeamState { teams: Team[]; currentTeamId: string; setTeams: (t: Team[]) => void; setCurrentTeamId: (id: string) => void; }
export const useTeamStore=create<TeamState>((set)=>({teams:[],currentTeamId:'',setTeams:(teams)=>set({teams,currentTeamId:teams[0]?.teamId ?? ''}),setCurrentTeamId:(currentTeamId)=>set({currentTeamId})}));
