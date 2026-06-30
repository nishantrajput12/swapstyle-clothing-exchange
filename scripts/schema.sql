-- Drop existing tables
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS swap_requests CASCADE;
DROP TABLE IF EXISTS clothing_items CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  phone VARCHAR(20),
  bio TEXT,
  profile_image VARCHAR(500),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clothing items table
CREATE TABLE clothing_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  size VARCHAR(20) NOT NULL,
  condition VARCHAR(50) NOT NULL,
  description TEXT,
  estimated_value INTEGER NOT NULL,
  location VARCHAR(100),
  image_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Swap requests table
CREATE TABLE swap_requests (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sender_item_id INTEGER NOT NULL REFERENCES clothing_items(id) ON DELETE CASCADE,
  receiver_item_id INTEGER NOT NULL REFERENCES clothing_items(id) ON DELETE CASCADE,
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  swap_id INTEGER NOT NULL REFERENCES swap_requests(id) ON DELETE CASCADE,
  sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_clothing_user_id ON clothing_items(user_id);
CREATE INDEX idx_clothing_status ON clothing_items(status);
CREATE INDEX idx_clothing_type ON clothing_items(type);
CREATE INDEX idx_swap_sender ON swap_requests(sender_id);
CREATE INDEX idx_swap_receiver ON swap_requests(receiver_id);
CREATE INDEX idx_swap_status ON swap_requests(status);
CREATE INDEX idx_messages_swap ON messages(swap_id);
