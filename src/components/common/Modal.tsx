import { ReactNode } from 'react';
export default function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return <div className='modal-backdrop' onClick={onClose}><div className='modal' onClick={(e)=>e.stopPropagation()}><div className='modal-head'><h3>{title}</h3><button onClick={onClose}>✕</button></div>{children}</div></div>;
}
