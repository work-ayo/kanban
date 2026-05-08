import { useEffect, useState } from 'react';
import { weeklyReportApi } from '../services/weeklyReportApi';
import { useTeamStore } from '../store/teamStore';

export default function WeeklyReportsPage(){
  const teamId=useTeamStore(s=>s.currentTeamId); const [weekStart,setWeekStart]=useState(new Date().toISOString().slice(0,10)); const [items,setItems]=useState<any[]>([]);
  useEffect(()=>{ if(teamId) weeklyReportApi.list(teamId,weekStart).then(setItems); },[teamId,weekStart]);
  return <section><h2>Weekly Reports</h2><input type='date' value={weekStart} onChange={e=>setWeekStart(e.target.value)}/><ul>{items.map(w=><li key={w.weeklyReportId}>{w.thisWeek}</li>)}</ul></section>;
}
