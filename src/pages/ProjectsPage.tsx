import { FormEvent, useEffect, useState } from 'react';
import { projectApi } from '../services/projectApi';
import { useTeamStore } from '../store/teamStore';
import type { Project } from '../types/project';
import { api } from '../lib/api';

export default function ProjectsPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [items, setItems] = useState<Project[]>([]);
  const [form, setForm] = useState({ code: '', name: '', description: '', colorCode: '#2563eb' });

  const load = () => { if (teamId) projectApi.list(teamId).then(setItems); };
  useEffect(load, [teamId]);

  const createProject = async (e: FormEvent) => {
    e.preventDefault();
    if (!teamId) return;
    await api.post('/projects', { ...form, teamId });
    setForm({ code: '', name: '', description: '', colorCode: '#2563eb' });
    load();
  };

  return <section className='panel'><h2>Projects</h2>{!teamId ? <p>팀 선택 필요</p> : <><form className='inline' onSubmit={createProject}><input placeholder='코드' value={form.code} onChange={e=>setForm({...form,code:e.target.value})}/><input placeholder='이름' value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input placeholder='설명' value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/><input type='color' value={form.colorCode} onChange={e=>setForm({...form,colorCode:e.target.value})}/><button>생성</button></form><table><thead><tr><th>코드</th><th>이름</th><th>기간</th></tr></thead><tbody>{items.map(p=><tr key={p.projectId}><td>{p.code}</td><td>{p.name}</td><td>{p.startDate?.slice(0,10)} ~ {p.endDate?.slice(0,10)}</td></tr>)}</tbody></table></>}</section>;
}
