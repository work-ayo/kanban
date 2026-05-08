import { api } from '../lib/api'; import type { DashboardSummary } from '../types/dashboard';
export const dashboardApi={team:(teamId:string)=>api.get<DashboardSummary>('/dashboard/team',{params:{teamId}}).then(r=>r.data),me:(teamId:string)=>api.get<DashboardSummary>('/dashboard/me',{params:{teamId}}).then(r=>r.data)};
