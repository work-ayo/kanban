import { FormEvent, useEffect, useState } from 'react';
import { taskApi } from '../services/taskApi';
import { useTeamStore } from '../store/teamStore';
import type { Task, TaskStatus } from '../types/task';

export default function TasksPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [items, setItems] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    if (!teamId) return;
    const params: Record<string, string> = { teamId };
    if (status) params.status = status;
    const data = await taskApi.list(params);
    setItems(data);
  };

  useEffect(() => {
    load();
  }, [teamId, status]);

  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!teamId || !title.trim()) return;
    await taskApi.createTask({ teamId, title: title.trim(), status: 'TODO', priority: 'MEDIUM', progress: 0 });
    setTitle('');
    load();
  };

  return (
    <section className='panel'>
      <div className='page-head'>
        <div>
          <h2>작업 관리</h2>
          <p className='muted'>팀의 전체 작업을 상태별로 빠르게 확인하고, 신규 작업을 바로 등록할 수 있습니다.</p>
        </div>
      </div>

      <form onSubmit={createTask} className='inline'>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='새 작업 제목을 입력하세요' />
        <button>작업 추가</button>
      </form>

      <div className='inline'>
        <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus | '')}>
          <option value=''>전체 상태</option>
          <option value='TODO'>TODO</option>
          <option value='IN_PROGRESS'>IN_PROGRESS</option>
          <option value='DONE'>DONE</option>
          <option value='HOLD'>HOLD</option>
        </select>
        <span className='muted'>총 {items.length}건</span>
      </div>

      {!items.length ? (
        <p className='muted'>등록된 작업이 없습니다.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>상태</th>
              <th>우선순위</th>
              <th>진행률</th>
              <th>기간</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.taskId}>
                <td>{t.title}</td>
                <td>{t.status}</td>
                <td>{t.priority}</td>
                <td>{t.progress}%</td>
                <td>{t.startDate?.slice(0, 10) || '-'} ~ {t.endDate?.slice(0, 10) || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
