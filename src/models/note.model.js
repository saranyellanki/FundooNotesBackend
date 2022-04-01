import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    Title: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    Color: {
        type: String,
    },
    isArchieved: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('Notes', noteSchema);