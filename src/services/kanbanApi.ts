import { api } from '../lib/api'; import type { Board, Card } from '../types/kanban';
export const kanbanApi={boards:(teamId:string)=>api.get<Board[]>('/boards',{params:{teamId}}).then(r=>r.data),board:(boardId:string)=>api.get<Board>(`/boards/${boardId}`).then(r=>r.data),moveCard:(cardId:string,p:{columnId:string;order:number})=>api.patch<Card>(`/cards/${cardId}/move`,p).then(r=>r.data)};
