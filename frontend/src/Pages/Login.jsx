import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../main';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
    const { setIsAuthenticated, setAdmin } = useContext(Context); // Include setAdmin here
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Admin'); // Default role is Admin
    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                'http://localhost:5000/api/v1/auth/login',
                { email, password, role }, // Sending role to the backend
                {
                    withCredentials: true, // Ensures cookies are sent with the request
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            // Update context and notify user on successful login
            toast.success(data.message || 'Login successful');
            setIsAuthenticated(true);
            setAdmin(data.user); // Assuming `data.user` contains admin info
            navigateTo('/'); // Redirect to the dashboard
        } catch (error) {
            // Handle login failure
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container form-component login-form">
                <h2>Sign In</h2>
                <p>Please Login To Continue</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="Admin">Admin</option>
                        <option value="Patient">Patient</option>
                    </select>
                    <div>
                        <p>Not Registered?</p>
                        <Link to="/register">Register Now</Link>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
