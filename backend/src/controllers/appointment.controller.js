import asyncHandler from '../middlewares/asyncHandler.js';
import CustomError from '../middlewares/customError.js';
import Appointment from '../models/appointmentSchema.js';
import validator from 'validator';

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Public

export const createAppointment = asyncHandler(async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		phone,
		dob,
		gender,
		appointmentDate,
		department,
		hasVisisted,
		address,
	} = req.body;

	// check all fields are filled (no doctor fields required)
	if (
		!firstName ||
		!lastName ||
		!email ||
		!phone ||
		!dob ||
		!gender ||
		!appointmentDate ||
		!department ||
		!address
	) {
		throw new CustomError('Please fill in all fields', 400);
	}

	// validate email format
	if (!validator.isEmail(email)) {
		throw new CustomError('Please enter a valid email', 400);
	}

	// validate phone number length (optional if not needed)
	if (phone.length !== 10) {
		throw new CustomError('Phone number should have 10 characters', 400);
	}

	// Create the appointment (without doctor details)
	const appointment = await Appointment.create({
		firstName,
		lastName,
		email,
		phone,
		dob,
		gender,
		appointmentDate,
		department,
		hasVisisted,
		address,
	});

	res.status(201).json({
		success: true,
		message: 'Appointment sent successfully',
		appointment,
	});
});

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private

export const getAppointments = asyncHandler(async (req, res) => {
	const appointments = await Appointment.find();

	res.status(200).json({
		success: true,
		appointments,
	});
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
	const { id } = req.params;
	let appointment = await Appointment.findById(id);

	if (!appointment) {
		throw new CustomError('Appointment not found', 404);
	}

	appointment = await Appointment.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		message: 'Appointment updated successfully',
		appointment,
	});
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private

export const deleteAppointment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const appointment = await Appointment.findByIdAndDelete(id);

	if (!appointment) {
		throw new CustomError('Appointment not found', 404);
	}

	res.status(200).json({
		success: true,
		message: 'Appointment deleted successfully',
	});
});
