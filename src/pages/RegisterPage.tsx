import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ loginId: '', password: '', name: '', department: '' });
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.loginId || !form.password || !form.name) {
      setError('이름, 아이디, 비밀번호는 필수입니다.');
      return;
    }
    try {
      await authApi.register(form);
      navigate('/login');
    } catch {
      setError('회원가입 실패: 아이디 중복 또는 서버 오류');
    }
  };

  return (
    <form className='auth-form' onSubmit={onSubmit}>
      <h1>회원가입</h1>
      <p className='auth-subtitle'>기본 계정 생성 후 팀/프로젝트를 시작하세요.</p>
      {error && <p className='auth-error'>{error}</p>}

      <label>이름 *</label>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder='홍길동' />

      <label>로그인 아이디 *</label>
      <input value={form.loginId} onChange={(e) => setForm({ ...form, loginId: e.target.value })} placeholder='admin01' />

      <label>비밀번호 *</label>
      <input type='password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder='8자 이상' />

      <label>부서</label>
      <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder='개발팀 (선택)' />

      <div className='tag-row'>
        <span className='tag tag-blue'>기본 권한: USER</span>
        <span className='tag tag-gray'>팀 생성 시 LEADER</span>
      </div>

      <button type='submit'>계정 만들기</button>
    </form>
  );
}
