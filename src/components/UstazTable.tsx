import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const UstazTable = () => {
  const [ustazData, setUstazData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUstaz = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user');
        
        // Filter for isUstaz: true and transform data
        const transformedData = response.data
          .filter((user:any) => user.isUstaz)
          .map((ustaz:any) => ({
            id: ustaz._id,
            name: ustaz.fullName,
            experience: ustaz.experience || '0', // Use experience from API or default to 0
            status: ustaz.isUstaz ? 'Active' : 'Inactive',
            courseEnrolled: 0, // Placeholder until you have real course data
            profileImage: ustaz.profilePicture || '/avatar.png'
          }));

        setUstazData(transformedData);
        setLoading(false);
      } catch (err:any) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchUstaz();
  }, []);

  const filteredUstaz = ustazData.filter((ustaz:any) =>
    ustaz.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ustaz.experience?.toString().includes(searchTerm)
  );

  if (loading) return <div className="p-6">Loading ustaz...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search ustaz"
          className="border px-3 py-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <select className="border px-2 py-1 rounded">
            <option>Experience</option>
            {[...new Set(ustazData.map((u:any) => u.experience))].map(exp => (
              <option key={exp} value={exp}>{exp} years</option>
            ))}
          </select>
          <select className="border px-2 py-1 rounded">
            <option>Course</option>
            {/* Add dynamic courses when available */}
          </select>
          <select className="border px-2 py-1 rounded">
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="bg-[#8b6c2d] text-white px-4 py-2 rounded">
            Add New Ustaz
          </button>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-yellow-100 text-left">
          <tr>
            <th className="p-2">Ustaz ID</th>
            <th className="p-2">Ustaz Name</th>
            <th className="p-2">Teaching Experience (Yrs)</th>
            <th className="p-2">Status</th>
            <th className="p-2">Courses Enrolling</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUstaz.length > 0 ? (
            filteredUstaz.map((ustaz:any) => (
              <tr key={ustaz.id} className="border-t">
                <td className="p-2">{ustaz.id}</td>
                <td className="p-2 flex items-center gap-2">
                  <img 
                    src={ustaz.profileImage} 
                    className="w-6 h-6 rounded-full" 
                    alt="Ustaz" 
                  />
                  {ustaz.name}
                </td>
                <td className="p-2">{ustaz.experience}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-white text-xs ${
                    ustaz.status === 'Active' ? 'bg-green-300' : 'bg-red-300'
                  }`}>
                    {ustaz.status}
                  </span>
                </td>
                <td className="p-2">
                  <span className="px-2 py-1 rounded bg-gray-100 text-xs">
                    {ustaz.courseEnrolled}
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
              <td colSpan={6} className="p-4 text-center">No ustaz found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UstazTable;