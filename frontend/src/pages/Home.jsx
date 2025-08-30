// frontend/src/pages/Home.jsx
import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { Page, Card, H1, Hint, Button } from '../ui/components';
import { Link } from 'react-router-dom';

import TarotCard from '../components/TarotCard';
import { drawOneCard } from '../services/tarot';
import Hero from '../components/Hero';

// Regular card look, but centered content
const CenterCard = styled(Card)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

  const greeting = isLoggedIn && user?.name ? `Hi, ${user.name}!` : 'Hi!';

  return (
    <>
      {/* Full-bleed hero stays outside Page */}
      <Hero position="right 75%" />

      <Page>
        {/* Row 1 — Welcome (visible card) */}
        <CenterCard>
          <H1>{greeting}</H1>
          <Hint>
            {isLoggedIn
              ? 'Welcome back. Head to your dashboard to draw cards and save readings.'
              : 'Draw a card now or log in / create an account to save your readings.'}
          </Hint>

          {isLoggedIn ? (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button as={Link} to="/secret">Open Dashboard</Button>
              <Button onClick={logout}>Log out</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button as={Link} to="/register">Create account</Button>
              <Button as={Link} to="/login">Login</Button>
            </div>
          )}
        </CenterCard>

        {/* Row 2 — One-card Guidance (also visible card, centered) */}
        <CenterCard>
          <H1>One-card Guidance</H1>
          <Hint><b>Think of something you want guidance about.</b></Hint>

          <TarotCard card={card} />

          <div style={{ marginTop: 12 }}>
            <Button onClick={onDraw} disabled={loading}>
              {loading ? 'Drawing…' : (card ? 'Draw again' : 'Draw card')}
            </Button>
          </div>
        </CenterCard>
      </Page>
    </>
  );
}

