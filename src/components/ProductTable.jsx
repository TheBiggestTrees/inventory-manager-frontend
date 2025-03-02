import React from 'react';
import ProductRow from './ProductRow';

const ProductTable = ({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  sortConfig, 
  onSort, 
  editingProduct,
  editedValues,
  handleChange,
  handleSave,
  handleCancel,
  handleDelete 
}) => {
  return (
    <table className="min-w-full bg-white border rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="w-12 px-4 py-2"></th>
          {['title', 'artist', 'genre', 'releaseDate', 'quantity', 'sku', 'listPrice', 'costPrice'].map(key => (
            <th 
              key={key}
              className="px-4 py-2 text-left text-sm font-medium text-gray-500 cursor-pointer" 
              onClick={() => onSort(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {sortConfig.key === key && (
                <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
              )}
            </th>
          ))}
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {products.map((product) => (
          <ProductRow
            key={product._id}
            product={product}
            isSelected={selectedProducts.includes(product._id)}
            onSelect={onSelectProduct}
            isEditing={editingProduct === product._id}
            editedValues={editedValues}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
