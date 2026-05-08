import type { Task } from './task';
export interface Board { boardId: string; teamId: string; name: string; columns?: Column[]; }
export interface Column { columnId: string; boardId: string; name: string; order: number; cards?: Card[]; }
export interface Card { cardId: string; boardId: string; columnId: string; taskId?: string|null; title: string; content?: string|null; order: number; dueDate?: string|null; createdByUserId?: string; updatedAt?: string; task?: Task; }
