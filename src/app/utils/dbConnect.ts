import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  const mongodbUri = process.env.MONGODB_URI || "mongodb+srv://zohebuddin25:zoheb@cluster0.hdiiy.mongodb.net/";
  if (!mongodbUri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }

  try {
    const connection = await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default dbConnect;
