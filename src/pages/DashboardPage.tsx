import { useEffect, useState } from 'react';
import { dashboardApi } from '../services/dashboardApi';
import { useTeamStore } from '../store/teamStore';
import type { DashboardSummary } from '../types/dashboard';

export default function DashboardPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [data, setData] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    if (!teamId) return;
    dashboardApi.team(teamId).then(setData).catch(() => setData(null));
  }, [teamId]);

  if (!teamId) return <section><h2>Dashboard</h2><p>팀을 먼저 선택하세요.</p></section>;

  return (
    <section>
      <h2>Dashboard</h2>
      {!data ? <p>데이터 불러오는 중...</p> : (
        <div className='grid'>
          <div className='stat'>프로젝트: {data.totalProjects}</div>
          <div className='stat'>진행중 태스크: {data.inProgressTasks}</div>
          <div className='stat'>완료 태스크: {data.doneTasks}</div>
          <div className='stat'>지연 태스크: {data.delayedTasks}</div>
          <div className='stat'>오늘 데일리 리포트: {data.todayDailyReports}</div>
          <div className='stat'>위클리 작성: {data.weeklyReportProgress.submitted}/{data.weeklyReportProgress.total}</div>
        </div>
      )}
    </section>
  );
}
