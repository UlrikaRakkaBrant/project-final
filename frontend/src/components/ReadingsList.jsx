import { useEffect, useState } from 'react';
import { listReadings, deleteReading, updateReading } from '../services/readings';

export default function ReadingsList({ refreshKey = 0 }) {
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState('');

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
    await deleteReading(id);
    await load();
  };

  const beginEdit = (r) => { setEditing(r._id); setDraft(r.notes || ''); };
  const cancelEdit = () => { setEditing(null); setDraft(''); };

  const saveEdit = async (id) => {
    await updateReading(id, { notes: draft });
    setEditing(null);
    await load();
  };

  return (
    <>
      {loading && <p>Loading…</p>}
      {err && <p style={{ color: 'crimson' }}>{err}</p>}

      {data.items.map(r => (
        <div key={r._id} className="card" style={{ marginBottom: 12 }}>
          <h3 style={{ marginTop: 0 }}>{r.title || '(untitled)'}</h3>
          <p style={{ margin: '4px 0' }}><b>Spread:</b> {r.spread}</p>

          {editing === r._id ? (
            <>
              <textarea value={draft} onChange={e => setDraft(e.target.value)} rows={3} style={{ width: '100%' }} />
              <div style={{ marginTop: 8 }}>
                <button onClick={() => saveEdit(r._id)}>Save</button>
                <button onClick={cancelEdit} style={{ marginLeft: 8 }}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              {r.notes && <p style={{ margin: '4px 0' }}>{r.notes}</p>}
              <button onClick={() => beginEdit(r)} style={{ marginRight: 8 }}>Edit notes</button>
            </>
          )}

          <ul style={{ margin: '6px 0 12px 18px' }}>
            {r.cards.map((c, i) => (
              <li key={i}>{c.position}: {c.id}{c.reversed ? ' (reversed)' : ''}</li>
            ))}
          </ul>

          <button onClick={() => onDelete(r._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

