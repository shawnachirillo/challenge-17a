// src/models/Reaction.ts
import { Schema, Types } from 'mongoose';
import dayjs from 'dayjs';

export const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => dayjs(timestamp).format('MMM D, YYYY [at] h:mm A'),
  },
}, {
  toJSON: { getters: true },
  id: false,
});
