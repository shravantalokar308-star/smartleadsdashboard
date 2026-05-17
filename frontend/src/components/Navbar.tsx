import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const user = useAppSelector(s => s.auth.user);
  const dispatch = useAppDispatch();
  const { isDark, toggleDark } = useDarkMode();
  const nav = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    nav('/login');
  };

  return (
    <nav className={`${isDark ? 'bg-gradient-to-r from-slate-800 to-slate-900' : 'bg-gradient-to-r from-blue-600 to-blue-700'} shadow-lg border-b border-opacity-20`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-white">📊 Smart Leads</div>
          <span className={`text-xs px-3 py-1 rounded-full ${isDark ? 'bg-slate-700' : 'bg-blue-500'} text-gray-100`}>Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-blue-500 bg-opacity-30'}`}>
                <span className="text-sm font-medium text-white">{user.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${user.role === 'admin' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                  {user.role.toUpperCase()}
                </span>
              </div>
              <button
                onClick={toggleDark}
                className={`px-3 py-2 rounded-lg transition-all ${isDark ? 'bg-yellow-400 text-slate-900 hover:bg-yellow-300' : 'bg-white text-blue-600 hover:bg-gray-100'}`}
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
