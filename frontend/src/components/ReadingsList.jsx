// frontend/src/components/ReadingsList.jsx
import { useEffect, useState } from 'react';
import { listReadings, deleteReading } from '../services/readings';
import { Card, H2, Grid, Button, Hint } from '../ui/components';

export default function ReadingsList({ refreshKey = 0 }) {
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const res = await listReadings();
      setData(res);
      setErr('');
    } catch (e) {
      setErr(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [refreshKey]);

  const onDelete = async (id) => {
    if (!confirm('Delete this reading?')) return;
    try {
      await deleteReading(id);
      await load();
    } catch (e) {
      alert(e?.response?.data?.error || e.message);
    }
  };

  return (
    <Card>
      <H2>My Readings</H2>
      <Hint>Total: {data.total}</Hint>
      {loading && <p>Loading…</p>}
      {err && <p style={{ color: 'crimson' }}>{err}</p>}

      <Grid>
        {data.items.map(r => (
          <Card key={r._id}>
            <h3 style={{ marginTop: 0 }}>{r.title || '(untitled)'}</h3>
            <p style={{ margin: '4px 0' }}><b>Spread:</b> {r.spread}</p>
            {r.notes && <p style={{ margin: '4px 0' }}>{r.notes}</p>}
            {r.tags?.length > 0 && <p style={{ margin: '4px 0' }}><i>#{r.tags.join(' #')}</i></p>}
            <ul style={{ margin: '6px 0 12px 18px' }}>
              {r.cards.map((c, i) => (
                <li key={i}>{c.position}: {c.id}{c.reversed ? ' (reversed)' : ''}</li>
              ))}
            </ul>
            <Button onClick={() => onDelete(r._id)}>Delete</Button>
          </Card>
        ))}
      </Grid>
    </Card>
  );
}
