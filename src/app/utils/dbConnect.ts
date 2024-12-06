import mongoose from 'mongoose';

const dbConnect = async () => {
  // Check if MongoDB is already connected
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB is already connected');
    return;
  }

  const mongodbUri = process.env.MONGODB_URI || "mongodb+srv://zohebuddin25:zoheb@cluster0.hdiiy.mongodb.net/";
  if (!mongodbUri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }

  try {
    // Connect to MongoDB without the deprecated options
    await mongoose.connect(mongodbUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Instead of exiting the process, we can log the error and throw it if needed
    throw new Error('MongoDB connection failed');
  }
};

export default dbConnect;
