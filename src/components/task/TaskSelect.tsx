import { useEffect, useMemo, useState } from 'react';
import { taskApi } from '../../services/taskApi';
import type { Task } from '../../types/task';

export default function TaskSelect({ teamId, value, onChange }: { teamId: string; value?: string; onChange: (taskId?: string) => void }) {
  const [tasks, setTasks] = useState<Task[]>([]); const [q, setQ] = useState('');
  useEffect(()=>{ if(teamId) taskApi.list({ teamId }).then(setTasks); },[teamId]);
  const filtered = useMemo(()=>tasks.filter(t=>t.title.toLowerCase().includes(q.toLowerCase())),[tasks,q]);
  return <div><input placeholder='Task 검색' value={q} onChange={e=>setQ(e.target.value)}/><select value={value ?? ''} onChange={e=>onChange(e.target.value||undefined)}><option value=''>Task 연결 안함</option>{filtered.map(t=><option key={t.taskId} value={t.taskId}>{t.title}</option>)}</select></div>;
}
