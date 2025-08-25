import { useAuth } from '../context/AuthContext';
export default function Home() {
  const { user, isLoggedIn, logout } = useAuth();
  return (
    <main style={{ padding: 16 }}>
      <h1>Home</h1>
      {isLoggedIn ? (
        <>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </main>
  );
}
