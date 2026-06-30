import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import clothingRoutes from './routes/clothing.js';
import swapRoutes from './routes/swaps.js';
import messageRoutes from './routes/messages.js';
import locationRoutes from './routes/location.js';
import adminRoutes from './routes/admin.js';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Clothing Swap Marketplace API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/clothing', clothingRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

export default app;
