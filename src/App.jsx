import { useCallback, useContext, useMemo, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext } from './AuthContex';
import SignUpForm from './components/SignUpForm';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-brand">
        <Link to="/" aria-label="Home">
          nook<span>.</span>
        </Link>
      </div>
      <ul className="navbar-links">
        {user ? (
          <>
            <li>
              <span>Hi, {user.name}</span>
            </li>
            <li>
              <button type="button" onClick={logout}>
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <main className="home-page">
      <h1>Welcome to Nook</h1>
      <p>Your one-stop shop for all your favorite products.</p>
      {user ? (
        <p>Welcome back, {user.name}!</p>
      ) : (
        <Link to="/signup" className="signup-link">
          Create an account
        </Link>
      )}
    </main>
  );
}

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(event) {
    event.preventDefault();
    login(email);
  }

  return (
    <main className="login-page">
      <h1>Log in</h1>
      <p>This demo signs in locally and does not verify credentials.</p>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="login-email">Email address</label>
          <input
            type="email"
            id="login-email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </main>
  );
}

function App() {
  const [user, setUser] = useState(null);

  const login = useCallback((email) => {
    setUser({ name: email.split('@')[0], email });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const authValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return (
    <AuthContext.Provider value={authValue}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
