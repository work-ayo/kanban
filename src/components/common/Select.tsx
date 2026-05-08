import { ReactNode } from 'react';
export default function Select(props:{children?:ReactNode;[key:string]:any}){ return <div className='ui-select' {...props}>{props.children ?? 'Select'}</div>; }
