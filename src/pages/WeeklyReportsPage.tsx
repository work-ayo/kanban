import { FormEvent, useEffect, useState } from 'react';
import { weeklyReportApi } from '../services/weeklyReportApi';
import { useTeamStore } from '../store/teamStore';

export default function WeeklyReportsPage(){
  const teamId=useTeamStore(s=>s.currentTeamId); const [weekStart,setWeekStart]=useState(new Date().toISOString().slice(0,10)); const [items,setItems]=useState<any[]>([]); const [form,setForm]=useState({thisWeek:'',nextWeek:'',issue:'',solution:''});
  const load=()=>{ if(teamId) weeklyReportApi.getWeeklyReports({teamId,weekStart}).then(setItems);};
  useEffect(load,[teamId,weekStart]);
  const save=async(e:FormEvent)=>{e.preventDefault(); if(!teamId)return; await weeklyReportApi.createWeeklyReport({teamId,userId:'me',weekStart,...form}); setForm({thisWeek:'',nextWeek:'',issue:'',solution:''}); load();};
  return <section className='panel'><h2>Weekly Report</h2><div className='inline'><input type='date' value={weekStart} onChange={e=>setWeekStart(e.target.value)}/><button onClick={async()=>{if(!teamId)return; const d=await weeklyReportApi.generateWeeklyReportFromDaily({teamId,userId:'me',weekStart,preview:true}); setForm({thisWeek:d.thisWeek||'',nextWeek:d.nextWeek||'',issue:d.issue||'',solution:d.solution||''});}}>Daily 기반 초안 생성</button></div><form className='inline' onSubmit={save}><input placeholder='이번 주' value={form.thisWeek} onChange={e=>setForm({...form,thisWeek:e.target.value})}/><input placeholder='다음 주' value={form.nextWeek} onChange={e=>setForm({...form,nextWeek:e.target.value})}/><button>저장</button></form><table><thead><tr><th>주차</th><th>이번주</th><th>다음주</th></tr></thead><tbody>{items.map(w=><tr key={w.weeklyReportId}><td>{w.weekStart?.slice(0,10)}</td><td>{w.thisWeek}</td><td>{w.nextWeek}</td></tr>)}</tbody></table></section>
}
