import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../main';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Temporarily bypass the login authentication and mock the login
            setIsAuthenticated(true);  // Mock the login state
            
            // Instead of making a backend request, we mock the success
            toast.success('Successfully logged in (Mock)');
            
            // Redirect to home or dashboard
            navigateTo('/');

            // Reset email and password fields
            setEmail('');
            setPassword('');
        } catch (error) {
            toast.error('Login failed (Mock)');
        }
    };

    // If already authenticated, redirect to the home/dashboard
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <section className='container form-component'>
                <img src='/logo.png' alt='logo' className='logo' />
                <h1 className='form-title'>WELCOME TO ZEECARE</h1>
                <p>Only Admins Are Allowed To Access These Resources!</p>
                <form onSubmit={handleLogin}>
                    <input
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;
