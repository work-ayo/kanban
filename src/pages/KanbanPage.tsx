import { useEffect, useMemo, useState } from 'react';
import { kanbanApi } from '../services/kanbanApi';
import { useTeamStore } from '../store/teamStore';
import { api } from '../lib/api';
import type { Board, Card, Column } from '../types/kanban';

const defaultCols = ['TODO', 'IN_PROGRESS', 'DONE', 'HOLD', 'COMPLETED'];

export default function KanbanPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [board, setBoard] = useState<Board | null>(null);
  const [dragCol, setDragCol] = useState<string | null>(null);
  const [dragCard, setDragCard] = useState<Card | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!teamId) return;
      const boards = await kanbanApi.boards(teamId);
      if (boards.length === 0) {
        const created = await api.post('/boards', { teamId, name: 'Default Board', createdByUserId: 'me' }).then(r => r.data as Board);
        for (let i = 0; i < defaultCols.length; i++) await api.post(`/boards/${created.boardId}/columns`, { name: defaultCols[i], order: i + 1 });
      }
      const nextBoards = await kanbanApi.boards(teamId);
      const full = await kanbanApi.board(nextBoards[0].boardId);
      setBoard(full);
    };
    run();
  }, [teamId]);

  const columns = useMemo(() => (board?.columns ?? []).slice().sort((a, b) => a.order - b.order), [board]);

  const onCardDrop = async (columnId: string) => {
    if (!dragCard || !board) return;
    await kanbanApi.moveCard(dragCard.cardId, { columnId, order: 999 });
    const full = await kanbanApi.board(board.boardId);
    setBoard(full);
  };

  const onColumnDrop = async (target: Column) => {
    if (!dragCol || !board || dragCol === target.columnId) return;
    const source = columns.find(c => c.columnId === dragCol);
    if (!source) return;
    await api.patch(`/columns/${source.columnId}`, { order: target.order });
    await api.patch(`/columns/${target.columnId}`, { order: source.order });
    const full = await kanbanApi.board(board.boardId);
    setBoard(full);
  };

  const addCard = async (columnId: string) => {
    if (!board) return;
    const title = prompt('카드 제목');
    const assignedUserId = prompt('담당자 userId');
    if (!title) return;
    await api.post('/cards', { boardId: board.boardId, columnId, title, order: Date.now(), createdByUserId: assignedUserId || 'me', content: '' });
    const full = await kanbanApi.board(board.boardId);
    setBoard(full);
  };

  return <section className='panel'><h2>Kanban (Trello 스타일)</h2><div className='kanban-wrap'>{columns.map(col => <div key={col.columnId} className='k-col' draggable onDragStart={() => setDragCol(col.columnId)} onDragOver={(e)=>e.preventDefault()} onDrop={() => onColumnDrop(col)}><div className='k-head'><b>{col.name}</b><button onClick={()=>addCard(col.columnId)}>+ Card</button></div><div className='k-cards' onDragOver={(e)=>e.preventDefault()} onDrop={()=>onCardDrop(col.columnId)}>{(col.cards ?? []).map(card => <article key={card.cardId} className='k-card' draggable onDragStart={() => setDragCard(card)}><h4>{card.title}</h4><p>{card.content || '내용 없음'}</p><small>담당/작성자: {card.createdByUserId}</small><small>마감: {card.dueDate?.slice(0,10) ?? '-'}</small><small>업데이트: {card.updatedAt?.slice(0,16).replace('T',' ') ?? '-'}</small></article>)}</div></div>)}</div></section>;
}
