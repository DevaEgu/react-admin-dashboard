import React from 'react';

const Topbar = () => {
  return (
    <header className="flex justify-between items-center bg-white p-4 shadow">
      <div></div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          🔔
        </button>
        <div className="flex items-center gap-2">
          <img src="/avatar.png" alt="Admin" className="w-8 h-8 rounded-full" />
          <div>
            <p className="text-sm font-semibold">Dawit Hailu</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;