import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Gọi API đến Backend
            const response = await axios.post('https://quiz-app-be-six.vercel.app/users/login', {
                username,
                password
            });
            
            // Lưu thông tin user vào Redux
            dispatch(loginSuccess(response.data));
            
            // Chuyển hướng sang trang Dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed!');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="card p-4 shadow-sm" style={{ width: '350px' }}>
                <h3 className="text-center mb-4">Login</h3>
                
                {error && <div className="alert alert-danger p-2">{error}</div>}
                
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label>Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="John"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="***"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                    <div className="text-center">
                        <a href="/register" style={{textDecoration: 'none'}}>Don't have an account? Register here</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;