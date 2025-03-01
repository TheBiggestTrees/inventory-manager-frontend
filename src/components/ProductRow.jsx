import React from 'react';

const ProductRow = ({
  product,
  isSelected,
  onSelect,
  isEditing,
  editedValues,
  onChange,
  onSave,
  onCancel,
  onDelete
}) => {
  const renderEditableField = (field, type = 'text', step) => {
    return isEditing ? (
      <input
        type={type}
        value={editedValues[field]}
        onChange={(e) => onChange(e, field)}
        className="w-full px-2 py-1 border rounded"
        step={step}
        min={type === 'number' ? '0' : undefined}
      />
    ) : field === 'listPrice' || field === 'costPrice' ? 
      `$${product[field].toFixed(2)}` : product[field];
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(product._id)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2">{renderEditableField('sku')}</td>
      <td className="px-4 py-2">{renderEditableField('name')}</td>
      <td className="px-4 py-2">{renderEditableField('category')}</td>
      <td className="px-4 py-2">{renderEditableField('quantity', 'number')}</td>
      <td className="px-4 py-2">{renderEditableField('listPrice', 'number', '0.01')}</td>
      <td className="px-4 py-2">{renderEditableField('costPrice', 'number', '0.01')}</td>
      <td className="px-4 py-2">{renderEditableField('location')}</td>
      <td className="px-4 py-2">
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={() => onSave(product._id)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => onSelect(product._id)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ProductRow;
