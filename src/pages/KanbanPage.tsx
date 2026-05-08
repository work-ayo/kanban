import { useEffect, useMemo, useState } from 'react';
import { kanbanApi } from '../services/kanbanApi';
import { useTeamStore } from '../store/teamStore';
import { api } from '../lib/api';
import type { Board, Card, Column } from '../types/kanban';
import Modal from '../components/common/Modal';
import MemberSelect from '../components/task/MemberSelect';
import TaskSelect from '../components/task/TaskSelect';

const defaultCols = ['TODO', 'IN_PROGRESS', 'DONE', 'HOLD', 'COMPLETED'];

export default function KanbanPage() {
  const teamId = useTeamStore((s) => s.currentTeamId);
  const [board, setBoard] = useState<Board | null>(null);
  const [dragCol, setDragCol] = useState<string | null>(null);
  const [dragCard, setDragCard] = useState<Card | null>(null);
  const [open, setOpen] = useState(false);
  const [targetCol, setTargetCol] = useState('');
  const [form, setForm] = useState({ title: '', content: '', dueDate: '', assignedUserId: '', taskId: '' });

  const reload = async (teamIdArg?: string) => {
    const tid = teamIdArg ?? teamId; if (!tid) return;
    const nextBoards = await kanbanApi.boards(tid); const full = await kanbanApi.board(nextBoards[0].boardId); setBoard(full);
  };

  useEffect(() => { (async () => { if (!teamId) return; const boards = await kanbanApi.boards(teamId); if (boards.length===0){ const created = await api.post('/boards',{teamId,name:'Default Board',createdByUserId:'me'}).then(r=>r.data as Board); for(let i=0;i<defaultCols.length;i++) await api.post(`/boards/${created.boardId}/columns`,{name:defaultCols[i],order:i+1}); } reload(teamId); })(); }, [teamId]);

  const columns = useMemo(() => (board?.columns ?? []).slice().sort((a, b) => a.order - b.order), [board]);
  const onCardDrop = async (columnId: string) => { if (!dragCard || !board) return; await kanbanApi.moveCard(dragCard.cardId,{columnId,order:999}); reload(); };
  const onColumnDrop = async (target: Column) => { if (!dragCol || !board || dragCol===target.columnId) return; const source=columns.find(c=>c.columnId===dragCol); if(!source)return; await api.patch(`/columns/${source.columnId}`,{order:target.order}); await api.patch(`/columns/${target.columnId}`,{order:source.order}); reload(); };
  const submitCard = async () => { if (!board || !form.title) return; await api.post('/cards',{ boardId: board.boardId, columnId: targetCol, title: form.title, content: form.content, dueDate: form.dueDate || null, order: Date.now(), createdByUserId: form.assignedUserId || 'me', taskId: form.taskId || null}); setOpen(false); setForm({ title:'', content:'', dueDate:'', assignedUserId:'', taskId:''}); reload(); };

  return <section className='panel'><h2>Kanban (Trello 스타일)</h2><div className='kanban-wrap'>{columns.map(col => <div key={col.columnId} className='k-col' draggable onDragStart={() => setDragCol(col.columnId)} onDragOver={(e)=>e.preventDefault()} onDrop={() => onColumnDrop(col)}><div className='k-head'><b>{col.name}</b><button onClick={()=>{setTargetCol(col.columnId);setOpen(true);}}>+ 카드 추가</button></div><div className='k-cards' onDragOver={(e)=>e.preventDefault()} onDrop={()=>onCardDrop(col.columnId)}>{(col.cards ?? []).map(card => <article key={card.cardId} className='k-card' draggable onDragStart={() => setDragCard(card)}><h4>{card.title}</h4><p>{card.content || '내용 없음'}</p><small>작성자: {card.createdByUserId}</small><small>마감: {card.dueDate?.slice(0,10) ?? '-'}</small><small>업데이트: {card.updatedAt?.slice(0,16).replace('T',' ') ?? '-'}</small></article>)}</div></div>)}</div>
  <Modal open={open} title='카드 생성' onClose={()=>setOpen(false)}>
    <div className='inline'><input placeholder='제목' value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><input placeholder='내용' value={form.content} onChange={e=>setForm({...form,content:e.target.value})}/><input type='date' value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/></div>
    {teamId && <MemberSelect teamId={teamId} value={form.assignedUserId} onChange={(v)=>setForm({...form,assignedUserId:v})} />}
    {teamId && <TaskSelect teamId={teamId} value={form.taskId} onChange={(v)=>setForm({...form,taskId:v||''})} />}
    <div className='inline'><button onClick={submitCard}>저장</button></div>
  </Modal>
  </section>;
}
