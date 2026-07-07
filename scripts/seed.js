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

  // Seed users with more realistic data
  console.log('Seeding users...');
  const users = [
    { 
      username: 'priya_sharma', 
      email: 'priya.sharma23@gmail.com', 
      password: 'password123', 
      full_name: 'Priya Sharma', 
      location: 'Mumbai, Maharashtra', 
      phone: '+91 98765 43210', 
      bio: 'Software engineer by day, fashion enthusiast by night. I love trying new styles and believe in sustainable fashion. Always looking to swap trendy pieces with fellow fashion lovers in Mumbai!' 
    },
    { 
      username: 'rahul_verma', 
      email: 'rahul.verma88@yahoo.com', 
      password: 'password123', 
      full_name: 'Rahul Verma', 
      location: 'Delhi', 
      phone: '+91 98765 43211', 
      bio: 'Graphic designer who appreciates both casual streetwear and formal attire. My wardrobe has grown too large, so I am excited to swap and refresh my collection. Based in South Delhi, happy to meet locally for exchanges.' 
    },
    { 
      username: 'ananya_patel', 
      email: 'ananya.patel@gmail.com', 
      password: 'password123', 
      full_name: 'Ananya Patel', 
      location: 'Bangalore, Karnataka', 
      phone: '+91 98765 43212', 
      bio: 'Marketing professional with a passion for ethnic wear and contemporary fusion styles. I have collected beautiful pieces from my travels across India and would love to swap with others who appreciate quality clothing. Located in Indiranagar, Bangalore.' 
    }
  ];

  for (const u of users) {
    const hash = bcrypt.hashSync(u.password, 10);
    await sql`
      INSERT INTO users (username, email, password_hash, full_name, location, phone, bio)
      VALUES (${u.username}, ${u.email}, ${hash}, ${u.full_name}, ${u.location}, ${u.phone}, ${u.bio})
    `;
  }
  console.log('Users seeded.');

  // Seed clothing items with more detailed descriptions
  console.log('Seeding clothing items...');
  const items = [
    { user_id: 1, title: 'Zara Floral Summer Dress', type: 'Dress', brand: 'Zara', size: 'M', condition: 'Like New', description: 'Bought this beautiful floral dress last summer for a beach vacation. Wore it only twice - once in Goa and once to a garden party. The fabric is lightweight and perfect for Indian weather. No stains or damage, just realized I need to declutter my wardrobe. Would love to swap for something in similar condition.', estimated_value: 2500, location: 'Mumbai', image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop' },
    { user_id: 1, title: 'H&M Denim Jacket', type: 'Jacket', brand: 'H&M', size: 'S', condition: 'Good', description: 'Classic denim jacket that goes with everything. I have had it for about a year and it has developed a nice vintage fade. Perfect for Mumbai winters or evening outings. There is minor wear on the cuffs but nothing noticeable. Looking to swap for a different style jacket.', estimated_value: 1800, location: 'Mumbai', image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
    { user_id: 1, title: 'Uniqlo Cotton T-Shirt', type: 'T-Shirt', brand: 'Uniqlo', size: 'M', condition: 'Excellent', description: 'Bought this navy blue cotton tee from Uniqlo during their sale. The fabric is incredibly soft and comfortable. I wore it maybe 3-4 times before realizing I have too many similar t-shirts. No wrinkles, no fading, looks brand new. Perfect basic piece for everyday wear.', estimated_value: 800, location: 'Mumbai', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
    { user_id: 1, title: 'Levi\'s 501 Jeans', type: 'Pants', brand: 'Levi\'s', size: '30', condition: 'Good', description: 'These are my go-to jeans - classic straight fit Levi\'s 501. I have worn them regularly for about 6 months so they have that perfect broken-in feel. The denim has faded nicely and they are super comfortable. Still in great condition with no tears or stains. Just looking to try a different style.', estimated_value: 2200, location: 'Mumbai', image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
    { user_id: 2, title: 'Nike Dri-FIT Running Shirt', type: 'T-Shirt', brand: 'Nike', size: 'L', condition: 'Like New', description: 'Purchased this for my morning runs but ended up joining a gym that provides workout gear. The Dri-FIT technology is amazing - keeps you dry even in Delhi humidity. Wore it maybe twice. Still has the original tags. Perfect for anyone into fitness or casual athletic wear.', estimated_value: 1500, location: 'Delhi', image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
    { user_id: 2, title: 'Puma Track Pants', type: 'Pants', brand: 'Puma', size: 'L', condition: 'Good', description: 'Comfortable Puma track pants that I wore during lockdown workouts. The elastic waistband and tapered fit make them perfect for both exercise and casual wear. There is some minor pilling on the inner thigh area but overall in good condition. Great for gym, jogging, or just lounging at home.', estimated_value: 1200, location: 'Delhi', image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop' },
    { user_id: 2, title: 'Allen Solly Formal Shirt', type: 'Shirt', brand: 'Allen Solly', size: 'M', condition: 'Excellent', description: 'Crisp white formal shirt from Allen Solly that I bought for a job interview. Got the job and wore it to a few meetings, but my company has a casual dress code so it has been sitting in my closet. Dry cleaned and stored properly. Perfect for office wear, interviews, or formal occasions.', estimated_value: 1400, location: 'Delhi', image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop' },
    { user_id: 2, title: 'Ray-Ban Aviator Sunglasses', type: 'Accessory', brand: 'Ray-Ban', size: 'One Size', condition: 'Like New', description: 'Classic Ray-Ban aviators with gold frame and green lenses. Bought them from Shoppers Stop with original case and cleaning cloth. Wore them a few times but I prefer wayfarer style. No scratches on lenses, frame is perfect. These are authentic with the Ray-Ban logo etched on the lens.', estimated_value: 3500, location: 'Delhi', image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop' },
    { user_id: 3, title: 'FabIndia Silk Kurti', type: 'Kurti', brand: 'FabIndia', size: 'M', condition: 'Excellent', description: 'Beautiful handwoven silk kurti from FabIndia with traditional block print embroidery. I bought this during their festive sale and wore it to two weddings. The colors are vibrant - deep maroon with gold thread work. Comes with matching bottom (not included in swap). Looking for contemporary western wear.', estimated_value: 2800, location: 'Bangalore', image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop' },
    { user_id: 3, title: 'Biba Printed Palazzo', type: 'Pants', brand: 'Biba', size: 'S', condition: 'Good', description: 'Comfortable cotton palazzo pants with beautiful floral print from Biba. The fabric is breathable and perfect for Bangalore weather. I have worn them regularly for about 4 months for office and casual outings. The elastic waistband is still stretchy. Some minor fading from washing but print is still vibrant.', estimated_value: 900, location: 'Bangalore', image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop' },
    { user_id: 3, title: 'Only Blazer', type: 'Jacket', brand: 'Only', size: 'M', condition: 'Like New', description: 'Professional charcoal grey blazer from Only that I bought for a presentation. Wore it once and realized the fit is not quite right for me. The fabric has a slight stretch for comfort and the tailoring is excellent. Perfect for corporate meetings, interviews, or formal events. Still smells like the store!', estimated_value: 2400, location: 'Bangalore', image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop' },
    { user_id: 3, title: 'Forever 21 Crop Top', type: 'T-Shirt', brand: 'Forever 21', size: 'S', condition: 'Good', description: 'Trendy pastel pink crop top that I bought during a sale. The fabric is soft and the fit is flattering. I wore it a few times to college but now I am graduating and moving to a more professional wardrobe. Great for casual outings, parties, or layering. No stains or damage.', estimated_value: 600, location: 'Bangalore', image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop' }
  ];

  for (const i of items) {
    await sql`
      INSERT INTO clothing_items (user_id, title, type, brand, size, condition, description, estimated_value, location, image_url)
      VALUES (${i.user_id}, ${i.title}, ${i.type}, ${i.brand}, ${i.size}, ${i.condition}, ${i.description}, ${i.estimated_value}, ${i.location}, ${i.image_url})
    `;
  }
  console.log('Clothing items seeded.');

  // Seed sample swap requests
  console.log('Seeding swap requests...');
  const swaps = [
    { sender_id: 1, receiver_id: 2, sender_item_id: 3, receiver_item_id: 5, message: 'Hi Rahul! I love your Nike running shirt. Would you be interested in swapping it for my Uniqlo t-shirt?', status: 'accepted' },
    { sender_id: 2, receiver_id: 3, sender_item_id: 7, receiver_item_id: 11, message: 'Hey Ananya, your blazer looks amazing! I need a professional blazer for interviews. Can we swap?', status: 'pending' }
  ];

  for (const s of swaps) {
    const result = await sql`
      INSERT INTO swap_requests (sender_id, receiver_id, sender_item_id, receiver_item_id, message, status)
      VALUES (${s.sender_id}, ${s.receiver_id}, ${s.sender_item_id}, ${s.receiver_item_id}, ${s.message}, ${s.status})
      RETURNING id
    `;
    
    // Add sample messages for the accepted swap
    if (s.status === 'accepted') {
      const swapId = result[0].id;
      await sql`INSERT INTO messages (swap_id, sender_id, message) VALUES (${swapId}, 1, 'Thanks for accepting! When can we meet for the exchange?')`;
      await sql`INSERT INTO messages (swap_id, sender_id, message) VALUES (${swapId}, 2, 'How about Saturday afternoon? We can meet at Bandra station.')`;
      await sql`INSERT INTO messages (swap_id, sender_id, message) VALUES (${swapId}, 1, 'Perfect! I will bring the t-shirt. See you then!')`;
    }
  }
  console.log('Swap requests seeded.');

  console.log('Seed complete!');
  await sql.end();
}

seed().catch(err => { console.error(err); process.exit(1); });
