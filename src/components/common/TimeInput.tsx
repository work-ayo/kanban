import { ReactNode } from 'react';
export default function TimeInput(props:{children?:ReactNode;[key:string]:any}){ return <div className='ui-timeinput' {...props}>{props.children ?? 'TimeInput'}</div>; }
