import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseManagement from './pages/CourseManagement';
import StudentManagement from './pages/StudentManagement';
import UstazManagement from './pages/UstazManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import RequestManagement from './pages/RequestManagement';
import PaymentManagement from './pages/PaymentManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/courses" element={<CourseManagement />} />
        <Route path="/students" element={<StudentManagement />} />
        <Route path="/ustazs" element={<UstazManagement />} />
        <Route path="/attendance" element={<AttendanceManagement />} />
        <Route path="/requests" element={<RequestManagement />} />
        <Route path="/payment" element={<PaymentManagement />} />
  

        <Route path="*" element={<CourseManagement />} /> {/* Default route */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
