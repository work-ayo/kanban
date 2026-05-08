import { FormEvent, useEffect, useState } from 'react';
import { taskApi } from '../services/taskApi';
import { useTeamStore } from '../store/teamStore';
import type { Task, TaskStatus } from '../types/task';
import { api } from '../lib/api';

export default function TasksPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [items, setItems] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  const load = () => {
    if (!teamId) return;
    const params: Record<string, string> = { teamId };
    if (status) params.status = status;
    taskApi.list(params).then(setItems);
  };
  useEffect(load, [teamId, status]);

  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!teamId || !title) return;
    await api.post('/tasks', { teamId, title, status: 'TODO', priority: 'MEDIUM' });
    setTitle('');
    load();
  };

  return <section className='panel'><h2>Tasks</h2><form onSubmit={createTask} className='inline'><input value={title} onChange={e=>setTitle(e.target.value)} placeholder='새 태스크 제목'/><button>추가</button></form><select value={status} onChange={e=>setStatus(e.target.value as TaskStatus | '')}><option value=''>전체상태</option><option value='TODO'>TODO</option><option value='IN_PROGRESS'>IN_PROGRESS</option><option value='DONE'>DONE</option><option value='HOLD'>HOLD</option></select><ul>{items.map(t=><li key={t.taskId}>[{t.status}] {t.title} ({t.progress}%)</li>)}</ul></section>;
}
