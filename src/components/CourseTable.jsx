import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/courses');
      const transformedData = response.data.map(course => ({
        _id: course._id,
        name: course.courseName,
        instructor: course.fullName,
        type: course.courseType,
        schedule: course.courseSchedule,
        status: course.courseStatus,
        instructorImage: course.profilePicture
      }));
      setCourses(transformedData);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  fetchCourses();
}, []);

  const filteredCourses = courses.filter(course =>
    course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-6">Loading courses...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search course"
          className="border px-3 py-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <select className="border px-2 py-1 rounded">
            <option>Instructor</option>
            {/* You can populate this dynamically from courses data */}
            {[...new Set(courses.map(course => course.instructor))].map(instructor => (
              <option key={instructor} value={instructor}>{instructor}</option>
            ))}
          </select>
          <select className="border px-2 py-1 rounded">
            <option>Course Type</option>
            {/* Dynamic course types */}
            {[...new Set(courses.map(course => course.type))].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select className="border px-2 py-1 rounded">
            <option>Price</option>
            {/* You could add price ranges here */}
          </select>
          <button className="bg-[#8b6c2d] text-white px-4 py-2 rounded">
            Add New Course
          </button>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-yellow-100 text-left">
          <tr>
            <th className="p-2">Course ID</th>
            <th className="p-2">Course Name</th>
            <th className="p-2">Course Instructor</th>
            <th className="p-2">Course Type</th>
            <th className="p-2">Course Schedule</th>
            <th className="p-2">Course Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <tr key={course._id} className="border-t">
                <td className="p-2">{course._id || course.id}</td>
                <td className="p-2">{course.name}</td>
                <td className="p-2 flex items-center gap-2">
                  <img 
                    src={course.instructorImage || '/avatar.png'} 
                    className="w-6 h-6 rounded-full" 
                    alt="Instructor" 
                  />
                  {course.instructor}
                </td>
                <td className="p-2">{course.type}</td>
                <td className="p-2">{course.schedule}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-white text-xs ${
                    course.status === 'Started' ? 'bg-green-400' : 'bg-red-400'
                  }`}>
                    {course.status}
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
              <td colSpan="7" className="p-4 text-center">No courses found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default CourseTable;