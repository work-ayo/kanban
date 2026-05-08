import { useEffect, useMemo, useState } from 'react';
import { dashboardApi } from '../services/dashboardApi';
import { useTeamStore } from '../store/teamStore';
import type { DashboardSummary } from '../types/dashboard';

const emptyDashboard: DashboardSummary = {
  totalProjects: 0,
  inProgressTasks: 0,
  doneTasks: 0,
  delayedTasks: 0,
  todayDailyReports: 0,
  weeklyReportProgress: { submitted: 0, total: 0 },
  projectProgress: [],
  weeklyUserMinutes: [],
  recentEntries: [],
  upcomingTasks: [],
};

export default function DashboardPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [data, setData] = useState<DashboardSummary>(emptyDashboard);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!teamId) return;
    setLoading(true);
    dashboardApi.team(teamId)
      .then((res) => setData({ ...emptyDashboard, ...res, weeklyReportProgress: res.weeklyReportProgress ?? { submitted: 0, total: 0 } }))
      .catch(() => setData(emptyDashboard))
      .finally(() => setLoading(false));
  }, [teamId]);

  const rate = useMemo(() => {
    const t = data.weeklyReportProgress?.total ?? 0;
    const s = data.weeklyReportProgress?.submitted ?? 0;
    return t === 0 ? 0 : Math.round((s / t) * 100);
  }, [data]);

  if (!teamId) return <section className='panel'><h2>Dashboard</h2><p>팀을 먼저 선택하세요.</p></section>;

  return (
    <section className='panel'>
      <h2>Dashboard</h2>
      {loading ? <p>데이터 불러오는 중...</p> : (
        <>
          <div className='grid'>
            <div className='stat'><b>프로젝트</b><span>{data.totalProjects}</span></div>
            <div className='stat'><b>진행중 태스크</b><span>{data.inProgressTasks}</span></div>
            <div className='stat'><b>완료 태스크</b><span>{data.doneTasks}</span></div>
            <div className='stat'><b>지연 태스크</b><span>{data.delayedTasks}</span></div>
            <div className='stat'><b>오늘 리포트</b><span>{data.todayDailyReports}</span></div>
            <div className='stat'><b>주간 작성률</b><span>{rate}% ({data.weeklyReportProgress.submitted}/{data.weeklyReportProgress.total})</span></div>
          </div>
          <div className='panel-sub'><h3>최근 작업 기록</h3><ul>{data.recentEntries.map(e=><li key={e.entryId}>{e.title} · {e.minutes}분</li>)}</ul></div>
        </>
      )}
    </section>
  );
}
