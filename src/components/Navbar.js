import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Navbar = ({ title }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="fw-bold m-0">{title}</h1>
                <div className="text-secondary" style={{ fontSize: '1.1rem' }}>
                    Welcome, {user?.username}
                </div>
            </div>
            
            <div className="bg-light p-3 rounded-1 d-flex gap-4">
                {user?.admin ? (
                    <>
                        <Link to="/admin" className={`text-decoration-none ${location.pathname === '/admin' ? 'text-dark fw-bold' : 'text-secondary'}`}>Home</Link>
                        <Link to="/admin" className="text-decoration-none text-secondary">Manage Questions</Link>
                        <Link to="/admin" className="text-decoration-none text-secondary">Manage Articles</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" className={`text-decoration-none ${location.pathname === '/dashboard' ? 'text-dark fw-bold' : 'text-secondary'}`}>Home</Link>
                        <Link to="/dashboard/quiz" className={`text-decoration-none ${location.pathname === '/dashboard/quiz' ? 'text-dark fw-bold' : 'text-secondary'}`}>Quiz</Link>
                        <Link to="/dashboard" className="text-decoration-none text-secondary">Article</Link>
                    </>
                )}
                <span onClick={handleLogout} className="text-secondary" style={{ cursor: 'pointer' }}>Logout</span>
            </div>
        </div>
    );
};

export default Navbar;