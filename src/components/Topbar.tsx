import React from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
const Topbar = () => {
  const { user, logout } = useAuthStore();
  console.log("User: ", user)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow">
      <div></div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          🔔
        </button>
            {user ? (
          <div className="flex items-center gap-2">
           <UserAvatar user={user} />
            <div>
              <p className="text-sm font-semibold">{user.fullName || 'Unknown User'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          // Show a placeholder or a login button if no user is logged in
          <p className="text-sm text-gray-500">Not Logged In</p>
        )}
      </div>
    </header>
  );
};

export default Topbar;