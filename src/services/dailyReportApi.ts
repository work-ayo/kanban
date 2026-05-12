import { api } from '../lib/api';
export const dailyReportApi={
  getMyDailyReport:(teamId:string,workDate:string)=>api.get('/daily-reports/me',{params:{teamId,workDate}}).then(r=>r.data),
  getDailyReports:(params:any)=>api.get('/daily-reports',{params}).then(r=>r.data),
  createDailyReport:(payload:any)=>api.post('/daily-reports',payload).then(r=>r.data),
  updateDailyReport:(id:string,payload:any)=>api.patch(`/daily-reports/${id}`,payload).then(r=>r.data),
  deleteDailyReport:(id:string)=>api.delete(`/daily-reports/${id}`),
  createDailyReportEntry:(id:string,payload:any)=>api.post(`/daily-reports/${id}/entries`,payload).then(r=>r.data),
  updateDailyReportEntry:(id:string,payload:any)=>api.patch(`/daily-report-entries/${id}`,payload).then(r=>r.data),
  deleteDailyReportEntry:(id:string)=>api.delete(`/daily-report-entries/${id}`),
  me:(teamId:string,workDate:string)=>api.get('/daily-reports/me',{params:{teamId,workDate}}).then(r=>r.data)
};
