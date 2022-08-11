import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    })

    console.log(`mongo connect: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}