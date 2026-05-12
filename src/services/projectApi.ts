import { api } from '../lib/api'; import type { Project } from '../types/project';
export const projectApi={list:(teamId:string)=>api.get<Project[]>('/projects',{params:{teamId}}).then(r=>r.data),get:(projectId:string)=>api.get<Project>(`/projects/${projectId}`).then(r=>r.data)};
