import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

interface TableProps {
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
  showDelete?: boolean;
}

const Table: React.FC<TableProps> = ({ data, onEdit, onDelete, loading, showDelete = false }) => {
  const { isDark } = useDarkMode();

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!data || data.length === 0) return <div className={`p-6 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>No records found</div>;

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className={`w-full border-collapse ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <thead>
          <tr className={`${isDark ? 'bg-slate-700 text-gray-200' : 'bg-gradient-to-r from-gray-100 to-white'}`}>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Source</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id} className={`border-b ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
              <td className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${isDark ? 'bg-slate-700 text-white' : 'bg-blue-100 text-blue-700'}`}>
                  {row.name.split(' ').map((n: string) => n[0]).slice(0,2).join('').toUpperCase()}
                </div>
                <div>
                  <div className="font-medium">{row.name}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(row.createdAt).toLocaleDateString()}</div>
                </div>
              </td>
              <td className="p-4">{row.email}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    row.status === 'New'
                      ? 'bg-blue-100 text-blue-800'
                      : row.status === 'Contacted'
                      ? 'bg-yellow-100 text-yellow-800'
                      : row.status === 'Qualified'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="p-4">{row.source}</td>
              <td className="p-4 text-center flex gap-3 justify-center">
                {onEdit && <button onClick={() => onEdit(row)} className="text-sm px-3 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100">Edit</button>}
                {showDelete && onDelete && <button onClick={() => onDelete(row._id)} className="text-sm px-3 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100">Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
