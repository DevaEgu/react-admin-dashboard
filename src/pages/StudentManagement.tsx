import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StudentTable from '../components/StudentTable';

const StudentManagement = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#f7f8fc]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Student Management</h1>
          <StudentTable />
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
