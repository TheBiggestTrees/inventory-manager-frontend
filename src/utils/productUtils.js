export const convertToCSV = (data) => {
  const headers = ['SKU', 'Name', 'Category', 'Quantity', 'Location', 'List Price', 'Cost Price'];
  const rows = data.map(item => [
    item.sku,
    item.name,
    item.category,
    item.quantity,
    item.location,
    item.listPrice,
    item.costPrice
  ]);
  return [headers, ...rows].map(row => row.join(',')).join('\n');
};

export const downloadCSV = (csv, filename) => {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
