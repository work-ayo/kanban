import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';

export default function RegisterPage(){
  const navigate = useNavigate();
  const [form,setForm]=useState({loginId:'',password:'',name:''});
  const onSubmit=async(e:FormEvent)=>{e.preventDefault(); await authApi.register(form); navigate('/login');};
  return <form onSubmit={onSubmit}><h1>Register</h1><input placeholder='name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input placeholder='loginId' value={form.loginId} onChange={e=>setForm({...form,loginId:e.target.value})}/><input type='password' placeholder='password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><button type='submit'>Create</button></form>;
}
