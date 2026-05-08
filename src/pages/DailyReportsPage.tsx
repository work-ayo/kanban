import { FormEvent, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import { today } from '../lib/date';
import { useTeamStore } from '../store/teamStore';

type Entry = { entryId: string; title: string; startTime: string; endTime?: string; minutes: number; content?: string; taskId?: string };
type Report = { dailyReportId: string; summary?: string; issue?: string; plan?: string; entries: Entry[] };

export default function DailyReportsPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [workDate, setWorkDate] = useState(today());
  const [report, setReport] = useState<Report | null>(null);
  const [entry, setEntry] = useState({ title: '', startTime: '', endTime: '', content: '', taskId: '' });

  const load = async () => {
    if (!teamId) return;
    try { setReport(await api.get('/daily-reports/me', { params: { teamId, workDate } }).then(r => r.data)); }
    catch { setReport(null); }
  };
  useEffect(() => { load(); }, [teamId, workDate]);

  const createReport = async () => {
    if (!teamId) return;
    const r = await api.post('/daily-reports', { teamId, userId: 'me', workDate }).then(x => x.data);
    setReport({ ...r, entries: [] });
  };

  const addEntry = async (e: FormEvent) => {
    e.preventDefault();
    if (!report) return;
    await api.post(`/daily-reports/${report.dailyReportId}/entries`, entry);
    setEntry({ title: '', startTime: '', endTime: '', content: '', taskId: '' });
    await load();
  };

  const total = useMemo(() => (report?.entries ?? []).reduce((a, c) => a + (c.minutes ?? 0), 0), [report]);

  return <section className='panel'><h2>Daily Reports (시간 기반)</h2><div className='inline'><input type='date' value={workDate} onChange={e=>setWorkDate(e.target.value)} /> {!report && <button onClick={createReport}>오늘 리포트 생성</button>}</div>{report && <><form className='inline' onSubmit={addEntry}><input placeholder='업무명' value={entry.title} onChange={e=>setEntry({...entry,title:e.target.value})}/><input type='datetime-local' value={entry.startTime} onChange={e=>setEntry({...entry,startTime:e.target.value})}/><input type='datetime-local' value={entry.endTime} onChange={e=>setEntry({...entry,endTime:e.target.value})}/><input placeholder='taskId(선택)' value={entry.taskId} onChange={e=>setEntry({...entry,taskId:e.target.value})}/><button>기록 추가</button></form><table><thead><tr><th>업무</th><th>시작</th><th>종료</th><th>분</th><th>Task</th></tr></thead><tbody>{report.entries.map(en=><tr key={en.entryId}><td>{en.title}</td><td>{en.startTime?.slice(0,16).replace('T',' ')}</td><td>{en.endTime?.slice(0,16).replace('T',' ') || '-'}</td><td>{en.minutes}</td><td>{en.taskId || '-'}</td></tr>)}</tbody></table><p>총 작업 시간: {total}분</p></>}</section>;
}
