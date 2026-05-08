import { ReactNode } from 'react';
export default function Modal(props:{children?:ReactNode;[key:string]:any}){ return <div className='ui-modal' {...props}>{props.children ?? 'Modal'}</div>; }
