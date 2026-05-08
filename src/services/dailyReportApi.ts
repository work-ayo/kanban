import { api } from '../lib/api'; import type { DailyReport } from '../types/report';
export const dailyReportApi={me:(teamId:string,workDate:string)=>api.get<DailyReport>('/daily-reports/me',{params:{teamId,workDate}}).then(r=>r.data)};
