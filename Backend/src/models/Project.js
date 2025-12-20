import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required.'],
      trim: true,
      minlength: [3, 'Project name must be at least 3 characters.'],
      maxlength: [120, 'Project name must be at most 120 characters.'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required.'],
      trim: true,
      minlength: [10, 'Project description must be at least 10 characters.'],
      maxlength: [2000, 'Project description must be at most 2000 characters.'],
    },
    imagePath: {
      type: String,
      required: [true, 'Project imagePath is required.'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Project', projectSchema)
