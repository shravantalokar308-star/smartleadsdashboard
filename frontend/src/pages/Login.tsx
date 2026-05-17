import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { isDark } = useDarkMode();
  const user = useAppSelector(s => s.auth.user);

  React.useEffect(() => {
    if (user) nav('/');
  }, [user, nav]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await dispatch(login({ email, password })).unwrap();
      nav('/');
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className={`${isDark ? 'bg-slate-800' : 'bg-white'} p-8 rounded-lg shadow-lg w-full max-w-md`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Smart Leads Dashboard</h2>
        {error && <div className="mb-4 p-3 bg-red-200 text-red-800 rounded">{error}</div>}
        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className={`w-full border p-2 rounded ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className={`w-full border p-2 rounded ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
