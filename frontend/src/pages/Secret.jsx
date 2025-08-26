import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function Secret() {
  const { user } = useAuth();
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/secret'); // token auto-attached
        setMsg(data.message);
      } catch (e) {
        const msg = e.response?.data?.error || e.message || 'Failed to load';
        setErr(msg);
      }
    })();
  }, []);

  return (
    <main style={{ padding: 16 }}>
      <h1>Secret API</h1>
      <p>User: <strong>{user?.name}</strong></p>
      {msg && <p>{msg}</p>}
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </main>
  );
}
