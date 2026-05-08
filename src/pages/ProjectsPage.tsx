import { useEffect, useState } from 'react';
import { projectApi } from '../services/projectApi';
import { useTeamStore } from '../store/teamStore';
import type { Project } from '../types/project';

export default function ProjectsPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [items, setItems] = useState<Project[]>([]);

  useEffect(() => { if (teamId) projectApi.list(teamId).then(setItems); }, [teamId]);

  return <section><h2>Projects</h2>{!teamId ? <p>팀 선택 필요</p> : <table><thead><tr><th>코드</th><th>이름</th><th>기간</th></tr></thead><tbody>{items.map(p=><tr key={p.projectId}><td>{p.code}</td><td>{p.name}</td><td>{p.startDate?.slice(0,10)} ~ {p.endDate?.slice(0,10)}</td></tr>)}</tbody></table>}</section>;
}
