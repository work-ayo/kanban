import { ReactNode } from 'react';
export default function EmptyState(props:{children?:ReactNode;[key:string]:any}){ return <div className='ui-emptystate' {...props}>{props.children ?? 'EmptyState'}</div>; }
