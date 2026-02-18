import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://quiz-app-be-six.vercel.app/users/signup', {
                username, password, admin: isAdmin
            });
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed!');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="card p-4 shadow-sm" style={{ width: '350px' }}>
                <h3 className="text-center mb-4">Register</h3>
                {error && <div className="alert alert-danger p-2">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label>Username</label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="adminCheck" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                        <label className="form-check-label" htmlFor="adminCheck">Register as Admin</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>
                    <div className="text-center">
                        <Link to="/login" style={{ textDecoration: 'none' }}>Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;