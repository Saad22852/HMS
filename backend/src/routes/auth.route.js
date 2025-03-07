import { Router } from 'express';
import {
    register,
    login,
    adminRegister,
    getDoctors,
    getUserDetails,
    logoutAdmin,
    logoutPatient,
    addDoctor,
} from '../controllers/auth.controller.js';
import {
    isAdminLoggedIn,
    isPatientLoggedIn,
} from '../middlewares/authentication.js';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Admin routes
router.post('/admin/register', isAdminLoggedIn, adminRegister); // Protected for Admin
router.get('/admin/me', isAdminLoggedIn, getUserDetails);
router.get('/admin/logout', isAdminLoggedIn, logoutAdmin);
router.post('/doctor/register', isAdminLoggedIn, addDoctor);

// Patient routes
router.get('/patient/me', isPatientLoggedIn, getUserDetails);
router.get('/patient/logout', isPatientLoggedIn, logoutPatient);
router.get('/doctor', getDoctors);  

export default router;
