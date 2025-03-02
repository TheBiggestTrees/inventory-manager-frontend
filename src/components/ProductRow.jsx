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
  return (
    <tr>
      <td className="p-2 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(product._id)}
        />
      </td>
      {['title', 'artist', 'genre', 'releaseDate', 'quantity', 'sku', 'listPrice', 'costPrice'].map(key => (
        <td key={key} className="p-2 text-center">
          {isEditing ? (
            <input
              type="text"
              name={key}
              value={editedValues[key]}
              onChange={(e) => onChange(e, key)}
              className="border p-2 rounded w-full"
            />
          ) : (
            product[key]
          )}
        </td>
      ))}
      <td className="p-2 text-center">
        {isEditing ? (
          <>
            <button
              onClick={() => onSave(product._id)}
              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onEdit(product)}
              className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default ProductRow;
