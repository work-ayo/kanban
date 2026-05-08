export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'HOLD';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export interface Task { taskId: string; teamId: string; projectId?: string|null; parentTaskId?: string|null; title: string; description?: string|null; startDate?: string|null; endDate?: string|null; progress: number; status: TaskStatus; priority: TaskPriority; estimatedMinutes: number; assignedUserId?: string|null; totalLoggedMinutes?: number; }
