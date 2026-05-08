import { useEffect, useMemo, useState } from 'react';
import { ganttApi } from '../services/ganttApi';
import { useTeamStore } from '../store/teamStore';
import ProjectSelect from '../components/task/ProjectSelect';
import Modal from '../components/common/Modal';
import { taskApi } from '../services/taskApi';

export default function GanttPage(){
  const teamId=useTeamStore(s=>s.currentTeamId);
  const [projectId,setProjectId]=useState<string>();
  const [tasks,setTasks]=useState<any[]>([]);
  const [selected,setSelected]=useState<any>(null);
  const [openCreate,setOpenCreate]=useState(false);
  const [newTask,setNewTask]=useState<any>({title:'',startDate:'',endDate:'',progress:0});
  const load=()=>{ if(teamId) ganttApi.getGantt({teamId,projectId}).then(setTasks); };
  useEffect(load,[teamId,projectId]);
  const minDate = useMemo(()=>new Date(Math.min(...tasks.map(t=>new Date(t.startDate||Date.now()).getTime()),Date.now())),[tasks]);
  return <section className='panel'><h2>Gantt</h2><button onClick={()=>setOpenCreate(true)}>+ Task 생성</button>{teamId && <ProjectSelect teamId={teamId} value={projectId} onChange={setProjectId}/>}<div className='gantt-grid'><div>{tasks.map(t=><div key={t.taskId} className='g-row' onClick={()=>setSelected(t)}>{t.title} · {t.progress}%</div>)}</div><div>{tasks.map(t=>{const s=new Date(t.startDate||Date.now()).getTime();const e=new Date(t.endDate||Date.now()).getTime();const left=((s-minDate.getTime())/86400000)*18;const w=Math.max(18,((e-s)/86400000+1)*18);return <div key={t.taskId} className='bar-wrap'><div className='bar' style={{marginLeft:left,width:w}}>{t.progress}%</div></div>;})}</div></div>{selected && <div className='panel-sub'><h3>{selected.title}</h3><div className='inline'><input type='date' value={(selected.startDate||'').slice(0,10)} onChange={e=>setSelected({...selected,startDate:e.target.value})}/><input type='date' value={(selected.endDate||'').slice(0,10)} onChange={e=>setSelected({...selected,endDate:e.target.value})}/><input type='number' value={selected.progress||0} onChange={e=>setSelected({...selected,progress:Number(e.target.value)})}/><button onClick={async()=>{await ganttApi.updateTaskSchedule(selected.taskId,{startDate:selected.startDate,endDate:selected.endDate,progress:selected.progress});load();}}>일정 저장</button></div></div>}<Modal open={openCreate} title='Task 생성' onClose={()=>setOpenCreate(false)}><div className='inline'><input placeholder='제목' value={newTask.title} onChange={e=>setNewTask({...newTask,title:e.target.value})}/><input type='date' value={newTask.startDate} onChange={e=>setNewTask({...newTask,startDate:e.target.value})}/><input type='date' value={newTask.endDate} onChange={e=>setNewTask({...newTask,endDate:e.target.value})}/><button onClick={async()=>{if(!teamId)return; await taskApi.createTask({teamId,title:newTask.title,startDate:newTask.startDate,endDate:newTask.endDate,progress:newTask.progress,status:'TODO',priority:'MEDIUM'} as any); setOpenCreate(false); load();}}>생성</button></div></Modal></section>
}
