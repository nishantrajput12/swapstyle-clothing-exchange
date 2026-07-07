const CLOTHING_IMAGES = [
  'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1434389677669-e08b4cead0e2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1495105787522-656c8c9f8a7d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
];

export const SEED_USERS = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya@example.com', password: 'password123', location: 'Mumbai, India', bio: 'Sustainable fashion enthusiast. Love swapping designer pieces!', isAdmin: false, joinDate: '2024-11-15', avatar: '' },
  { id: 'u2', name: 'Arjun Mehta', email: 'arjun@example.com', password: 'password123', location: 'Delhi, India', bio: 'Minimalist wardrobe advocate. Quality over quantity.', isAdmin: false, joinDate: '2024-10-20', avatar: '' },
  { id: 'u3', name: 'Sneha Patel', email: 'sneha@example.com', password: 'password123', location: 'Bangalore, India', bio: 'Vintage clothing collector. Always looking for unique finds.', isAdmin: false, joinDate: '2024-09-05', avatar: '' },
  { id: 'u4', name: 'Rahul Verma', email: 'rahul@example.com', password: 'password123', location: 'Pune, India', bio: 'Streetwear lover. Swapping is the new shopping!', isAdmin: false, joinDate: '2024-08-12', avatar: '' },
  { id: 'u5', name: 'Ananya Singh', email: 'ananya@example.com', password: 'password123', location: 'Chennai, India', bio: 'Ethical fashion supporter. Let us swap and save the planet.', isAdmin: false, joinDate: '2024-07-28', avatar: '' },
  { id: 'u6', name: 'Vikram Joshi', email: 'vikram@example.com', password: 'password123', location: 'Hyderabad, India', bio: 'Formal wear specialist. Swap your suits and blazers with me.', isAdmin: false, joinDate: '2024-12-01', avatar: '' },
  { id: 'admin1', name: 'Admin', email: 'admin@swapstyle.com', password: 'admin123', location: 'Mumbai, India', bio: 'Platform administrator', isAdmin: true, joinDate: '2024-01-01', avatar: '' },
];

export const SEED_LISTINGS = [
  { id: 'l1', userId: 'u1', title: 'Zara Floral Summer Dress', category: 'Dresses', brand: 'Zara', size: 'M', condition: 'Like New', estimatedValue: 45, description: 'Beautiful floral dress perfect for summer. Worn only twice, in excellent condition. Perfect for casual outings or brunch.', location: 'Mumbai, India', images: [CLOTHING_IMAGES[0]], tags: ['summer', 'floral', 'casual'], available: true, createdAt: '2025-01-10' },
  { id: 'l2', userId: 'u2', title: 'Levi\'s 501 Original Fit Jeans', category: 'Jeans', brand: "Levi's", size: '32', condition: 'Good', estimatedValue: 55, description: 'Classic Levi\'s 501 jeans in medium wash. Minor fading adds character. Great fit and very comfortable.', location: 'Delhi, India', images: [CLOTHING_IMAGES[1]], tags: ['denim', 'classic', 'casual'], available: true, createdAt: '2025-01-12' },
  { id: 'l3', userId: 'u3', title: 'H&M Wool Blend Blazer', category: 'Blazers', brand: 'H&M', size: 'L', condition: 'Excellent', estimatedValue: 60, description: 'Navy blue wool blend blazer. Perfect for office wear or smart casual occasions. Barely worn.', location: 'Bangalore, India', images: [CLOTHING_IMAGES[2]], tags: ['formal', 'office', 'navy'], available: true, createdAt: '2025-01-08' },
  { id: 'l4', userId: 'u4', title: 'Nike Dri-FIT Running Jacket', category: 'Jackets', brand: 'Nike', size: 'M', condition: 'Like New', estimatedValue: 50, description: 'Lightweight running jacket with Dri-FIT technology. Reflective details for visibility. Used only a handful of times.', location: 'Pune, India', images: [CLOTHING_IMAGES[3]], tags: ['sportswear', 'running', 'activewear'], available: true, createdAt: '2025-01-15' },
  { id: 'l5', userId: 'u5', title: 'Vintage Denim Jacket', category: 'Jackets', brand: "Levi's", size: 'S', condition: 'Good', estimatedValue: 65, description: 'Authentic vintage Levi\'s denim jacket from the 90s. Classic trucker style with beautiful patina. A true statement piece.', location: 'Chennai, India', images: [CLOTHING_IMAGES[4]], tags: ['vintage', 'denim', 'statement'], available: true, createdAt: '2025-01-05' },
  { id: 'l6', userId: 'u1', title: 'Cotton Wrap Top - Anthropologie', category: 'Tops', brand: 'Anthropologie', size: 'S', condition: 'New', estimatedValue: 40, description: 'Brand new with tags. Beautiful wrap top in blush pink. Perfect for spring and summer. Never worn.', location: 'Mumbai, India', images: [CLOTHING_IMAGES[5]], tags: ['spring', 'feminine', 'new-with-tags'], available: true, createdAt: '2025-01-18' },
  { id: 'l7', userId: 'u6', title: 'Tommy Hilfiger Oxford Shirt', category: 'Shirts', brand: 'Tommy Hilfiger', size: 'L', condition: 'Excellent', estimatedValue: 35, description: 'Classic blue Oxford shirt in great condition. Perfect for layering or wearing alone. Timeless style.', location: 'Hyderabad, India', images: [CLOTHING_IMAGES[6]], tags: ['classic', 'preppy', 'office'], available: true, createdAt: '2025-01-14' },
  { id: 'l8', userId: 'u2', title: 'Adidas Track Pants - Originals', category: 'Pants', brand: 'Adidas', size: 'M', condition: 'Good', estimatedValue: 30, description: 'Iconic Adidas Originals track pants with three stripes. Comfortable and stylish. Great for casual wear.', location: 'Delhi, India', images: [CLOTHING_IMAGES[7]], tags: ['sportswear', 'casual', 'streetwear'], available: true, createdAt: '2025-01-11' },
  { id: 'l9', userId: 'u3', title: 'Mango Pleated Midi Skirt', category: 'Skirts', brand: 'Mango', size: 'M', condition: 'Like New', estimatedValue: 38, description: 'Elegant pleated midi skirt in emerald green. Flattering fit with elastic waistband. Worn once for a special occasion.', location: 'Bangalore, India', images: [CLOTHING_IMAGES[8]], tags: ['elegant', 'midi', 'green'], available: true, createdAt: '2025-01-16' },
  { id: 'l10', userId: 'u4', title: 'Puma Graphic Hoodie', category: 'Hoodies', brand: 'Puma', size: 'L', condition: 'Excellent', estimatedValue: 42, description: 'Comfortable Puma hoodie with unique graphic print. Soft fleece interior. Perfect for layering in cooler weather.', location: 'Pune, India', images: [CLOTHING_IMAGES[9]], tags: ['casual', 'streetwear', 'cozy'], available: true, createdAt: '2025-01-13' },
  { id: 'l11', userId: 'u5', title: 'Forever 21 Knit Cardigan', category: 'Sweaters', brand: 'Forever 21', size: 'S', condition: 'Good', estimatedValue: 25, description: 'Soft knit cardigan in cream color. Versatile piece that goes with everything. Minor pilling but overall great condition.', location: 'Chennai, India', images: [CLOTHING_IMAGES[10]], tags: ['cozy', 'neutral', 'versatile'], available: true, createdAt: '2025-01-09' },
  { id: 'l12', userId: 'u6', title: 'Ray-Ban Aviator Sunglasses', category: 'Accessories', brand: 'Ray-Ban', size: 'One Size', condition: 'Like New', estimatedValue: 80, description: 'Classic Ray-Ban aviator sunglasses with gold frame and green lenses. Comes with original case. Barely used.', location: 'Hyderabad, India', images: [CLOTHING_IMAGES[11]], tags: ['luxury', 'classic', 'accessories'], available: true, createdAt: '2025-01-17' },
  { id: 'l13', userId: 'u1', title: 'Urbanic Cargo Pants', category: 'Pants', brand: 'Urbanic', size: 'M', condition: 'New', estimatedValue: 35, description: 'Trendy cargo pants in olive green. Brand new with tags. Multiple pockets and relaxed fit. Very on-trend right now.', location: 'Mumbai, India', images: [CLOTHING_IMAGES[12]], tags: ['trendy', 'cargo', 'streetwear'], available: true, createdAt: '2025-01-19' },
  { id: 'l14', userId: 'u3', title: 'Biba Anarkali Suit Set', category: 'Ethnic Wear', brand: 'Biba', size: 'M', condition: 'Excellent', estimatedValue: 70, description: 'Beautiful Anarkali suit set with embroidered dupatta. Worn once for a festival. Dry clean only. Stunning piece.', location: 'Bangalore, India', images: [CLOTHING_IMAGES[13]], tags: ['ethnic', 'festive', 'embroidered'], available: true, createdAt: '2025-01-07' },
  { id: 'l15', userId: 'u2', title: 'Converse Chuck Taylor All Star', category: 'Shoes', brand: 'Converse', size: '9', condition: 'Good', estimatedValue: 40, description: 'Classic white Converse sneakers. Some minor scuffs but plenty of life left. Iconic style that goes with everything.', location: 'Delhi, India', images: [CLOTHING_IMAGES[14]], tags: ['sneakers', 'classic', 'casual'], available: true, createdAt: '2025-01-06' },
  { id: 'l16', userId: 'u4', title: 'The North Face Puffer Vest', category: 'Jackets', brand: 'The North Face', size: 'L', condition: 'Like New', estimatedValue: 75, description: 'Warm puffer vest in black. 700-fill down insulation. Worn only a few times. Perfect for layering in winter.', location: 'Pune, India', images: [CLOTHING_IMAGES[15]], tags: ['winter', 'outdoor', 'warm'], available: true, createdAt: '2025-01-20' },
  { id: 'l17', userId: 'u5', title: 'Allen Solly Formal Trousers', category: 'Pants', brand: 'Allen Solly', size: '34', condition: 'Excellent', estimatedValue: 30, description: 'Well-fitted formal trousers in charcoal grey. Great for office wear. No stains or damage.', location: 'Chennai, India', images: [CLOTHING_IMAGES[16]], tags: ['formal', 'office', 'trousers'], available: true, createdAt: '2025-01-04' },
  { id: 'l18', userId: 'u6', title: 'Zara Oversized Graphic Tee', category: 'T-Shirts', brand: 'Zara', size: 'L', condition: 'New', estimatedValue: 22, description: 'Brand new oversized graphic tee. Contemporary art print on premium cotton. Still has tags on.', location: 'Hyderabad, India', images: [CLOTHING_IMAGES[17]], tags: ['graphic', 'oversized', 'trendy'], available: true, createdAt: '2025-01-21' },
  { id: 'l19', userId: 'u1', title: 'Handmade Macrame Tote Bag', category: 'Accessories', brand: 'Handmade', size: 'One Size', estimatedValue: 28, condition: 'New', description: 'Beautiful handmade macrame tote bag. Perfect for beach outings or grocery shopping. Unique bohemian style.', location: 'Mumbai, India', images: [CLOTHING_IMAGES[18]], tags: ['handmade', 'bohemian', 'bag'], available: true, createdAt: '2025-01-03' },
  { id: 'l20', userId: 'u3', title: 'Only High-Waist Skinny Jeans', category: 'Jeans', brand: 'Only', size: '28', condition: 'Good', estimatedValue: 32, description: 'High-waist skinny jeans in dark indigo. Flattering fit with slight stretch. Great everyday jeans.', location: 'Bangalore, India', images: [CLOTHING_IMAGES[19]], tags: ['denim', 'skinny', 'everyday'], available: true, createdAt: '2025-01-02' },
];

export const SEED_SWAPS = [
  { id: 's1', senderId: 'u1', receiverId: 'u2', senderListingId: 'l1', receiverListingId: 'l2', status: 'pending', message: 'Would love to swap my floral dress for your Levi\'s!', createdAt: '2025-01-20' },
  { id: 's2', senderId: 'u3', receiverId: 'u4', senderListingId: 'l9', receiverListingId: 'l10', status: 'accepted', message: 'Your hoodie looks amazing! Interested in a swap?', createdAt: '2025-01-18' },
  { id: 's3', senderId: 'u5', receiverId: 'u6', senderListingId: 'l11', receiverListingId: 'l12', status: 'rejected', message: 'Can I swap my cardigan for your sunglasses?', createdAt: '2025-01-15' },
];

export const SEED_MESSAGES = [
  { id: 'm1', senderId: 'u1', receiverId: 'u2', text: 'Hi! I\'m interested in swapping my Zara dress for your Levi\'s jeans. What do you think?', timestamp: '2025-01-20T10:30:00' },
  { id: 'm2', senderId: 'u2', receiverId: 'u1', text: 'Hey! That dress looks great. I\'d be interested! Can you share more details about the condition?', timestamp: '2025-01-20T11:15:00' },
  { id: 'm3', senderId: 'u1', receiverId: 'u2', text: 'It\'s in like-new condition! Worn only twice. No stains or tears at all.', timestamp: '2025-01-20T11:45:00' },
  { id: 'm4', senderId: 'u3', receiverId: 'u4', text: 'Love your Puma hoodie! Would you consider swapping for my Mango skirt?', timestamp: '2025-01-18T09:00:00' },
  { id: 'm5', senderId: 'u4', receiverId: 'u3', text: 'Sure! The hoodie is in great shape. Let\'s do it!', timestamp: '2025-01-18T14:30:00' },
];

export function getSeedData() {
  const stored = localStorage.getItem('swapstyle_initialized');
  if (stored) return;

  if (!localStorage.getItem('swapstyle_users')) {
    localStorage.setItem('swapstyle_users', JSON.stringify(SEED_USERS));
  }
  if (!localStorage.getItem('swapstyle_listings')) {
    localStorage.setItem('swapstyle_listings', JSON.stringify(SEED_LISTINGS));
  }
  if (!localStorage.getItem('swapstyle_swaps')) {
    localStorage.setItem('swapstyle_swaps', JSON.stringify(SEED_SWAPS));
  }
  if (!localStorage.getItem('swapstyle_messages')) {
    localStorage.setItem('swapstyle_messages', JSON.stringify(SEED_MESSAGES));
  }
  localStorage.setItem('swapstyle_initialized', 'true');
}

export function resetSeedData() {
  localStorage.setItem('swapstyle_users', JSON.stringify(SEED_USERS));
  localStorage.setItem('swapstyle_listings', JSON.stringify(SEED_LISTINGS));
  localStorage.setItem('swapstyle_swaps', JSON.stringify(SEED_SWAPS));
  localStorage.setItem('swapstyle_messages', JSON.stringify(SEED_MESSAGES));
  localStorage.setItem('swapstyle_initialized', 'true');
}

export const CATEGORIES = ['Tops', 'T-Shirts', 'Shirts', 'Dresses', 'Jeans', 'Pants', 'Skirts', 'Jackets', 'Blazers', 'Hoodies', 'Sweaters', 'Ethnic Wear', 'Shoes', 'Accessories'];
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '24', '26', '28', '30', '32', '34', '36', '6', '7', '8', '9', '10', 'One Size'];
export const CONDITIONS = ['New', 'Like New', 'Excellent', 'Good', 'Fair'];
export const BRANDS = ['Zara', 'H&M', 'Nike', 'Adidas', "Levi's", 'Puma', 'Mango', 'Tommy Hilfiger', 'Anthropologie', 'Forever 21', 'Converse', 'The North Face', 'Biba', 'Allen Solly', 'Only', 'Urbanic', 'Ray-Ban', 'Handmade', 'Other'];
