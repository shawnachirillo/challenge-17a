import { Request, Response } from 'express';
import { Thought } from '../models/Thought';
import { User } from '../models/User';

export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const { thoughtText, username, userId } = req.body;
    const newThought = await Thought.create({ thoughtText, username });
    await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    res.status(201).json(newThought);
  } catch (err) {
    console.error('[createThought error]', err);
    res.status(400).json(err);
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const updated = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Thought not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const deleted = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deleted) return res.status(404).json({ message: 'Thought not found' });
    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const updated = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Thought not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  try {
    const updated = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $pull: { reactions: { reactionId: req.params.reactionId } }
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Thought not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};
