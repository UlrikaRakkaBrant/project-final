// frontend/src/pages/Secret.jsx
import { useState } from 'react';
import { Page, Grid, Card } from '../ui/components';
import ReadingForm from '../components/ReadingForm';
import ReadingsList from '../components/ReadingsList';

import { drawRandom } from '../services/tarot';
import { imageUrlForCard } from '../lib/tarotImages';

export default function Secret() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [cards, setCards] = useState([]);

  async function handleDraw() {
    try {
      const data = await drawRandom(3);
      const list = Array.isArray(data) ? data : data.cards; // normalize shape
      setCards(list || []);
    } catch (e) {
      alert(e?.response?.data?.error || e.message);
    }
  }

  return (
    <Page>
      <Grid>
        {/* NEW: Quick draw */}
        <Card>
          <h2 style={{ marginTop: 0 }}>Quick draw from API</h2>
          <button onClick={handleDraw}>Draw 3 cards</button>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(140px, 1fr))',
            gap: 12,
            marginTop: 12
          }}>
            {cards.map((c) => (
              <div key={c.name} style={{ textAlign: 'center' }}>
                <img
                  src={imageUrlForCard(c)}
                  alt={c.name}
                  style={{ width: '100%', maxWidth: 220, height: 'auto', borderRadius: 8 }}
                  onError={(e) => { e.currentTarget.src = '/card-back.svg'; }}
                />
                <div style={{ marginTop: 6, fontWeight: 600 }}>{c.name}</div>
                {c.meaning_up && <div style={{ fontSize: 12, opacity: 0.8 }}>{c.meaning_up}</div>}
              </div>
            ))}
          </div>
        </Card>

        {/* Your existing parts */}
        <ReadingForm onCreated={() => setRefreshKey(k => k + 1)} />
        <ReadingsList refreshKey={refreshKey} />
      </Grid>
    </Page>
  );
}
