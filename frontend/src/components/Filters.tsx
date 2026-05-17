import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const { isDark } = useDarkMode();
  const [status, setStatus] = React.useState('');
  const [source, setSource] = React.useState('');
  const [search, setSearch] = React.useState('');

  const handleApply = () => {
    onFilterChange({ status, source, search });
  };

  return (
    <div className={`${isDark ? 'bg-slate-700' : 'bg-gray-100'} p-4 rounded-lg mb-4`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`px-3 py-2 rounded border ${isDark ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-gray-300'}`}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`px-3 py-2 rounded border ${isDark ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-gray-300'}`}
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className={`px-3 py-2 rounded border ${isDark ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-gray-300'}`}
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </select>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
