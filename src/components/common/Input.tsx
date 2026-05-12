import { ReactNode } from 'react';
export default function Input(props:{children?:ReactNode;[key:string]:any}){ return <div className='ui-input' {...props}>{props.children ?? 'Input'}</div>; }
