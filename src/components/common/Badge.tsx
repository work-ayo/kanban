import { ReactNode } from 'react';
export default function Badge(props:{children?:ReactNode;[key:string]:any}){ return <div className='ui-badge' {...props}>{props.children ?? 'Badge'}</div>; }
