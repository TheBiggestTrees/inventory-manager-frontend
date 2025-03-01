import React, { useState } from 'react';

const FilterBox = ({ filters, onFilterChange, quantityRange, uniqueNames, uniqueLocations, uniqueCategories, uniqueSkus }) => {
  const [isNameDropdownOpen, setIsNameDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSkuDropdownOpen, setIsSkuDropdownOpen] = useState(false);

  const getFilteredOptions = (list, filterValue) => {
    return list.filter(item => 
      item.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {Object.entries(filters).some(([key, value]) => {
          if (value === '') return false;
          if (key === 'quantity' && value === quantityRange.max.toString()) return false;
          if (key === 'quantityMin' && value === quantityRange.min.toString()) return false;
          if (key === 'listPrice' && value === '') return false;
          if (key === 'costPrice' && value === '') return false;
          return true;
        }) && (
          <button
            onClick={() => onFilterChange('clear')}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Clear Filters
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* SKU Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SKU
          </label>
          <input
            type="text"
            value={filters.sku || ''}
            onChange={(e) => onFilterChange('sku', e.target.value)}
            onFocus={() => setIsSkuDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsSkuDropdownOpen(false), 200)}
            placeholder="Search SKU..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isSkuDropdownOpen && getFilteredOptions(uniqueSkus, filters.sku || '').length > 0 && (
            <div className="absolute z-[9999] w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
              {getFilteredOptions(uniqueSkus, filters.sku || '').map((sku) => (
                <div
                  key={sku}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-100"
                  onClick={() => {
                    onFilterChange('sku', sku);
                    setIsSkuDropdownOpen(false);
                  }}
                >
                  <span className="block truncate">{sku}</span>
                  {filters.sku === sku && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Name Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={filters.name}
            onChange={(e) => onFilterChange('name', e.target.value)}
            onFocus={() => setIsNameDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsNameDropdownOpen(false), 200)}
            placeholder="Search products..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isNameDropdownOpen && getFilteredOptions(uniqueNames, filters.name).length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
              {getFilteredOptions(uniqueNames, filters.name).map((name) => (
                <div
                  key={name}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-100"
                  onClick={() => {
                    onFilterChange('name', name);
                    setIsNameDropdownOpen(false);
                  }}
                >
                  <span className="block truncate">{name}</span>
                  {filters.name === name && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Filters */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max List Price ($)
          </label>
          <input
            type="number"
            value={filters.listPrice || ''}
            onChange={(e) => onFilterChange('listPrice', e.target.value)}
            min="0"
            step="0.01"
            placeholder="Enter max list price..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Cost Price ($)
          </label>
          <input
            type="number"
            value={filters.costPrice || ''}
            onChange={(e) => onFilterChange('costPrice', e.target.value)}
            min="0"
            step="0.01"
            placeholder="Enter max cost price..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={filters.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value)}
            onFocus={() => setIsCategoryDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 200)}
            placeholder="Search category..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isCategoryDropdownOpen && uniqueCategories && getFilteredOptions(uniqueCategories, filters.category || '').length > 0 && (
            <div className="absolute z-[9999] w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
              {getFilteredOptions(uniqueCategories, filters.category || '').map((category) => (
                <div
                  key={category}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-100"
                  onClick={() => {
                    onFilterChange('category', category);
                    setIsCategoryDropdownOpen(false);
                  }}
                >
                  <span className="block truncate">{category}</span>
                  {filters.category === category && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quantity Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity Range ({filters.quantityMin || quantityRange.min} - {filters.quantity || quantityRange.max})
          </label>
          <div className="space-y-2">
            <div className="relative pt-1 h-8">
              <div className="absolute h-2 w-full bg-gray-200 rounded top-4"></div>
              
              <div
                className="absolute h-2 bg-blue-500 rounded top-4"
                style={{
                  left: `${((parseInt(filters.quantityMin || quantityRange.min) - quantityRange.min) / (quantityRange.max - quantityRange.min)) * 100}%`,
                  width: `${((parseInt(filters.quantity || quantityRange.max) - (parseInt(filters.quantityMin || quantityRange.min))) / (quantityRange.max - quantityRange.min)) * 100}%`,
                  zIndex: 1
                }}
              ></div>

              <input
                type="range"
                min={quantityRange.min}
                max={quantityRange.max}
                value={filters.quantityMin || quantityRange.min}
                onChange={(e) => {
                  const minVal = parseInt(e.target.value);
                  const maxVal = parseInt(filters.quantity || quantityRange.max);
                  if (minVal <= maxVal) {
                    onFilterChange('quantityMin', e.target.value);
                  }
                }}
                className="range-slider absolute top-0 w-full"
                style={{
                  height: '40px',
                  WebkitAppearance: 'none',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
              />
              
              <input
                type="range"
                min={quantityRange.min}
                max={quantityRange.max}
                value={filters.quantity || quantityRange.max}
                onChange={(e) => {
                  const maxVal = parseInt(e.target.value);
                  const minVal = parseInt(filters.quantityMin || quantityRange.min);
                  if (maxVal >= minVal) {
                    onFilterChange('quantity', e.target.value);
                  }
                }}
                className="range-slider absolute top-0 w-full"
                style={{
                  height: '40px',
                  WebkitAppearance: 'none',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            onFocus={() => setIsLocationDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 200)}
            placeholder="Search locations..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isLocationDropdownOpen && getFilteredOptions(uniqueLocations, filters.location).length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
              {getFilteredOptions(uniqueLocations, filters.location).map((location) => (
                <div
                  key={location}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-100"
                  onClick={() => {
                    onFilterChange('location', location);
                    setIsLocationDropdownOpen(false);
                  }}
                >
                  <span className="block truncate">{location}</span>
                  {filters.location === location && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          margin-top: -8px;
          position: relative;
          z-index: 50;
        }
        
        .range-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
          position: relative;
          z-index: 50;
        }
        
        .range-slider::-ms-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          position: relative;
          z-index: 50;
        }

        .range-slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 2px;
          background: transparent;
        }

        .range-slider::-moz-range-track {
          width: 100%;
          height: 2px;
          background: transparent;
        }

        .range-slider::-ms-track {
          width: 100%;
          height: 2px;
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default FilterBox;
