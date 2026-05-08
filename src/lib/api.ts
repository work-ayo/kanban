import axios from 'axios';
import { authStorage } from './auth';
export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api' });
api.interceptors.request.use((c)=>{ const t=authStorage.getAccess(); if(t) c.headers.Authorization=`Bearer ${t}`; return c;});
