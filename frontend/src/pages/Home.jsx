import { useAuth } from '../context/AuthContext';
import { Page, Card, H1, H2, Hint, Button, Grid } from '../ui/components';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <Page>
      <Grid>
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
