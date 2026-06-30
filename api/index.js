import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRoutes from './routes/auth.js';
import clothingRoutes from './routes/clothing.js';
import swapRoutes from './routes/swaps.js';
import messageRoutes from './routes/messages.js';
import locationRoutes from './routes/location.js';
import adminRoutes from './routes/admin.js';
import sql from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Clothing Swap Marketplace API' });
});

// Temporary seed endpoint - DELETE AFTER USE
app.post('/api/seed', async (req, res) => {
  try {
    console.log('Re-seeding database...');
    const schema = readFileSync(join(__dirname, '..', 'scripts', 'schema.sql'), 'utf-8');
    await sql.unsafe(schema);

    const users = [
      { username: 'priya_sharma', email: 'priya@example.com', password: 'password123', full_name: 'Priya Sharma', location: 'Mumbai', phone: '9876543210', bio: 'Fashion enthusiast who loves sustainable living.' },
      { username: 'rahul_verma', email: 'rahul@example.com', password: 'password123', full_name: 'Rahul Verma', location: 'Delhi', phone: '9876543211', bio: 'Casual wear collector. Always up for a good swap!' },
      { username: 'ananya_patel', email: 'ananya@example.com', password: 'password123', full_name: 'Ananya Patel', location: 'Bangalore', phone: '9876543212', bio: 'Ethnic wear lover. Ready to exchange!' }
    ];

    for (const u of users) {
      const hash = bcrypt.hashSync(u.password, 10);
      await sql`INSERT INTO users (username, email, password_hash, full_name, location, phone, bio) VALUES (${u.username}, ${u.email}, ${hash}, ${u.full_name}, ${u.location}, ${u.phone}, ${u.bio})`;
    }

    const items = [
      { user_id: 1, title: 'Zara Floral Summer Dress', type: 'Dress', brand: 'Zara', size: 'M', condition: 'Like New', description: 'Beautiful floral dress, worn only twice. Perfect for summer outings.', estimated_value: 2500, location: 'Mumbai', image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop' },
      { user_id: 1, title: 'H&M Denim Jacket', type: 'Jacket', brand: 'H&M', size: 'S', condition: 'Good', description: 'Classic denim jacket in great condition. Slightly faded for a vintage look.', estimated_value: 1800, location: 'Mumbai', image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
      { user_id: 1, title: 'Uniqlo Cotton T-Shirt', type: 'T-Shirt', brand: 'Uniqlo', size: 'M', condition: 'Excellent', description: 'Soft cotton tee in navy blue. Barely worn.', estimated_value: 800, location: 'Mumbai', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
      { user_id: 1, title: "Levi's 501 Jeans", type: 'Pants', brand: "Levi's", size: '30', condition: 'Good', description: 'Classic straight-fit jeans. Comfortable and stylish.', estimated_value: 2200, location: 'Mumbai', image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
      { user_id: 2, title: 'Nike Dri-FIT Running Shirt', type: 'T-Shirt', brand: 'Nike', size: 'L', condition: 'Like New', description: 'High-performance running shirt. Moisture-wicking fabric.', estimated_value: 1500, location: 'Delhi', image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
      { user_id: 2, title: 'Puma Track Pants', type: 'Pants', brand: 'Puma', size: 'L', condition: 'Good', description: 'Comfortable track pants for workouts or casual wear.', estimated_value: 1200, location: 'Delhi', image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop' },
      { user_id: 2, title: 'Allen Solly Formal Shirt', type: 'Shirt', brand: 'Allen Solly', size: 'M', condition: 'Excellent', description: 'Crisp white formal shirt. Perfect for office wear.', estimated_value: 1400, location: 'Delhi', image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop' },
      { user_id: 2, title: 'Ray-Ban Aviator Sunglasses', type: 'Accessory', brand: 'Ray-Ban', size: 'One Size', condition: 'Like New', description: 'Iconic aviator sunglasses with UV protection.', estimated_value: 3500, location: 'Delhi', image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop' },
      { user_id: 3, title: 'FabIndia Silk Kurti', type: 'Kurti', brand: 'FabIndia', size: 'M', condition: 'Excellent', description: 'Handwoven silk kurti with intricate embroidery.', estimated_value: 2800, location: 'Bangalore', image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop' },
      { user_id: 3, title: 'Biba Printed Palazzo', type: 'Pants', brand: 'Biba', size: 'S', condition: 'Good', description: 'Comfortable palazzo with beautiful print. Great for daily wear.', estimated_value: 900, location: 'Bangalore', image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop' },
      { user_id: 3, title: 'Only Blazer', type: 'Jacket', brand: 'Only', size: 'M', condition: 'Like New', description: 'Professional blazer in charcoal grey. Perfect for work.', estimated_value: 2400, location: 'Bangalore', image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop' },
      { user_id: 3, title: 'Forever 21 Crop Top', type: 'T-Shirt', brand: 'Forever 21', size: 'S', condition: 'Good', description: 'Trendy crop top in pastel pink. Perfect for casual outings.', estimated_value: 600, location: 'Bangalore', image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop' }
    ];

    for (const i of items) {
      await sql`INSERT INTO clothing_items (user_id, title, type, brand, size, condition, description, estimated_value, location, image_url) VALUES (${i.user_id}, ${i.title}, ${i.type}, ${i.brand}, ${i.size}, ${i.condition}, ${i.description}, ${i.estimated_value}, ${i.location}, ${i.image_url})`;
    }

    res.json({ success: true, message: 'Database seeded with 3 users and 12 items with images' });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: error.message });
  }
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
