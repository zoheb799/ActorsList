import mongoose from 'mongoose';

const ActorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pictureUrl: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Actor || mongoose.model('Actor', ActorSchema);
