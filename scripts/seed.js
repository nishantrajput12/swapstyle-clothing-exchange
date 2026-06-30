import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_op6g4QtyYurK@ep-solitary-lab-atgggzjl-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = postgres(DB_URL, { ssl: 'require' });

async function seed() {
  console.log('Running schema...');
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  await sql.unsafe(schema);
  console.log('Schema created.');

  // Seed users
  console.log('Seeding users...');
  const users = [
    { username: 'priya_sharma', email: 'priya@example.com', password: 'password123', full_name: 'Priya Sharma', location: 'Mumbai', phone: '9876543210', bio: 'Fashion enthusiast who loves sustainable living.' },
    { username: 'rahul_verma', email: 'rahul@example.com', password: 'password123', full_name: 'Rahul Verma', location: 'Delhi', phone: '9876543211', bio: 'Casual wear collector. Always up for a good swap!' },
    { username: 'ananya_patel', email: 'ananya@example.com', password: 'password123', full_name: 'Ananya Patel', location: 'Bangalore', phone: '9876543212', bio: 'Ethnic wear lover. Ready to exchange!' }
  ];

  for (const u of users) {
    const hash = bcrypt.hashSync(u.password, 10);
    await sql`
      INSERT INTO users (username, email, password_hash, full_name, location, phone, bio)
      VALUES (${u.username}, ${u.email}, ${hash}, ${u.full_name}, ${u.location}, ${u.phone}, ${u.bio})
    `;
  }
  console.log('Users seeded.');

  // Seed clothing items
  console.log('Seeding clothing items...');
  const items = [
    { user_id: 1, title: 'Zara Floral Summer Dress', type: 'Dress', brand: 'Zara', size: 'M', condition: 'Like New', description: 'Beautiful floral dress, worn only twice. Perfect for summer outings.', estimated_value: 2500, location: 'Mumbai' },
    { user_id: 1, title: 'H&M Denim Jacket', type: 'Jacket', brand: 'H&M', size: 'S', condition: 'Good', description: 'Classic denim jacket in great condition. Slightly faded for a vintage look.', estimated_value: 1800, location: 'Mumbai' },
    { user_id: 1, title: 'Uniqlo Cotton T-Shirt', type: 'T-Shirt', brand: 'Uniqlo', size: 'M', condition: 'Excellent', description: 'Soft cotton tee in navy blue. Barely worn.', estimated_value: 800, location: 'Mumbai' },
    { user_id: 1, title: 'Levi\'s 501 Jeans', type: 'Pants', brand: 'Levi\'s', size: '30', condition: 'Good', description: 'Classic straight-fit jeans. Comfortable and stylish.', estimated_value: 2200, location: 'Mumbai' },
    { user_id: 2, title: 'Nike Dri-FIT Running Shirt', type: 'T-Shirt', brand: 'Nike', size: 'L', condition: 'Like New', description: 'High-performance running shirt. Moisture-wicking fabric.', estimated_value: 1500, location: 'Delhi' },
    { user_id: 2, title: 'Puma Track Pants', type: 'Pants', brand: 'Puma', size: 'L', condition: 'Good', description: 'Comfortable track pants for workouts or casual wear.', estimated_value: 1200, location: 'Delhi' },
    { user_id: 2, title: 'Allen Solly Formal Shirt', type: 'Shirt', brand: 'Allen Solly', size: 'M', condition: 'Excellent', description: 'Crisp white formal shirt. Perfect for office wear.', estimated_value: 1400, location: 'Delhi' },
    { user_id: 2, title: 'Ray-Ban Aviator Sunglasses', type: 'Accessory', brand: 'Ray-Ban', size: 'One Size', condition: 'Like New', description: 'Iconic aviator sunglasses with UV protection.', estimated_value: 3500, location: 'Delhi' },
    { user_id: 3, title: 'FabIndia Silk Kurti', type: 'Kurti', brand: 'FabIndia', size: 'M', condition: 'Excellent', description: 'Handwoven silk kurti with intricate embroidery.', estimated_value: 2800, location: 'Bangalore' },
    { user_id: 3, title: 'Biba Printed Palazzo', type: 'Pants', brand: 'Biba', size: 'S', condition: 'Good', description: 'Comfortable palazzo with beautiful print. Great for daily wear.', estimated_value: 900, location: 'Bangalore' },
    { user_id: 3, title: 'Only Blazer', type: 'Jacket', brand: 'Only', size: 'M', condition: 'Like New', description: 'Professional blazer in charcoal grey. Perfect for work.', estimated_value: 2400, location: 'Bangalore' },
    { user_id: 3, title: 'Forever 21 Crop Top', type: 'T-Shirt', brand: 'Forever 21', size: 'S', condition: 'Good', description: 'Trendy crop top in pastel pink. Perfect for casual outings.', estimated_value: 600, location: 'Bangalore' }
  ];

  for (const i of items) {
    await sql`
      INSERT INTO clothing_items (user_id, title, type, brand, size, condition, description, estimated_value, location)
      VALUES (${i.user_id}, ${i.title}, ${i.type}, ${i.brand}, ${i.size}, ${i.condition}, ${i.description}, ${i.estimated_value}, ${i.location})
    `;
  }
  console.log('Clothing items seeded.');

  console.log('Seed complete!');
  await sql.end();
}

seed().catch(err => { console.error(err); process.exit(1); });
