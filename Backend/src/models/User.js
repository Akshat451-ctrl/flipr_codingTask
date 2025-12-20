import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: [true, 'Full name is required.'],
			trim: true,
			minlength: [2, 'Full name must be at least 2 characters.'],
		},
		email: {
			type: String,
			required: [true, 'Email is required.'],
			trim: true,
			lowercase: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: [true, 'Password is required.'],
		},
		role: {
			type: String,
			enum: ['admin'],
			default: 'admin',
		},
	},
	{ timestamps: true },
)

userSchema.index({ email: 1 }, { unique: true })

export default mongoose.model('User', userSchema)
