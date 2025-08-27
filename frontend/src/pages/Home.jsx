// frontend/src/pages/Home.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Page, Card, H1, H2, Hint, Button, Grid } from '../ui/components';
import { Link } from 'react-router-dom';

import TarotCard from '../components/TarotCard';
import { drawOneCard } from '../services/tarot';

export default function Home() {
  const { user, isLoggedIn, logout } = useAuth();

  // --- new state for the one-card draw ---
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onDraw() {
    setLoading(true);
    try {
      const c = await drawOneCard();       // random, 50% reversed
      setCard(c);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page>
      <Grid>
        {/* NEW: One-card guidance */}
        <Card>
          <H1>One-card Guidance</H1>
          <Hint><b>Think of something you want guidance about.</b></Hint>

          {/* Shows back-of-card until a card is drawn; rotates if reversed */}
          <TarotCard card={card} />

          <div style={{ marginTop: 12 }}>
            <Button onClick={onDraw} disabled={loading}>
              {loading ? 'Drawing…' : (card ? 'Draw again' : 'Draw card')}
            </Button>
          </div>
        </Card>

        {/* Your original welcome card (kept) */}
        <Card>
          <H1>{isLoggedIn ? `Welcome, ${user?.name}!` : 'Welcome to the Tarot App'}</H1>
          <Hint>
            {isLoggedIn
              ? 'You are logged in. Head to your secret dashboard or start exploring features.'
              : 'Create an account or log in to save readings, daily cards, and notes.'}
          </Hint>

          {isLoggedIn ? (
            <>
              <Button as={Link} to="/secret" style={{ marginRight: 8 }}>
                Open Dashboard
              </Button>
              <Button onClick={logout}>Log out</Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/register" style={{ marginRight: 8 }}>
                Create account
              </Button>
              <Button as={Link} to="/login">Login</Button>
            </>
          )}
        </Card>

        {/* Your original “What’s next?” card (kept) */}
        <Card>
          <H2>What’s next?</H2>
          <ul style={{ margin: '8px 0 0 18px' }}>
            <li>Daily Card (per-user) with history</li>
            <li>Readings (1–3 card spreads) with notes</li>
            <li>Saved spreads and journal</li>
          </ul>
          <Hint style={{ marginTop: 8 }}>
            The “Secret” link is your temporary dashboard—JWT-protected and ready to expand.
          </Hint>
        </Card>
      </Grid>
    </Page>
  );
}

