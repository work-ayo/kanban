import { api } from '../lib/api'; import type { WeeklyReport } from '../types/report';
export const weeklyReportApi={list:(teamId:string,weekStart:string)=>api.get<WeeklyReport[]>('/weekly-reports',{params:{teamId,weekStart}}).then(r=>r.data)};
