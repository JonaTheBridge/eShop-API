import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'client',
  },
  lastConnection: {
    type: Date,
    default: Date.now,
  },
});

const userModel = model('User', userSchema);

export default userModel;
