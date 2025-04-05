import { Router } from 'express';
import userRoutes from './userRoutes';
// import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

router.get('/ping', (req, res) => {
    res.send('Server is alive 🧠');
  });
  
export default router;
