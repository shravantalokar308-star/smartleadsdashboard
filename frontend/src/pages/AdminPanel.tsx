import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { useDarkMode } from '../context/DarkModeContext';
import api from '../api/axios';

const AdminPanel: React.FC = () => {
  const { isDark } = useDarkMode();
  const user = useAppSelector(s => s.auth.user);
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'leads'>('overview');

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/leads');
      const leads = res.data.data || res.data;
      const statsData = {
        totalLeads: leads.length,
        newLeads: leads.filter((l: any) => l.status === 'New').length,
        contacted: leads.filter((l: any) => l.status === 'Contacted').length,
        qualified: leads.filter((l: any) => l.status === 'Qualified').length,
        lost: leads.filter((l: any) => l.status === 'Lost').length,
        website: leads.filter((l: any) => l.source === 'Website').length,
        instagram: leads.filter((l: any) => l.source === 'Instagram').length,
        referral: leads.filter((l: any) => l.source === 'Referral').length,
      };
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data.data || res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const StatCard: React.FC<{ title: string; value: number; color: string; icon: string }> = ({ title, value, color, icon }) => (
    <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </div>
        <div className={`text-4xl ${color}`}>{icon}</div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Leads" value={stats?.totalLeads || 0} color="text-blue-600" icon="📊" />
        <StatCard title="New Leads" value={stats?.newLeads || 0} color="text-yellow-600" icon="🆕" />
        <StatCard title="Contacted" value={stats?.contacted || 0} color="text-green-600" icon="📞" />
        <StatCard title="Qualified" value={stats?.qualified || 0} color="text-purple-600" icon="✅" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Lead Status Distribution</h3>
          <div className="space-y-3">
            {[
              { label: 'New', value: stats?.newLeads || 0, color: 'bg-yellow-500' },
              { label: 'Contacted', value: stats?.contacted || 0, color: 'bg-green-500' },
              { label: 'Qualified', value: stats?.qualified || 0, color: 'bg-purple-500' },
              { label: 'Lost', value: stats?.lost || 0, color: 'bg-red-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded ${item.color}`} />
                <span className={`flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Lead Source Distribution</h3>
          <div className="space-y-3">
            {[
              { label: 'Website', value: stats?.website || 0, color: 'bg-blue-500' },
              { label: 'Instagram', value: stats?.instagram || 0, color: 'bg-pink-500' },
              { label: 'Referral', value: stats?.referral || 0, color: 'bg-orange-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded ${item.color}`} />
                <span className={`flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
      <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>All Users</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`${isDark ? 'text-gray-400' : 'text-gray-600'} border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Role</th>
              <th className="text-left py-3 px-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className={`border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                <td className={`py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{u.name}</td>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{u.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'admin' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
      <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>All Leads (Admin View)</h3>
      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage all leads from the Dashboard page.</p>
    </div>
  );

  return (
    <div className={`flex-1 p-6 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage your leads and users</p>
      </div>

      <div className="flex gap-2 mb-6">
        {[
          { key: 'overview', label: '📊 Overview', icon: 'overview' },
          { key: 'users', label: '👥 Users', icon: 'users' },
          { key: 'leads', label: '📋 Leads', icon: 'leads' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : `${isDark ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'leads' && renderLeads()}
    </div>
  );
};

export default AdminPanel;