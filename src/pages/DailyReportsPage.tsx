import { FormEvent, useEffect, useMemo, useState } from 'react';
import { dailyReportApi } from '../services/dailyReportApi';
import { useTeamStore } from '../store/teamStore';
import { today } from '../lib/date';
import TaskSelect from '../components/task/TaskSelect';

export default function DailyReportsPage(){
  const teamId=useTeamStore(s=>s.currentTeamId); const [workDate,setWorkDate]=useState(today()); const [report,setReport]=useState<any>(null);
  const [entry,setEntry]=useState<any>({title:'',startTime:'',endTime:'',content:'',taskId:''});
  const load=()=>{ if(teamId) dailyReportApi.getMyDailyReport(teamId,workDate).then(setReport).catch(()=>setReport(null));};
  useEffect(load,[teamId,workDate]);
  const total=useMemo(()=> (report?.entries||[]).reduce((a:number,c:any)=>a+(c.minutes||0),0),[report]);
  const add=async(e:FormEvent)=>{e.preventDefault(); if(!report)return; await dailyReportApi.createDailyReportEntry(report.dailyReportId,entry); setEntry({title:'',startTime:'',endTime:'',content:'',taskId:''}); load();};
  return <section className='panel'><h2>Daily Report</h2><div className='inline'><input type='date' value={workDate} onChange={e=>setWorkDate(e.target.value)}/><button onClick={()=>setWorkDate(today())}>오늘</button>{!report && <button onClick={async()=>{if(!teamId)return; await dailyReportApi.createDailyReport({teamId,userId:'me',workDate}); load();}}>리포트 생성</button>}</div>{report && <><form className='inline' onSubmit={add}><input placeholder='제목' value={entry.title} onChange={e=>setEntry({...entry,title:e.target.value})}/><input type='datetime-local' value={entry.startTime} onChange={e=>setEntry({...entry,startTime:e.target.value})}/><input type='datetime-local' value={entry.endTime} onChange={e=>setEntry({...entry,endTime:e.target.value})}/>{teamId && <TaskSelect teamId={teamId} value={entry.taskId} onChange={(v)=>setEntry({...entry,taskId:v||''})}/>}<button>+ 작업 기록 추가</button></form><table><thead><tr><th>시간</th><th>Task</th><th>제목</th><th>소요</th><th>작업</th></tr></thead><tbody>{(report.entries||[]).map((en:any)=><tr key={en.entryId}><td>{en.startTime?.slice(11,16)}-{en.endTime?.slice(11,16)||'-'}</td><td>{en.task?.title||'-'}</td><td>{en.title}</td><td>{en.minutes}분</td><td><button onClick={async()=>{await dailyReportApi.deleteDailyReportEntry(en.entryId);load();}}>삭제</button></td></tr>)}</tbody></table><p>총 작업 시간: {total}분</p></>}</section>
}
