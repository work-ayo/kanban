import { useEffect, useState } from 'react';
import { taskApi } from '../services/taskApi';
import { useTeamStore } from '../store/teamStore';
import type { Task, TaskStatus } from '../types/task';

export default function TasksPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [items, setItems] = useState<Task[]>([]);

  useEffect(() => {
    if (!teamId) return;
    const params: Record<string, string> = { teamId };
    if (status) params.status = status;
    taskApi.list(params).then(setItems);
  }, [teamId, status]);

  return <section><h2>Tasks</h2><select value={status} onChange={e=>setStatus(e.target.value as TaskStatus | '')}><option value=''>전체상태</option><option value='TODO'>TODO</option><option value='IN_PROGRESS'>IN_PROGRESS</option><option value='DONE'>DONE</option><option value='HOLD'>HOLD</option></select><ul>{items.map(t=><li key={t.taskId}>[{t.status}] {t.title} ({t.progress}%)</li>)}</ul></section>;
}
