import { Router, RequestHandler } from 'express';
import {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} from '../controller/thoughtController';

const router = Router();

router.route('/')
  .get(getThoughts)
  .post(createThought);

const fetchSingleThought: RequestHandler = async (req, res) => {

    try {
  
      // Your existing logic
  
    } catch (error) {
  
      res.status(500).json({ error: 'Internal Server Error' });
  
    }
  
  };

const handleUpdateThought: RequestHandler = async (req, res) => {

    try {
  
      // Your existing logic
  
      res.status(200).json({ message: 'Thought updated successfully' });
  
    } catch (error) {
  
      res.status(500).json({ error: 'Internal Server Error' });
  
    }
  
  };

const handleDeleteThought: RequestHandler = async (req, res) => {

    try {
  
      // Your existing logic
  
      res.status(200).json({ message: 'Thought deleted successfully' });
  
    } catch (error) {
  
      res.status(500).json({ error: 'Internal Server Error' });
  
    }
  
  };

router.route('/:thoughtId')
  .get(fetchSingleThought)
  .put(handleUpdateThought)
  .delete(handleDeleteThought);

const handleAddReaction: RequestHandler = async (req, res) => {

    try {
  
      // Your existing logic
  
      res.status(200).json({ message: 'Reaction added successfully' });
  
    } catch (error) {
  
      res.status(500).json({ error: 'Internal Server Error' });
  
    }
  
  };

router.route('/:thoughtId/reactions')
  .post(handleAddReaction);
  

router.route('/:thoughtId/reactions/:reactionId')
  .delete(async (req, res) => {
    try {
      await removeReaction(req, res);
      res.status(200).json({ message: 'Reaction removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;
