import type { Task } from './task';
export interface Project { projectId: string; teamId: string; code: string; name: string; description?: string|null; colorCode: string; startDate?: string|null; endDate?: string|null; progress?: number; taskCount?: number; doneTaskCount?: number; totalLoggedMinutes?: number; tasks?: Task[]; }
