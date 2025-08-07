import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const RequestTable = () => {
  const [ustazData, setUstazData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUstaz = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user');
        const transformedData = response.data
          .filter(user => user.isUstaz)
          .map(ustaz => ({
            id: ustaz._id,
            name: ustaz.fullName,
            courseEnrolled: ustaz.specialization || 'Not specified',
            experience: ustaz.experience || '0 years',
            request: ['Approved', 'Pending', 'Rejected'][Math.floor(Math.random() * 3)],
            profileImage: ustaz.profilePicture || '/avatar.png'
          }));
        setUstazData(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchUstaz();
  }, []);

  const filteredUstaz = ustazData.filter(ustaz =>
    ustaz.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ustaz.courseEnrolled?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-6">Loading requests...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      {/* ... (keep existing JSX structure) ... */}
      <tbody>
        {filteredUstaz.map((ustaz) => (
          <tr key={ustaz.id} className="border-t">
            <td className="p-2">{ustaz.id}</td>
            <td className="p-2 flex items-center gap-2">
              <img src={ustaz.profileImage} className="w-6 h-6 rounded-full" alt="Ustaz" />
              {ustaz.name}
            </td>
            <td className="p-2">{ustaz.courseEnrolled}</td>
            <td className="p-2">{ustaz.experience}</td>
            <td className="p-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                ustaz.request === 'Approved' ? 'bg-green-100 text-green-300' : 
                ustaz.request === 'Pending' ? 'bg-yellow-100 text-yellow-300' : 
                'bg-red-100 text-red-300'
              }`}>
                {ustaz.request}
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

export default RequestTable;