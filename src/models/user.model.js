import pkg from 'mongoose';
const { Schema, model } = pkg;

const userSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
