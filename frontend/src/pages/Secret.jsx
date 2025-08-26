// frontend/src/pages/Secret.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Secret() {
  const { token, user } = useAuth();
  const api = import.meta.env.VITE_API_URL;
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!token) return setErr('You must be logged in.');
    (async () => {
      try {
        const res = await fetch(`${api}/api/secret`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        setMsg(data.message);
      } catch (e) {
        setErr(e.message || 'Failed to load secret');
      }
    })();
  }, [api, token]);

  return (
    <main style={{ padding: 16 }}>
      <h1>Secret API</h1>
      <p>User: <strong>{user?.name}</strong></p>
      {msg && <p>{msg}</p>}
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </main>
  );
}
