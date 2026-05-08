export type GlobalRole = 'ADMIN' | 'USER';
export interface User { userId: string; loginId: string; name: string; department?: string | null; globalRole: GlobalRole; isActive: boolean; }
export interface AuthTokens { accessToken: string; refreshToken: string; }
export interface LoginRequest { loginId: string; password: string; }
export interface RegisterRequest extends LoginRequest { name: string; department?: string; }
export interface AuthResponse { user: User; tokens: AuthTokens; }
