import { useEffect, useMemo, useState } from 'react';
import { ganttApi } from '../services/ganttApi';
import { useTeamStore } from '../store/teamStore';
import ProjectSelect from '../components/task/ProjectSelect';
import Modal from '../components/common/Modal';
import { taskApi } from '../services/taskApi';
import type { Task } from '../types/task';

type DraftTask = {
  title: string;
  startDate: string;
  endDate: string;
  progress: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
};

export default function GanttPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [projectId, setProjectId] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<Task | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState('');
  const [savingTaskId, setSavingTaskId] = useState<string>('');
  const [newTask, setNewTask] = useState<DraftTask>({
    title: '',
    startDate: '',
    endDate: '',
    progress: 0,
    priority: 'MEDIUM'
  });

  const load = async () => {
    if (!teamId) return;
    const data = await ganttApi.getGantt({ teamId, projectId: projectId || undefined });
    setTasks(data);
  };

  useEffect(() => {
    load();
  }, [teamId, projectId]);

  const minDate = useMemo(() => {
    if (!tasks.length) return new Date();
    return new Date(Math.min(...tasks.map((t) => new Date(t.startDate || Date.now()).getTime()), Date.now()));
  }, [tasks]);



  const saveSchedule = async (task: Task) => {
    setSavingTaskId(task.taskId);
    await ganttApi.updateTaskSchedule(task.taskId, {
      startDate: task.startDate,
      endDate: task.endDate,
      progress: Math.min(100, Math.max(0, task.progress || 0))
    });
    setSavingTaskId('');
    await load();
  };

  const onCreateTask = async () => {
    if (!teamId || !newTask.title.trim()) {
      setError('팀과 제목은 필수입니다.');
      return;
    }
    if (newTask.startDate && newTask.endDate && newTask.startDate > newTask.endDate) {
      setError('종료일은 시작일보다 빠를 수 없습니다.');
      return;
    }

    await taskApi.createTask({
      teamId,
      projectId: projectId || undefined,
      title: newTask.title.trim(),
      startDate: newTask.startDate || undefined,
      endDate: newTask.endDate || undefined,
      progress: newTask.progress,
      status: 'TODO',
      priority: newTask.priority
    });

    setError('');
    setNewTask({ title: '', startDate: '', endDate: '', progress: 0, priority: 'MEDIUM' });
    setOpenCreate(false);
    load();
  };

  return (
    <section className='panel'>
      <div className='page-head'>
        <div>
          <h2>간트 차트</h2>
          <p className='muted'>작업 일정을 한 화면에서 보고, 진행률은 +10/-10 또는 슬라이더로 바로 업데이트할 수 있습니다.</p>
        </div>
        <button onClick={() => setOpenCreate(true)}>+ 작업 생성</button>
      </div>

      {teamId && <ProjectSelect teamId={teamId} value={projectId || undefined} onChange={(v) => setProjectId(v || '')} />}

      {!tasks.length ? (
        <p className='muted mt'>표시할 작업이 없습니다. 먼저 작업을 생성해 주세요.</p>
      ) : (
        <div className='gantt-grid mt'>
          <div>
            {tasks.map((t) => (
              <div key={t.taskId} className='g-row' onClick={() => setSelected(t)}>
                <strong>{t.title}</strong>
                <div className='muted'>{t.startDate?.slice(0, 10) || '-'} ~ {t.endDate?.slice(0, 10) || '-'}</div>
              </div>
            ))}
          </div>
          <div>
            {tasks.map((t) => {
              const s = new Date(t.startDate || Date.now()).getTime();
              const e = new Date(t.endDate || Date.now()).getTime();
              const left = ((s - minDate.getTime()) / 86400000) * 18;
              const w = Math.max(18, ((e - s) / 86400000 + 1) * 18);
              return (
                <div key={t.taskId} className='bar-wrap'>
                  <div className='bar' style={{ marginLeft: left, width: w }}>
                    {t.progress}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className='panel-sub'>
        <h3>빠른 진행률 업데이트</h3>
        <table>
          <thead><tr><th>작업</th><th>현재 진행률</th><th>조정</th><th>저장</th></tr></thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={`quick-${task.taskId}`}>
                <td>{task.title}</td>
                <td>{task.progress}%</td>
                <td>
                  <div className='inline'>
                    <button onClick={() => setTasks((prev) => prev.map((p) => p.taskId === task.taskId ? { ...p, progress: Math.max(0, (p.progress || 0) - 10) } : p))}>-10%</button>
                    <button onClick={() => setTasks((prev) => prev.map((p) => p.taskId === task.taskId ? { ...p, progress: Math.min(100, (p.progress || 0) + 10) } : p))}>+10%</button>
                  </div>
                </td>
                <td><button onClick={() => saveSchedule(task)} disabled={savingTaskId === task.taskId}>{savingTaskId === task.taskId ? '저장 중...' : '저장'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className='panel-sub'>
          <h3>{selected.title}</h3>
          <div className='inline'>
            <input type='date' value={(selected.startDate || '').slice(0, 10)} onChange={(e) => setSelected({ ...selected, startDate: e.target.value })} />
            <input type='date' value={(selected.endDate || '').slice(0, 10)} onChange={(e) => setSelected({ ...selected, endDate: e.target.value })} />
            <input type='number' min={0} max={100} value={selected.progress || 0} onChange={(e) => setSelected({ ...selected, progress: Number(e.target.value) })} />
            <input
              type='range'
              min={0}
              max={100}
              value={selected.progress || 0}
              onChange={(e) => setSelected({ ...selected, progress: Number(e.target.value) })}
            />
            <button onClick={() => setSelected({ ...selected, progress: Math.max(0, (selected.progress || 0) - 10) })}>-10%</button>
            <button onClick={() => setSelected({ ...selected, progress: Math.min(100, (selected.progress || 0) + 10) })}>+10%</button>
            <button onClick={() => saveSchedule(selected)} disabled={savingTaskId === selected.taskId}>
              {savingTaskId === selected.taskId ? '저장 중...' : '일정 저장'}
            </button>
          </div>
        </div>
      )}

      <Modal open={openCreate} title='작업 생성' onClose={() => setOpenCreate(false)}>
        <div className='form-grid'>
          <input placeholder='작업 제목' value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
          <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as DraftTask['priority'] })}>
            <option value='LOW'>LOW</option>
            <option value='MEDIUM'>MEDIUM</option>
            <option value='HIGH'>HIGH</option>
            <option value='URGENT'>URGENT</option>
          </select>
          <input type='date' value={newTask.startDate} onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })} />
          <input type='date' value={newTask.endDate} onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })} />
          <input type='number' min={0} max={100} placeholder='진행률(0-100)' value={newTask.progress} onChange={(e) => setNewTask({ ...newTask, progress: Number(e.target.value) || 0 })} />
          {error && <p className='auth-error'>{error}</p>}
          <button onClick={onCreateTask}>생성</button>
        </div>
      </Modal>
    </section>
  );
}
