import { ReactNode } from 'react';
export default function Loading(props:{children?:ReactNode;[key:string]:any}){ return <div className='ui-loading' {...props}>{props.children ?? 'Loading'}</div>; }
