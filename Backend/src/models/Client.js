import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required.'],
      trim: true,
      minlength: [2, 'Client name must be at least 2 characters.'],
      maxlength: [120, 'Client name must be at most 120 characters.'],
    },
    designation: {
      type: String,
      required: [true, 'Client designation is required.'],
      trim: true,
      minlength: [2, 'Designation must be at least 2 characters.'],
      maxlength: [120, 'Designation must be at most 120 characters.'],
    },
    description: {
      type: String,
      required: [true, 'Client description is required.'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters.'],
      maxlength: [1200, 'Description must be at most 1200 characters.'],
    },
    imagePath: {
      type: String,
      required: [true, 'Client imagePath is required.'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Client', clientSchema)
