import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import CourseTable from '../components/CourseTable';

const CourseManagement = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#f7f8fc]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Course Management</h1>
          <CourseTable />
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;