import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user');
        
        // Filter out users with isUstaz: true and transform data
        const studentData = response.data
          .filter((user:any) => !user.isUstaz)
          .map((student:any) => ({
            _id: student._id,
            name: student.fullName,
            courseEnrolled: 0, // Initialize with 0 courses
            profileImage: student.profilePicture,
            status: 'active'
          }));
          
        setStudents(studentData);
        setLoading(false);
      } catch (err:any) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student:any) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase())
    // Removed courseEnrolled from search since it's always 0 for now
  );

  if (loading) return <div className="p-6">Loading students...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search student"
          className="border px-3 py-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <select className="border px-2 py-1 rounded">
            <option>Course Name</option>
          </select>
          <select className="border px-2 py-1 rounded">
            <option>Course Type</option>
          </select>
          <select className="border px-2 py-1 rounded">
            <option>Status</option>
          </select>
          <button className="bg-[#8b6c2d] text-white px-4 py-2 rounded">
            Add New Student
          </button>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-yellow-100 text-left">
          <tr>
            <th className="p-2">Student ID</th>
            <th className="p-2">Student Name</th>
            <th className="p-2">Courses Enrolled</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student:any) => (
              <tr key={student._id} className="border-t">
                <td className="p-2">{student._id}</td>
                <td className="p-2 flex items-center gap-2">
                  <img 
                    src={student.profileImage || '/avatar.png'} 
                    className="w-6 h-6 rounded-full" 
                    alt="Student" 
                  />
                  {student.name}
                </td>
                <td className="p-2">
                  <span className="px-2 py-1 rounded bg-gray-100 text-xs">
                    {student.courseEnrolled} {/* Shows 0 for now */}
                  </span>
                </td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-white text-xs ${
                    student.status === 'active' ? 'bg-green-300' : 'bg-red-300'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  <button className="text-blue-600">👁️</button>
                  <button className="text-red-600">🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default StudentTable;