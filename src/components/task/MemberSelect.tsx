import { useEffect, useState } from 'react';
import { teamApi } from '../../services/teamApi';
import type { TeamMember } from '../../types/team';

export default function MemberSelect({ teamId, value, onChange }: { teamId: string; value?: string; onChange: (userId: string) => void }) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  useEffect(()=>{ if(teamId) teamApi.members(teamId).then(setMembers); },[teamId]);
  return <select value={value ?? ''} onChange={e=>onChange(e.target.value)}>{members.map(m=><option key={m.userId} value={m.userId}>{m.user?.name ?? m.userId}</option>)}</select>;
}
