// frontend/src/pages/Home.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Page, Card, H1, H2, Hint, Button, Grid } from '../ui/components';
import { Link } from 'react-router-dom';

import TarotCard from '../components/TarotCard';
import { drawOneCard } from '../services/tarot';
import Hero from '../components/Hero';

export default function Home() {
  const { user, isLoggedIn, logout } = useAuth();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onDraw() {
    setLoading(true);
    try {
      setCard(await drawOneCard()); // random, 50% reversed
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Full-bleed hero is now OUTSIDE the <Page> wrapper */}
      <Hero position="right 75%" />

      <Page>
        <Grid>
          {/* One-card guidance */}
          <Card>
            <H1>One-card Guidance</H1>
            <Hint><b>Think of something you want guidance about.</b></Hint>
            <TarotCard card={card} />
            <div style={{ marginTop: 12 }}>
              <Button onClick={onDraw} disabled={loading}>
                {loading ? 'Drawing…' : (card ? 'Draw again' : 'Draw card')}
              </Button>
            </div>
          </Card>

          {/* Welcome card (kept) */}
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
        </Grid>
      </Page>
    </>
  );
}

