import { useEffect, useState } from 'react';
import { projectApi } from '../../services/projectApi';
import type { Project } from '../../types/project';

export default function ProjectSelect({ teamId, value, onChange }: { teamId: string; value?: string; onChange: (projectId?: string) => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(()=>{ if(teamId) projectApi.list(teamId).then(setProjects); },[teamId]);
  return <select value={value ?? ''} onChange={e=>onChange(e.target.value||undefined)}><option value=''>프로젝트 없음</option>{projects.map(p=><option key={p.projectId} value={p.projectId}>{p.code} · {p.name}</option>)}</select>;
}
