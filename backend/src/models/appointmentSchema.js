import mongoose from 'mongoose';
import validator from 'validator';

const appointmentSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'First name is required'],
			trim: true,
			maxlength: [50, 'First name cannot exceed 50 characters'],
			minlength: [3, 'First name should have at least 3 characters'],
		},
		lastName: {
			type: String,
			required: [true, 'Last name is required'],
			trim: true,
			maxlength: [50, 'Last name cannot exceed 50 characters'],
			minlength: [3, 'Last name should have at least 3 characters'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			trim: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please enter a valid email'],
		},
		phone: {
			type: String,
			required: [true, 'Phone is required'],
			trim: true,
			maxlength: [10, 'Phone number should have 10 characters'],
			minlength: [10, 'Phone number should have 10 characters'],
		},
		dob: {
			type: Date,
			required: [true, 'Date of birth is required'],
		},
		gender: {
			type: String,
			enum: ['Male', 'Female', 'Other'],
			required: [true, 'Gender is required'],
		},
		appointmentDate: {
			type: String,
			required: [true, 'Appointment date is required'],
		},
		department: {
			type: String,
			required: [true, 'Department is required'],
		},
		hasVisited: {
			type: Boolean,
			default: false,
		},
		address: {
			type: String,
			required: [true, 'Address is required'],
			trim: true,
			maxlength: [100, 'Address cannot exceed 100 characters'],
			minlength: [10, 'Address should have at least 10 characters'],
		},
		status: {
			type: String,
			enum: ['Pending', 'Accepted', 'Rejected'],
			default: 'Pending',
		},
	},
	{ timestamps: true, versionKey: false }
);

export default mongoose.model('Appointment', appointmentSchema);
