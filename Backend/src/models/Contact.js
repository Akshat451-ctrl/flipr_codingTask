import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required.'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters.'],
      maxlength: [120, 'Full name must be at most 120 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      minlength: [6, 'Email must be at least 6 characters.'],
      maxlength: [254, 'Email must be at most 254 characters.'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email.'],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile is required.'],
      trim: true,
      minlength: [8, 'Mobile must be at least 8 characters.'],
      maxlength: [20, 'Mobile must be at most 20 characters.'],
    },
    city: {
      type: String,
      required: [true, 'City is required.'],
      trim: true,
      minlength: [2, 'City must be at least 2 characters.'],
      maxlength: [80, 'City must be at most 80 characters.'],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message must be at most 2000 characters.'],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Contact', contactSchema)
