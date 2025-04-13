import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route to confirm API is live
app.get('/', (req, res) => {
  res.send('🌐 API is working! Try /api/users or /api/thoughts');
});

// API routes
app.use('/api', routes);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB')
  .then(() => {
    console.log('🌱 Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
