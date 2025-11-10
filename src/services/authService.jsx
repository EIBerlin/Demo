const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const loginUser = async (email, password, role) => {
  try {
    const resp = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await resp.json();
    if (!resp.ok) {
      const err = data?.error || data?.message || 'Login failed';
      throw new Error(err);
    }

    const { token, user } = data;

    if (role && user?.role && user.role !== role) {
      alert('Role does not match.');
      throw new Error('Role mismatch');
    }

    return { token, user };
  } catch (error) {
    throw error;
  }
};

export const signupUser = async (email, username, role, password) => {
  try {
    const resp = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username, role })
    });

    const data = await resp.json();
    if (!resp.ok) {
      const err = data?.error || data?.message || 'Signup failed';
      throw new Error(err);
    }

    return data.user;
  } catch (error) {
    console.error('Signup error:', error.message);
    alert('Error during signup. Please try again.');
    throw error;
  }
};
