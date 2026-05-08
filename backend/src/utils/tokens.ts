import { createHash } from 'crypto';
export const hashToken=(t:string)=>createHash('sha256').update(t).digest('hex');
