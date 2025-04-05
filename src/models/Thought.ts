import mongoose, { Schema, Document } from 'mongoose';
import { ReactionSchema } from './Reaction';
import dayjs from 'dayjs';

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: typeof ReactionSchema[];
}

const ThoughtSchema: Schema<IThought> = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => dayjs(timestamp).format('MMM D, YYYY [at] h:mm A')
      } as any
      
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

export const Thought = mongoose.model<IThought>('Thought', ThoughtSchema);
