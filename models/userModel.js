import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userModel);
