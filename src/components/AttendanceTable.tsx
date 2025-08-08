import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const AttendanceTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user');
        const studentData = response.data
          .filter((user:any )=> !user.isUstaz)
          .map((student:any) => ({
            id: student._id,
            name: student.fullName,
            course: student.specialization || 'Not enrolled',
            enrolledDate: new Date().toLocaleDateString(),
            attendance: Math.random() > 0.5 ? 'Present' : 'Absent',
            profileImage: student.profilePicture || '/avatar.png'
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
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-6">Loading attendance...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      {/* ... (keep existing JSX structure) ... */}
      <tbody>
        {filteredStudents.map((student:any) => (
          <tr key={student.id} className="border-t">
            <td className="p-2">{student.id}</td>
            <td className="p-2 flex items-center gap-2">
              <img src={student.profileImage} className="w-6 h-6 rounded-full" alt="Student" />
              {student.name}
            </td>
            <td className="p-2">{student.course}</td>
            <td className="p-2">{student.enrolledDate}</td>
            <td className="p-2">
              <span className={`px-2 py-1 rounded text-white text-xs ${
                student.attendance === 'Present' ? 'bg-green-300' : 'bg-red-300'
              }`}>
                {student.attendance}
              </span>
            </td>
            <td className="p-2 flex gap-2">
              <button className="text-blue-600">👁️</button>
              <button className="text-red-600">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default AttendanceTable;