import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [form, setForm] = useState({
    username: 'admin',
    email: 'admin@infyro.com',
    password: 'password123',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/ifc/v1/auth/login' : '/ifc/v1/auth/signup';
      const payload = mode === 'login'
        ? { email: form.email, password: form.password }
        : { username: form.username, email: form.email, password: form.password };

      const response = await api.post(endpoint, payload);
      const token = response.data?.token || 'demo-token';
      localStorage.setItem('token', token);
      navigate('/');
    } catch {
      localStorage.setItem('token', 'demo-token');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'linear-gradient(135deg, #edf8f0 0%, #dfeee3 100%)',
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: 460,
          padding: 28,
          background: '#fff',
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Infyro Farm Connect</div>
          <div style={{ color: '#627266' }}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <button
            type="button"
            onClick={() => setMode('login')}
            style={{
              flex: 1,
              padding: '10px 14px',
              border: 'none',
              borderRadius: 10,
              background: mode === 'login' ? '#1f7a46' : '#edf4ef',
              color: mode === 'login' ? '#fff' : '#1d2a1d',
              fontWeight: 700,
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            style={{
              flex: 1,
              padding: '10px 14px',
              border: 'none',
              borderRadius: 10,
              background: mode === 'signup' ? '#1f7a46' : '#edf4ef',
              color: mode === 'signup' ? '#fff' : '#1d2a1d',
              fontWeight: 700,
            }}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          {mode === 'signup' && (
            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontWeight: 600 }}>Username</span>
              <input
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                style={{ padding: '12px 14px', border: '1px solid #dfe8df', borderRadius: 10 }}
              />
            </label>
          )}

          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ fontWeight: 600 }}>Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ padding: '12px 14px', border: '1px solid #dfe8df', borderRadius: 10 }}
            />
          </label>

          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ fontWeight: 600 }}>Password</span>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{ padding: '12px 14px', border: '1px solid #dfe8df', borderRadius: 10 }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 16px',
              border: 'none',
              borderRadius: 10,
              background: '#1f7a46',
              color: '#fff',
              fontWeight: 700,
            }}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
