import CustomError from '../middlewares/customError.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userSchema.js';
import validator from 'validator';
import cloudinary from 'cloudinary';
import jwt from 'jsonwebtoken';

// Generate authentication token
export const generateAuthToken = (user, message, statusCode, res) => {
    const token = jwt.sign(
        { id: user._id, role: user.role }, // Payload
        process.env.JWT_SECRET,           // Secret Key
        { expiresIn: '1d' }               // Valid Expiration Format
    );

    res.status(statusCode).json({
        success: true,
        message,
        token,
        user,
    });
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, password, role, dob, gender } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !role || !dob || !gender) {
        throw new CustomError('Please fill all fields', 400);
    }

    if (password.length < 8) {
        throw new CustomError('Password should have at least 8 characters', 400);
    }

    if (phone.length !== 10) {
        throw new CustomError('Phone number should have 10 characters', 400);
    }

    if (!validator.isEmail(email)) {
        throw new CustomError('Please enter a valid email', 400);
    }

    let user = await User.findOne({ email });
    if (user) {
        throw new CustomError(`${user.role} already exists with the same email!`, 400);
    }

    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        role,
        dob,
        gender,
    });

    user.password = undefined;
    generateAuthToken(user, 'User registered successfully', 201, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        throw new CustomError('Please fill all fields', 400);
    }

    if (!validator.isEmail(email)) {
        throw new CustomError('Please enter a valid email', 400);
    }

    if (password.length < 8) {
        throw new CustomError('Password should have at least 8 characters', 400);
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new CustomError('Invalid email or password', 404);
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        throw new CustomError('Password does not match!', 401);
    }

    if (user.role !== role) {
        throw new CustomError('You are not authorized!', 401);
    }

    user.password = undefined;
    generateAuthToken(user, 'User logged in successfully', 200, res);
});

// @desc    Admin registration
// @route   POST /api/v1/auth/admin/register
// @access  Public
export const adminRegister = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, password, dob, gender } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !dob || !gender) {
        throw new CustomError('Please fill all fields', 400);
    }

    if (password.length < 8) {
        throw new CustomError('Password should have at least 8 characters', 400);
    }

    if (phone.length !== 10) {
        throw new CustomError('Phone number should have 10 characters', 400);
    }

    if (!validator.isEmail(email)) {
        throw new CustomError('Please enter a valid email', 400);
    }

    let admin = await User.findOne({ email });
    if (admin) {
        throw new CustomError(`${admin.role} already exists with the same email!`, 400);
    }

    admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        dob,
        gender,
        role: 'Admin',
    });

    admin.password = undefined;
    generateAuthToken(admin, 'Admin registered successfully', 201, res);
});

// @desc    Get all doctors
// @route   GET /api/v1/auth/doctors
// @access  Private
export const getDoctors = async (req, res, next) => {
    try {
        const doctors = await User.find(
            { role: 'Doctor' },
            'firstName lastName doctorDepartment'
        );

        res.status(200).json({ success: true, doctors });
    } catch (error) {
        next(error);
    }
};



// @desc    Get user details
// @route   GET /api/v1/auth/user
// @access  Private
export const getUserDetails = asyncHandler(async (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

// @desc    Logout admin
// @route   GET /api/v1/auth/logout
// @access  Private
export const logoutAdmin = asyncHandler(async (req, res) => {
    res.status(200).cookie('AdminToken', '', {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: 'Admin logged out successfully',
    });
});

// @desc    Logout patient
// @route   GET /api/v1/auth/logout
// @access  Private
export const logoutPatient = asyncHandler(async (req, res) => {
    res.status(200).cookie('PatientToken', '', {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: 'User logged out successfully',
    });
});

// @desc    Add new doctor
// @route   POST /api/v1/auth/doctor
// @access  Private
export const addDoctor = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, password, gender, dob } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob) {
        throw new CustomError('Please fill all fields', 400);
    }

    if (password.length < 8) {
        throw new CustomError('Password should have at least 8 characters', 400);
    }

    if (phone.length !== 10) {
        throw new CustomError('Phone number should have 10 characters', 400);
    }

    if (!validator.isEmail(email)) {
        throw new CustomError('Please enter a valid email', 400);
    }

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        role: 'Doctor',
        dob,
        gender,
        avatar: 'https://placehold.co/100x100' // Optional placeholder avatar
    });

    doctor.password = undefined;

    generateAuthToken(doctor, 'Doctor added successfully', 201, res);
});
