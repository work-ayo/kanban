import { api } from '../lib/api'; import type { Board, Card, Column } from '../types/kanban';
export const kanbanApi={
  getBoards:(teamId:string)=>api.get<Board[]>('/boards',{params:{teamId}}).then(r=>r.data),
  getBoard:(boardId:string)=>api.get<Board>(`/boards/${boardId}`).then(r=>r.data),
  createBoard:(p:any)=>api.post<Board>('/boards',p).then(r=>r.data),
  createColumn:(boardId:string,p:any)=>api.post<Column>(`/boards/${boardId}/columns`,p).then(r=>r.data),
  createCard:(p:any)=>api.post<Card>('/cards',p).then(r=>r.data),
  updateCard:(cardId:string,p:any)=>api.patch<Card>(`/cards/${cardId}`,p).then(r=>r.data),
  deleteCard:(cardId:string)=>api.delete(`/cards/${cardId}`),
  moveCard:(cardId:string,p:{columnId:string;order:number})=>api.patch<Card>(`/cards/${cardId}/move`,p).then(r=>r.data),
  boards:(teamId:string)=>api.get<Board[]>('/boards',{params:{teamId}}).then(r=>r.data),board:(boardId:string)=>api.get<Board>(`/boards/${boardId}`).then(r=>r.data)
};
