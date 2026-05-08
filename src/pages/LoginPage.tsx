import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';
import { authStorage } from '../lib/auth';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await authApi.login({ loginId, password });
    authStorage.setTokens(res.tokens.accessToken, res.tokens.refreshToken);
    setUser(res.user);
    navigate('/app/dashboard');
  };

  return <form onSubmit={onSubmit}><h1>Login</h1><input value={loginId} onChange={(e)=>setLoginId(e.target.value)} placeholder='loginId'/><input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password'/><button type='submit'>Login</button></form>;
}
