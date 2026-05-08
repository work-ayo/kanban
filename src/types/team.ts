export type TeamRole = 'LEADER' | 'MEMBER';
export interface Team { teamId: string; name: string; joinCode: string; }
export interface TeamMember { teamMemberId: string; teamId: string; userId: string; role: TeamRole; user?: { name: string }; }
