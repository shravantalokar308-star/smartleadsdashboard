export const exportToCSV = (data: any[], filename: string = 'leads.csv') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = Object.keys(data[0]).filter(key => !key.startsWith('_'));
  const rows = data.map(item =>
    headers.map(header => {
      const value = item[header];
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value || '';
    }).join(',')
  );

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
