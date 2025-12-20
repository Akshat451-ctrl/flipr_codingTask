import mongoose from 'mongoose'

async function connectDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error('MONGO_URI is missing. Set it in Backend/.env')
  }

  mongoose.set('strictQuery', true)

  await mongoose.connect(mongoUri)

  return mongoose.connection
}

export { connectDatabase }
