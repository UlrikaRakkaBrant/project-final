import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Secret() {
  const { token, user } = useAuth();
  const api = import.meta.env.VITE_API_URL;
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!token) return;
    fetch(`${api}/api/secret`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok)
