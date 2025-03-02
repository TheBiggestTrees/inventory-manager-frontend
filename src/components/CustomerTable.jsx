import React from 'react';

const CustomerTable = ({
  customers,
  selectedCustomers,
  onSelectCustomer,
  sortConfig,
  onSort,
  editingCustomer,
  editedValues,
  handleChange,
  handleEdit,
  handleSave,
  handleCancel,
  handleDelete
}) => {
  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="w-12 px-4 py-2"></th>
          {['first_name', 'last_name', 'email', 'phone_number', 'address'].map(key => (
            <th
              key={key}
              className="px-4 py-2 text-left text-sm font-medium text-gray-500 cursor-pointer"
              onClick={() => onSort(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
              {sortConfig.key === key && (
                <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
              )}
            </th>
          ))}
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {customers.map((customer) => (
          <tr key={customer._id}>
            <td className="p-2">
              <input
                type="checkbox"
                checked={selectedCustomers.includes(customer._id)}
                onChange={() => onSelectCustomer(customer._id)}
              />
            </td>
            {['first_name', 'last_name', 'email', 'phone_number', 'address'].map(key => (
              <td key={key} className="p-2 text-center">
               {customer[key]}
              </td>
            ))}
            <td className=" p-2">
                  <button
                    onClick={() => handleEdit(customer)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;