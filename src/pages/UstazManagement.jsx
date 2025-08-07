import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import UstazTable from '../components/UstazTable';

const UstazManagement = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#f7f8fc]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Ustaz Management</h1>
          <UstazTable />
        </div>
      </div>
    </div>
  );
};

export default UstazManagement;
