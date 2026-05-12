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
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await authApi.login({ loginId, password });
      authStorage.setTokens(res.tokens.accessToken, res.tokens.refreshToken);
      setUser(res.user);
      navigate('/app/dashboard');
    } catch {
      setError('로그인 실패: 아이디/비밀번호 확인');
    }
  };

  return (
    <form className='auth-form' onSubmit={onSubmit}>
      <h1>로그인</h1>
      <p className='auth-subtitle'>업무관리 시스템에 접속합니다.</p>
      {error && <p className='auth-error'>{error}</p>}
      <label>아이디</label>
      <input value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder='admin01' />
      <label>비밀번호</label>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='••••••••' />
      <button type='submit'>Login</button>
    </form>
  );
}
