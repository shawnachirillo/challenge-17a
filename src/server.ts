import express from 'express';
import mongoose from 'mongoose';
import { Router } from 'express';

const router = Router();
router.get('/', (req, res) => {

    res.send('API is working!');
  
  });
  
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
// We'll create this file soon
import routes from './routes';
app.use('/api', routes);

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB')
  .then(() => {
    console.log('🌱 Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

  export default router;
