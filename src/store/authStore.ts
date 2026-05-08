import { create } from 'zustand'; import type { User } from '../types/auth'; import { authStorage } from '../lib/auth';
interface AuthState { user: User | null; isAuthenticated: boolean; setUser: (u: User | null) => void; logout: () => void; }
export const useAuthStore=create<AuthState>((set)=>({user:null,isAuthenticated:!!authStorage.getAccess(),setUser:(u)=>set({user:u,isAuthenticated:!!u}),logout:()=>{authStorage.clear();set({user:null,isAuthenticated:false});}}));
