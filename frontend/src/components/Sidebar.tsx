import React from 'react';
import { useAppSelector } from '../store/hooks';
import { useDarkMode } from '../context/DarkModeContext';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const user = useAppSelector(s => s.auth.user);
  const { isDark } = useDarkMode();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={`w-64 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-800' : 'bg-gradient-to-b from-gray-50 to-gray-100'} border-r h-screen overflow-y-auto shadow-lg`}>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-6 uppercase tracking-wider text-blue-600">Menu</h3>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                isActive('/')
                  ? 'bg-blue-600 text-white'
                  : `${isDark ? 'hover:bg-slate-700 text-gray-200' : 'hover:bg-blue-100 text-gray-800'}`
              }`}
            >
              📊 {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
            </Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link
                  to="/admin"
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive('/admin')
                      ? 'bg-blue-600 text-white'
                      : `${isDark ? 'hover:bg-slate-700 text-gray-200' : 'hover:bg-blue-100 text-gray-800'}`
                  }`}
                >
                  ⚙️ Admin Panel
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-slate-700' : 'border-gray-300'}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Account</p>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{user.name}</p>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{user.email}</p>
          <span className={`inline-block mt-2 text-xs px-2 py-1 rounded font-bold ${isAdmin ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
            {isAdmin ? 'ADMIN' : 'USER'}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
