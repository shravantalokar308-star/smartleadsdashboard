import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchLeads } from '../store/slices/leadSlice';
import Table from '../components/Table';
import Filters from '../components/Filters';
import Modal from '../components/Modal';
import useDebounce from '../hooks/useDebounce';
import { exportToCSV } from '../utils/csv';
import { useDarkMode } from '../context/DarkModeContext';
import api from '../api/axios';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const leads = useAppSelector(s => s.leads.items);
  const meta = useAppSelector(s => s.leads.meta);
  const user = useAppSelector(s => s.auth.user);
  const leadsStatus = useAppSelector(s => s.leads.status);
  const leadsError = useAppSelector(s => s.leads.error);
  const { isDark } = useDarkMode();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    dispatch(
      fetchLeads({
        search: debouncedSearch,
        status,
        source,
        page,
        limit: 10
      })
    );
  }, [debouncedSearch, status, source, page, dispatch]);

  const handleFilterChange = (filters: any) => {
    setStatus(filters.status);
    setSource(filters.source);
    setSearch(filters.search);
    setPage(1);
  };

  const handleExportCSV = () => {
    if (!leads || leads.length === 0) {
      alert('No leads to export. Try applying different filters or searching.');
      return;
    }
    exportToCSV(leads, 'leads.csv');
  };

  const handleEdit = (lead: any) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingLead(null);
    setSaveError('');
  };

  const handleSaveLead = async (data: any) => {
    setLoading(true);
    setSaveError('');
    try {
      if (editingLead) {
        await api.put(`/leads/${editingLead._id}`, data);
      } else {
        await api.post('/leads', data);
      }
      handleModalClose();
      dispatch(
        fetchLeads({
          search: debouncedSearch,
          status,
          source,
          page,
          limit: 10
        })
      );
    } catch (err: any) {
      setSaveError(err?.response?.data?.message || 'Error saving lead');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await api.delete(`/leads/${id}`);
      dispatch(
        fetchLeads({
          search: debouncedSearch,
          status,
          source,
          page,
          limit: 10
        })
      );
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Error deleting lead');
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className={`flex-1 p-6 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{isAdmin ? 'Admin Dashboard' : 'My Dashboard'}</h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {isAdmin ? 'Manage all your leads here' : 'View and track your leads'}
          </p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
              disabled={leadsStatus === 'loading'}
            >
              📥 Export CSV
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              ➕ Add Lead
            </button>
          )}
        </div>
      </div>

      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white'} shadow border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Leads</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{meta?.totalRecords || 0}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white'} shadow border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>New</p>
            <p className="text-2xl font-bold text-yellow-600">{leads?.filter((l: any) => l.status === 'New').length || 0}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white'} shadow border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Contacted</p>
            <p className="text-2xl font-bold text-green-600">{leads?.filter((l: any) => l.status === 'Contacted').length || 0}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white'} shadow border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Qualified</p>
            <p className="text-2xl font-bold text-purple-600">{leads?.filter((l: any) => l.status === 'Qualified').length || 0}</p>
          </div>
        </div>
      )}

      {!isAdmin && (
        <div className={`mb-4 p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-blue-50'} border ${isDark ? 'border-slate-700' : 'border-blue-200'}`}>
          <p className={`${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
            💡 You can view and edit leads. Contact an admin to add new leads.
          </p>
        </div>
      )}

      {leadsError && (
        <div className="mb-4 p-3 bg-red-200 text-red-800 rounded">
          Error: {leadsError}
        </div>
      )}

      <Filters onFilterChange={handleFilterChange} />

      <Table
        data={leads}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={leadsStatus === 'loading'}
        showDelete={isAdmin}
      />

      {meta && (
        <div className={`mt-4 p-3 flex justify-between items-center ${isDark ? 'bg-slate-800' : 'bg-white'} rounded`}>
          <span>
            Page {meta.currentPage} of {meta.totalPages} ({meta.totalRecords} total)
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-500 text-white rounded disabled:opacity-50 hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(meta.totalPages, page + 1))}
              disabled={page >= meta.totalPages}
              className="px-3 py-1 bg-gray-500 text-white rounded disabled:opacity-50 hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <LeadForm lead={editingLead} onClose={handleModalClose} onSubmit={handleSaveLead} error={saveError} loading={loading} />
      )}
    </div>
  );
};

const LeadForm: React.FC<{ lead?: any; onClose: () => void; onSubmit: (data: any) => void; error?: string; loading?: boolean }> = ({
  lead,
  onClose,
  onSubmit,
  error,
  loading
}) => {
  const { isDark } = useDarkMode();
  const user = useAppSelector(s => s.auth.user);
  const isAdminUser = user?.role === 'admin';
  const isNewLead = !lead;
  const [name, setName] = useState(lead?.name || '');
  const [email, setEmail] = useState(lead?.email || '');
  const [status, setStatus] = useState(lead?.status || 'New');
  const [source, setSource] = useState(lead?.source || 'Website');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, status, source });
  };

  if (!isAdminUser && isNewLead) {
    return (
      <Modal isOpen onClose={onClose} title="Access Denied" onSubmit={() => {}}>
        <div className="p-4 text-center">
          <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Only administrators can create new leads.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen title={lead ? 'Edit Lead' : 'Add Lead'} onClose={onClose} onSubmit={() => {}}>
      {error && <div className="mb-3 p-2 bg-red-200 text-red-800 rounded text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full border p-2 rounded ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border p-2 rounded ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={`w-full border p-2 rounded ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`}>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Source</label>
          <select value={source} onChange={(e) => setSource(e.target.value)} className={`w-full border p-2 rounded ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`}>
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button 
            type="submit" 
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Dashboard;
