import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Quiz from './pages/Quiz';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to={user.admin ? "/admin" : "/dashboard"} />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={user.admin ? "/admin" : "/dashboard"} />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={user && user.admin ? <AdminDashboard /> : <Navigate to="/login" />} />
          
          {/* User Routes */}
          <Route path="/dashboard" element={user && !user.admin ? <UserDashboard /> : <Navigate to="/login" />} />
          <Route path="/dashboard/quiz" element={user && !user.admin ? <Quiz /> : <Navigate to="/login" />} />
          
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;