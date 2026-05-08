import { Link, Outlet } from 'react-router-dom';
const menus=[['dashboard','Dashboard'],['projects','Projects'],['tasks','Tasks'],['kanban','Kanban'],['gantt','Gantt'],['daily-reports','Daily Reports'],['weekly-reports','Weekly Reports'],['settings','Settings']];
export default function AppLayout(){return <div className='app-shell'><aside className='sidebar'>{menus.map(([k,v])=><Link key={k} to={`/app/${k}`}>{v}</Link>)}</aside><main className='content'><header className='topbar'>Team Work Manager</header><Outlet/></main></div>;}
