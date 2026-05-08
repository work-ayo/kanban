import { useEffect, useState } from 'react';
import { ganttApi } from '../services/ganttApi';
import { useTeamStore } from '../store/teamStore';
import type { GanttTask } from '../types/gantt';

export default function GanttPage(){
  const teamId=useTeamStore(s=>s.currentTeamId); const [tasks,setTasks]=useState<GanttTask[]>([]);
  useEffect(()=>{ if(teamId) ganttApi.list(teamId).then(setTasks); },[teamId]);
  return <section><h2>Gantt</h2><table><thead><tr><th>Task</th><th>기간</th><th>진행률</th></tr></thead><tbody>{tasks.map(t=><tr key={t.taskId}><td>{t.title}</td><td>{t.startDate?.slice(0,10)} ~ {t.endDate?.slice(0,10)}</td><td>{t.progress}%</td></tr>)}</tbody></table></section>;
}
