import { ReactNode } from 'react';
export default function Button(props:{children?:ReactNode;[key:string]:any}){ return <div className='ui-button' {...props}>{props.children ?? 'Button'}</div>; }
