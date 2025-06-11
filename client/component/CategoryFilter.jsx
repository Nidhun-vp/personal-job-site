import React from 'react';

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="mb-4">
      <label className="form-label me-2"><strong>Filter by Category:</strong></label>
      <select className="form-select w-auto d-inline-block" value={selected} onChange={(e) => onSelect(e.target.value)}>
        <option value="">All</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
