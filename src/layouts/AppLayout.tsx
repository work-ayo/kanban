import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTeamStore } from '../store/teamStore';

const menus=[['dashboard','Dashboard'],['teams','Teams'],['projects','Projects'],['tasks','Tasks'],['kanban','Kanban'],['gantt','Gantt'],['daily-reports','Daily Reports'],['weekly-reports','Weekly Reports'],['settings','Settings']];

export default function AppLayout(){
  const isAuthenticated = useAuthStore((s)=>s.isAuthenticated);
  const { teams, currentTeamId, setCurrentTeamId } = useTeamStore();
  if(!isAuthenticated) return <Navigate to='/login' replace />;
  return <div className='app-shell'><aside className='sidebar'>{menus.map(([k,v])=><Link key={k} to={`/app/${k}`}>{v}</Link>)}</aside><main className='content'><header className='topbar'><strong>Team Work Manager</strong><select value={currentTeamId} onChange={e=>setCurrentTeamId(e.target.value)}><option value=''>팀 선택</option>{teams.map(t=><option key={t.teamId} value={t.teamId}>{t.name}</option>)}</select></header><Outlet/></main></div>;
}
