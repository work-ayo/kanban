import { FormEvent, useEffect, useState } from 'react';
import { teamApi } from '../services/teamApi';
import { useTeamStore } from '../store/teamStore';

export default function TeamsPage() {
  const { teams, setTeams, currentTeamId, setCurrentTeamId } = useTeamStore();
  const [name, setName] = useState('');

  const load = async () => setTeams(await teamApi.list());
  useEffect(() => { load(); }, []);

  const createTeam = async (e: FormEvent) => {
    e.preventDefault();
    if (!name) return;
    await teamApi.create({ name });
    setName('');
    await load();
  };

  return <section><h2>Teams</h2><form onSubmit={createTeam} className='inline'><input value={name} onChange={e=>setName(e.target.value)} placeholder='새 팀 이름'/><button>팀 생성</button></form><ul>{teams.map(t=><li key={t.teamId}><label><input type='radio' checked={currentTeamId===t.teamId} onChange={()=>setCurrentTeamId(t.teamId)}/>{t.name}</label></li>)}</ul></section>;
}
