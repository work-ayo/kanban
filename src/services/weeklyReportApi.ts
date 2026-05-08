import { api } from '../lib/api';
export const weeklyReportApi={
  getMyWeeklyReport:(teamId:string,weekStart:string)=>api.get('/weekly-reports/me',{params:{teamId,weekStart}}).then(r=>r.data),
  getWeeklyReports:(params:any)=>api.get('/weekly-reports',{params}).then(r=>r.data),
  createWeeklyReport:(payload:any)=>api.post('/weekly-reports',payload).then(r=>r.data),
  updateWeeklyReport:(id:string,payload:any)=>api.patch(`/weekly-reports/${id}`,payload).then(r=>r.data),
  deleteWeeklyReport:(id:string)=>api.delete(`/weekly-reports/${id}`),
  generateWeeklyReportFromDaily:(payload:any)=>api.post('/weekly-reports/generate-from-daily',payload).then(r=>r.data),
  list:(teamId:string,weekStart:string)=>api.get('/weekly-reports',{params:{teamId,weekStart}}).then(r=>r.data)
};
