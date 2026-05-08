import { FormEvent, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useTeamStore } from '../store/teamStore';

type Weekly = { weeklyReportId: string; weekStart: string; thisWeek: string; nextWeek: string; issue?: string; solution?: string };

export default function WeeklyReportsPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [weekStart, setWeekStart] = useState(new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState<Weekly[]>([]);
  const [form, setForm] = useState({ thisWeek: '', nextWeek: '', issue: '', solution: '' });

  const load = async () => { if (teamId) setItems(await api.get('/weekly-reports', { params: { teamId, weekStart } }).then(r => r.data)); };
  useEffect(() => { load(); }, [teamId, weekStart]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!teamId) return;
    await api.post('/weekly-reports', { teamId, userId: 'me', weekStart, ...form });
    setForm({ thisWeek: '', nextWeek: '', issue: '', solution: '' });
    load();
  };

  return <section className='panel'><h2>Weekly Reports</h2><form className='inline' onSubmit={save}><input type='date' value={weekStart} onChange={e=>setWeekStart(e.target.value)}/><input placeholder='이번주' value={form.thisWeek} onChange={e=>setForm({...form,thisWeek:e.target.value})}/><input placeholder='다음주' value={form.nextWeek} onChange={e=>setForm({...form,nextWeek:e.target.value})}/><button>저장</button></form><table><thead><tr><th>주차</th><th>이번주</th><th>다음주</th></tr></thead><tbody>{items.map(w=><tr key={w.weeklyReportId}><td>{w.weekStart?.slice(0,10)}</td><td>{w.thisWeek}</td><td>{w.nextWeek}</td></tr>)}</tbody></table></section>;
}
