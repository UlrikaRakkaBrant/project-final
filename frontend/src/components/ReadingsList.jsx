// frontend/src/components/ReadingsList.jsx
import { useEffect, useState } from 'react';
import { listReadings, deleteReading, updateReading } from '../services/readings';

export default function ReadingsList({ refreshKey = 0 }) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // change to 5/20 if you prefer
  const [data, setData] = useState({ items: [], total: 0, pages: 0, page: 1 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  // inline notes editing
  const [editing, setEditing] = useState(null); // reading _id
  const [draft, setDraft] = useState('');

  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      try {
        // listReadings should accept (page, limit) and return { page, pages, total, items }
        const res = await listReadings(page, limit);
        if (!ignore) {
          setData(res);
          setErr('');
        }
      } catch (e) {
        if (!ignore) setErr(e?.response?.data?.error || e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => { ignore = true; };
  }, [page, limit, refreshKey]);

  const onDelete = async (id) => {
    if (!confirm('Delete this reading?')) return;
    // If this was the last item on the page and not the first page, step back a page
    const lastOnPage = data.items.length === 1 && page > 1;
    await deleteReading(id);
    if (lastOnPage) setPage(p => Math.max(1, p - 1));
    else {
      // trigger a lightweight refresh without flipping page
      setData(d => ({ ...d, items: d.items.filter(x => x._id !== id), total: d.total - 1 }));
    }
  };

  const beginEdit = (r) => { setEditing(r._id); setDraft(r.notes || ''); };
  const cancelEdit = () => { setEditing(null); setDraft(''); };

  const saveEdit = async (id) => {
    await updateReading(id, { notes: draft });
    setEditing(null);
    // update the item locally to avoid a full refetch
    setData(d => ({
      ...d,
      items: d.items.map(it => it._id === id ? { ...it, notes: draft } : it)
    }));
  };

  const fmt = (iso) => new Date(iso).toLocaleString();

  return (
    <>
      {loading && <p>Loading…</p>}
      {err && <p style={{ color: 'crimson' }}>{err}</p>}

      {!loading && !err && data.items.length === 0 && (
        <p>No readings yet. Draw a spread and save it to see it here.</p>
      )}

      {data.items.map(r => (
        <div key={r._id} className="card" style={{ marginBottom: 12 }}>
          <h3 style={{ marginTop: 0 }}>{r.title || '(untitled)'}</h3>
          <p style={{ margin: '4px 0' }}>
            <b>Spread:</b> {r.spread} • <b>Saved:</b> {fmt(r.createdAt)}
          </p>

          {editing === r._id ? (
            <>
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                rows={3}
                style={{ width: '100%' }}
              />
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
              <li key={i}>
                {c.position}: {c.id}{c.reversed ? ' (reversed)' : ''}
              </li>
            ))}
          </ul>

          <button onClick={() => onDelete(r._id)}>Delete</button>
        </div>
      ))}

      {/* Pagination */}
      {data.pages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>← Prev</button>
          <span>
            Page {data.page} / {data.pages}
            {' · '}
            {data.total} total
          </span>
          <button disabled={page >= data.pages} onClick={() => setPage(p => Math.min(data.pages, p + 1))}>Next →</button>
        </div>
      )}
    </>
  );
}


