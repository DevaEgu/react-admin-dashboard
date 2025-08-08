import React from 'react';

const Pagination = () => {
  return (
    <div className="flex justify-end mt-4 gap-2">
      <button className="px-2 py-1 border rounded">&lt;</button>
      {[1, 2, 3, '...', 8].map((p, i) => (
        <button key={i} className={`px-3 py-1 rounded ${p === 1 ? 'bg-yellow-600 text-white' : 'border'}`}>{p}</button>
      ))}
      <button className="px-2 py-1 border rounded">&gt;</button>
    </div>
  );
};

export default Pagination;