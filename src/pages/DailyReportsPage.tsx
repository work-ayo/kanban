import { useEffect, useState } from 'react';
import { dailyReportApi } from '../services/dailyReportApi';
import { useTeamStore } from '../store/teamStore';
import { today } from '../lib/date';

export default function DailyReportsPage(){
  const teamId=useTeamStore(s=>s.currentTeamId); const [workDate,setWorkDate]=useState(today()); const [report,setReport]=useState<any>(null);
  useEffect(()=>{ if(teamId) dailyReportApi.me(teamId,workDate).then(setReport).catch(()=>setReport(null)); },[teamId,workDate]);
  return <section><h2>Daily Reports</h2><input type='date' value={workDate} onChange={e=>setWorkDate(e.target.value)}/>{report? <pre>{JSON.stringify(report,null,2)}</pre>:<p>리포트 없음</p>}</section>;
}
