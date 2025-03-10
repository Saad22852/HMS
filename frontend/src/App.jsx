import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Appointment from './Pages/Appointment';
import AboutUs from './Pages/AboutUs';
import Register from './Pages/Register';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Login from './Pages/Login';

// Set global Axios configuration
axios.defaults.baseURL = 'http://localhost:5000/api/v1/';
axios.defaults.withCredentials = true; // Allows cookies to be sent with requests

const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer />
                <ToastContainer position="top-center" />
            </Router>
        </>
    );
};

export default App;
