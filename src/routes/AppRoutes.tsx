import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import useAuthStore from '../store/authStore';
import SignIn from '../components/SignIn';
import CourseManagement from '../pages/CourseManagement';
import StudentManagement from '../pages/StudentManagement';
import UstazManagement from '../pages/UstazManagement';
import AttendanceManagement from '../pages/AttendanceManagement';
import RequestManagement from '../pages/RequestManagement';
import PaymentManagement from '../pages/PaymentManagement';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes: React.FC = () => {
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />

        <Route path="/courses" element={<ProtectedRoute><CourseManagement /></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute><StudentManagement /></ProtectedRoute>} />
        <Route path="/ustazs" element={<ProtectedRoute><UstazManagement /></ProtectedRoute>} />
        <Route path="/attendance" element={<ProtectedRoute><AttendanceManagement /></ProtectedRoute>} />
        <Route path="/requests" element={<ProtectedRoute><RequestManagement /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><PaymentManagement /></ProtectedRoute>} />

        <Route path="/" element={<Navigate to="/courses" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
