// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match a valid email address!'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, {
  toJSON: { virtuals: true },
  id: false,
});

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
