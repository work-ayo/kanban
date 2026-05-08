import { ReactNode } from 'react';
export default function ConfirmDialog(props:{children?:ReactNode;[key:string]:any}){ return <div className='ui-confirmdialog' {...props}>{props.children ?? 'ConfirmDialog'}</div>; }
