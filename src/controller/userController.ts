import { Request, Response } from 'express';
import { User } from '../models/User';
import { Thought } from '../models/Thought';

// GET all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('friends').populate('thoughts');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET a single user by ID
export const getSingleUser = async (req: Request, res: Response): Promise<void> => {

    try {
  
      const user = await User.findById(req.params.userId);
  
      if (!user) {
  
        res.status(404).json({ message: 'User not found' });
  
        return;
  
      }
  
      res.json(user);
  
    } catch (error) {
  
      res.status(500).json({ message: 'Server error' });
  
    }
  
  };
  

// POST (create) a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

// PUT (update) a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {

    try {
  
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
  
      if (!user) {
  
        res.status(404).json({ message: 'User not found' });
  
        return;
  
      }
  
      res.json(user);
  
    } catch (error) {
  
      res.status(500).json({ message: 'Server error', error });
  
    }
  
  };

// DELETE a user and their thoughts
export const deleteUser = async (req: Request, res: Response): Promise<void> => {

    try {
  
      // Your delete logic here
  
      res.status(200).send({ message: 'User deleted successfully' });
  
    } catch (error) {
  
      res.status(500).send({ error: 'Failed to delete user' });
  
    }
  
  };
  

// POST add friend
export const addFriend = async (req: Request, res: Response): Promise<void> => {

    try {
  
      // Your existing logic
  
      res.status(200).json({ message: 'Friend added successfully' });
  
    } catch (error) {
  
      res.status(500).json({ error: 'Failed to add friend' });
  
    }
  
  };

  export const removeFriend = (req: Request, res: Response): void => {

    // Add your implementation here
  
    res.send('Friend removed');
  
  };
  