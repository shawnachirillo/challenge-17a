import { Request, Response } from 'express';
import { Thought } from '../models/Thought';
import { User } from '../models/User';

// GET all thoughts
export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET a single thought
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST create a thought + push to user's thoughts array
export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thought.create(req.body);

    // Push thought to user
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

// PUT update thought
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

// DELETE thought
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const deleted = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!deleted) return res.status(404).json({ message: 'Thought not found' });

    // Remove from user's thoughts
    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );

    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST add reaction to a thought
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

// DELETE reaction from a thought
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
