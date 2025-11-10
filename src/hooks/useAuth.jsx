export const useAuth = () => {
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
      return data;
    } catch (err) {
      console.error('Login Error:', err.message);
      throw err;
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Signup failed');
      return data;
    } catch (err) {
      console.error('Signup Error:', err.message);
      throw err;
    }
  };

  const googleLogin = async () => {
    console.warn('Google OAuth is not implemented in mock backend');
  };

  return { login, signup, googleLogin };
};
