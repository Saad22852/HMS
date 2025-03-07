import asyncHandler from './asyncHandler.js';
import CustomError from './customError.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import User from '../models/userSchema.js';

// Admin middleware with bypass
export const isAdminLoggedIn = asyncHandler(async (req, res, next) => {
    // Temporary bypass
    req.user = { id: 'mockAdminId', role: 'Admin', name: 'Mock Admin' };
    console.log("Bypassing Admin Authentication - Mock Admin logged in");
    next();

    /* Uncomment this block to restore original authentication
    const token = req.cookies.AdminToken;
    if (!token) {
        throw new CustomError('Admin Not authorized to access this route', 401);
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user || user.role !== 'Admin') {
            throw new CustomError('Invalid or expired Admin token', 403);
        }
        req.user = user;
        next();
    } catch (error) {
        throw new CustomError('Token verification failed', 401);
    }
    */
});

// Patient middleware with bypass
export const isPatientLoggedIn = asyncHandler(async (req, res, next) => {
    // Temporary bypass
    req.user = { id: 'mockPatientId', role: 'Patient', name: 'Mock Patient' };
    console.log("Bypassing Patient Authentication - Mock Patient logged in");
    next();

    /* Uncomment this block to restore original authentication
    const token = req.cookies.PatientToken;
    if (!token) {
        throw new CustomError('Patient Not authorized to access this route', 401);
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user || user.role !== 'Patient') {
            throw new CustomError('Invalid or expired Patient token', 403);
        }
        req.user = user;
        next();
    } catch (error) {
        throw new CustomError('Token verification failed', 401);
    }
    */
});
