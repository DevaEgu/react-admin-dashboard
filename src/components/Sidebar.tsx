import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Students', path: '/students' },
  { label: 'Ustazs', path: '/ustazs' },
  { label: 'Attendance', path: '/attendance' },
  { label: 'Requests', path: '/requests' },
  { label: 'Payment', path: '/payment' },
  { label: 'Staff', path: '/staff' },
  { label: 'Role', path: '/role' },
  { label: 'Profile', path: '/profile' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-60 bg-[#8b6c2d] text-white min-h-screen">
      <div className="p-4 text-center">
        <img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-20 h-20" />
      </div>
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`block px-6 py-2 hover:bg-[#a07f40] ${
              location.pathname === item.path ? 'bg-white text-[#8b6c2d]' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
