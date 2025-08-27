import { useState } from 'react';
import { Page } from '../ui/components';
import TarotCard from '../components/TarotCard';
import { drawOneCard } from '../services/tarot';
import ReadingForm from '../components/ReadingForm';
import ReadingsList from '../components/ReadingsList';
import { createReading } from '../services/readings';

const H1 = ({ children }) => <h2 style={{ marginTop: 0 }}>{children}</h2>;

export default function Secret() {
  const [mode, setMode] = useState('one'); // 'one' | 'three'
  const [refreshKey, setRefreshKey] = useState(0);

  // One-card state
  const [oneCard, setOneCard] = useState(null);
  const [busyOne, setBusyOne] = useState(false);

  // Three-card state
  const [c1, setC1] = useState(null);
  const [c2, setC2] = useState(null);
  const [c3, setC3] = useState(null);
  const [busy, setBusy] = useState({ c1: false, c2: false, c3: false });

  const focalText = `Focus on this and the benefits will be bigger than anything else. 
A 'knot in a muscle'. Aspect of yourself to express? Challenge to overcome? 
Something neglected that needs attention?`;
  const receiveText = `Let this in to unlock the Focal Point. The world is trying to give
this to you. A window of opportunity? An invitation?`;
  const giveText = `What the world wants from you. Talent to develop? Truth to express?
Task to complete? Get this out to dissolve the block around the Focal Point.`;

  async function draw(setter, key) {
    setBusy(s => ({ ...s, [key]: true }));
    try { setter(await drawOneCard()); }
    finally { setBusy(s => ({ ...s, [key]: false })); }
  }

  async function saveThree() {
    if (!c1 || !c2 || !c3) { alert('Draw all three cards first.'); return; }
    await createReading({
      spread: 'three',
      title: 'Focal / Receive / Give',
      notes: '',
      tags: ['auto', 'three'],
      cards: [
        { id: c1.name, reversed: !!c1.reversed, position: 'Focal Point' },
        { id: c2.name, reversed: !!c2.reversed, position: 'Gift to Receive' },
        { id: c3.name, reversed: !!c3.reversed, position: 'Gift to Give' },
      ],
    });
    setRefreshKey(k => k + 1);
    alert('Saved!');
  }

  return (
    <Page>
      <div className="grid-1-2-3">
        {/* Left: draw area */}
        <div className="card">
          <H1>Draw options</H1>

          <label style={{ display: 'inline-flex', gap: 8, marginRight: 16 }}>
            <input type="radio" checked={mode === 'one'} onChange={() => setMode('one')} />
            One card
          </label>
          <label style={{ display: 'inline-flex', gap: 8 }}>
            <input type="radio" checked={mode === 'three'} onChange={() => setMode('three')} />
            Three cards
          </label>

          {mode === 'one' ? (
            <div style={{ marginTop: 16 }}>
              <p><b>Think of something you want guidance about.</b></p>
              <TarotCard card={oneCard} />
              <button onClick={async () => { setBusyOne(true); try { setOneCard(await drawOneCard()); } finally { setBusyOne(false); } }}
                disabled={busyOne} style={{ marginTop: 12 }}>
                {busyOne ? 'Drawing…' : (oneCard ? 'Draw again' : 'Draw card')}
              </button>
            </div>
          ) : (
            <div style={{ marginTop: 16 }}>
              <div className="grid-1-2-3">
                <div>
                  <TarotCard title="Focal Point" hoverText={focalText} card={c1} />
                  <button onClick={() => draw(setC1, 'c1')} disabled={busy.c1} style={{ marginTop: 8 }}>
                    {busy.c1 ? 'Drawing…' : (c1 ? 'Draw again' : 'Draw card')}
                  </button>
                </div>
                <div>
                  <TarotCard title="Gift to Receive" hoverText={receiveText} card={c2} />
                  <button onClick={() => draw(setC2, 'c2')} disabled={busy.c2} style={{ marginTop: 8 }}>
                    {busy.c2 ? 'Drawing…' : (c2 ? 'Draw again' : 'Draw card')}
                  </button>
                </div>
                <div>
                  <TarotCard title="Gift to Give" hoverText={giveText} card={c3} />
                  <button onClick={() => draw(setC3, 'c3')} disabled={busy.c3} style={{ marginTop: 8 }}>
                    {busy.c3 ? 'Drawing…' : (c3 ? 'Draw again' : 'Draw card')}
                  </button>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <button onClick={saveThree} disabled={!c1 || !c2 || !c3}>Save as reading</button>
              </div>
            </div>
          )}
        </div>

        {/* Middle: create reading (manual form you already had) */}
        <div className="card">
          <H1>Create a Reading</H1>
          <ReadingForm onCreated={() => setRefreshKey(k => k + 1)} />
        </div>

        {/* Right: saved readings */}
        <div className="card">
          <H1>My Readings</H1>
          <ReadingsList refreshKey={refreshKey} />
        </div>
      </div>
    </Page>
  );
}

