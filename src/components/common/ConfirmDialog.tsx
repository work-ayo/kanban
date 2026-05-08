import Modal from './Modal';
export default function ConfirmDialog({ open, title, onConfirm, onClose }: any){return <Modal open={open} title={title} onClose={onClose}><div className='inline'><button onClick={onConfirm}>확인</button><button onClick={onClose}>취소</button></div></Modal>}
