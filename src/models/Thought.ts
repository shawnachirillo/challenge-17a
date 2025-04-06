import mongoose, { Schema, Document } from 'mongoose';
import { ReactionSchema } from './Reaction';
import dayjs from 'dayjs';

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: typeof ReactionSchema[];
}

const ThoughtSchema: Schema = new Schema(
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
      get: (timestamp: Date): string =>
        dayjs(timestamp).format('MMM D, YYYY [at] h:mm A')
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function (this: any) {
  return this.reactions.length;
});

export const Thought = mongoose.model<IThought>('Thought', ThoughtSchema);
