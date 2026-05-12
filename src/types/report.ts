import type { Task } from './task';
export interface DailyReportEntry { entryId: string; dailyReportId: string; taskId?: string|null; startTime: string; endTime?: string|null; title: string; content?: string|null; minutes: number; task?: Task; }
export interface DailyReport { dailyReportId: string; teamId: string; userId: string; workDate: string; summary?: string|null; issue?: string|null; plan?: string|null; entries?: DailyReportEntry[]; totalMinutes?: number; }
export interface WeeklyReport { weeklyReportId: string; teamId: string; userId: string; weekStart: string; thisWeek: string; nextWeek: string; issue?: string|null; solution?: string|null; }
