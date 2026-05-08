import { ReactNode } from 'react';
export default function DateInput(props:{children?:ReactNode;[key:string]:any}){ return <div className='ui-dateinput' {...props}>{props.children ?? 'DateInput'}</div>; }
