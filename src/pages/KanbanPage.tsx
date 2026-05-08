import { useEffect, useState } from 'react';
import { kanbanApi } from '../services/kanbanApi';
import { useTeamStore } from '../store/teamStore';
import type { Board } from '../types/kanban';

export default function KanbanPage(){
  const teamId=useTeamStore(s=>s.currentTeamId); const [boards,setBoards]=useState<Board[]>([]);
  useEffect(()=>{ if(teamId) kanbanApi.boards(teamId).then(setBoards); },[teamId]);
  return <section><h2>Kanban</h2><ul>{boards.map(b=><li key={b.boardId}>{b.name}</li>)}</ul></section>;
}
