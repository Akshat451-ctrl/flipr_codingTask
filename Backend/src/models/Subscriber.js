import mongoose from 'mongoose'

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      unique: true,
      minlength: [6, 'Email must be at least 6 characters.'],
      maxlength: [254, 'Email must be at most 254 characters.'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email.'],
    },
  },
  {
    timestamps: true,
  },
)

subscriberSchema.index({ email: 1 }, { unique: true })

export default mongoose.model('Subscriber', subscriberSchema)
