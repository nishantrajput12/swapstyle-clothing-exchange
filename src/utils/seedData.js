// SwapStyle seed data — 10 users + admin, 140 realistic listings across 14 categories.

export const CLOTHING_IMAGES = [
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
const IMG = (i) => CLOTHING_IMAGES[i % CLOTHING_IMAGES.length];

export const SEED_USERS = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya@example.com', password: 'password123', location: 'Mumbai, India', bio: 'Sustainable fashion enthusiast. Love swapping designer pieces!', isAdmin: false, joinDate: '2024-11-15', avatar: '' },
  { id: 'u2', name: 'Arjun Mehta', email: 'arjun@example.com', password: 'password123', location: 'Delhi, India', bio: 'Minimalist wardrobe advocate. Quality over quantity.', isAdmin: false, joinDate: '2024-10-20', avatar: '' },
  { id: 'u3', name: 'Sneha Patel', email: 'sneha@example.com', password: 'password123', location: 'Bangalore, India', bio: 'Vintage clothing collector. Always looking for unique finds.', isAdmin: false, joinDate: '2024-09-05', avatar: '' },
  { id: 'u4', name: 'Rahul Verma', email: 'rahul@example.com', password: 'password123', location: 'Pune, India', bio: 'Streetwear lover. Swapping is the new shopping!', isAdmin: false, joinDate: '2024-08-12', avatar: '' },
  { id: 'u5', name: 'Ananya Singh', email: 'ananya@example.com', password: 'password123', location: 'Chennai, India', bio: 'Ethical fashion supporter. Let us swap and save the planet.', isAdmin: false, joinDate: '2024-07-28', avatar: '' },
  { id: 'u6', name: 'Vikram Joshi', email: 'vikram@example.com', password: 'password123', location: 'Hyderabad, India', bio: 'Formal wear specialist. Swap your suits and blazers with me.', isAdmin: false, joinDate: '2024-12-01', avatar: '' },
  { id: 'u7', name: 'Ishaan Kapoor', email: 'ishaan@example.com', password: 'password123', location: 'Kolkata, India', bio: 'Casual and streetwear collector. Sneakerhead too.', isAdmin: false, joinDate: '2024-06-14', avatar: '' },
  { id: 'u8', name: 'Meera Iyer', email: 'meera@example.com', password: 'password123', location: 'Ahmedabad, India', bio: 'Love ethnic wear and traditional Indian fashion.', isAdmin: false, joinDate: '2024-05-22', avatar: '' },
  { id: 'u9', name: 'Kabir Malhotra', email: 'kabir@example.com', password: 'password123', location: 'Jaipur, India', bio: 'Slow fashion advocate. Preloved pieces have stories to tell.', isAdmin: false, joinDate: '2024-04-30', avatar: '' },
  { id: 'u10', name: 'Riya Desai', email: 'riya@example.com', password: 'password123', location: 'Surat, India', bio: 'Trend-setter with a huge wardrobe to share.', isAdmin: false, joinDate: '2024-03-18', avatar: '' },
  { id: 'admin1', name: 'Admin', email: 'admin@swapstyle.com', password: 'admin123', location: 'Mumbai, India', bio: 'Platform administrator', isAdmin: true, joinDate: '2024-01-01', avatar: '' },
];

const USER_CITY = { u1: 'Mumbai, India', u2: 'Delhi, India', u3: 'Bangalore, India', u4: 'Pune, India', u5: 'Chennai, India', u6: 'Hyderabad, India', u7: 'Kolkata, India', u8: 'Ahmedabad, India', u9: 'Jaipur, India', u10: 'Surat, India' };

const mk = (id, u, t, cat, b, s, cond, v, d, i, tags, date) => ({
  id, userId: u, title: t, category: cat, brand: b, size: s, condition: cond,
  estimatedValue: v, description: d, location: USER_CITY[u],
  images: [IMG(i)], tags, available: true, createdAt: date,
});

export const SEED_LISTINGS = [
  // === TOPS (l1-l10) ===
  mk('l1', 'u1', 'Anthropologie Cotton Wrap Top', 'Tops', 'Anthropologie', 'S', 'New', 40, 'Brand new with tags. Blush pink wrap top, perfect for spring.', 5, ['spring','feminine','new-with-tags'], '2025-01-18'),
  mk('l2', 'u3', 'Zara Puff Sleeve Blouse', 'Tops', 'Zara', 'M', 'Like New', 32, 'Elegant white puff sleeve blouse. Worn once for a brunch.', 12, ['elegant','white','office'], '2025-01-14'),
  mk('l3', 'u5', 'H&M Ribbed Crop Top', 'Tops', 'H&M', 'S', 'Excellent', 15, 'Comfy black ribbed crop top. Great for layering.', 6, ['casual','black','basic'], '2025-01-11'),
  mk('l4', 'u8', 'Vero Moda Silk Camisole', 'Tops', 'Vero Moda', 'M', 'Good', 22, 'Champagne silk camisole. Perfect under blazers.', 13, ['silk','layering','elegant'], '2025-01-09'),
  mk('l5', 'u10', 'Only Off-Shoulder Top', 'Tops', 'Only', 'S', 'Like New', 20, 'Trendy off-shoulder top in pastel green. Party ready.', 14, ['party','trendy','green'], '2025-01-07'),
  mk('l6', 'u2', 'Bewakoof Basic Tank Top', 'Tops', 'Bewakoof', 'L', 'Good', 12, 'Simple grey tank top. Great for workouts or lounging.', 6, ['basic','activewear','grey'], '2025-01-05'),
  mk('l7', 'u6', 'AND Peplum Top', 'Tops', 'AND', 'M', 'Excellent', 28, 'Navy peplum top with subtle print. Office-appropriate.', 15, ['office','navy','peplum'], '2025-01-03'),
  mk('l8', 'u9', 'Aurelia Cotton Kurti Top', 'Tops', 'Aurelia', 'L', 'New', 26, 'Fusion cotton top with block print. Never worn.', 17, ['fusion','block-print','cotton'], '2025-01-02'),
  mk('l9', 'u4', 'Roadster Halter Neck Top', 'Tops', 'Roadster', 'M', 'Good', 18, 'Coral halter neck. Ideal for summer parties.', 5, ['summer','coral','party'], '2024-12-30'),
  mk('l10', 'u7', 'Uniqlo Airism Sleeveless Top', 'Tops', 'Uniqlo', 'M', 'Like New', 20, 'Sweat-wicking Airism top in beige. Perfect for humid weather.', 13, ['basic','activewear','beige'], '2024-12-28'),

  // === T-SHIRTS (l11-l20) ===
  mk('l11', 'u6', 'Zara Oversized Graphic Tee', 'T-Shirts', 'Zara', 'L', 'New', 22, 'Brand new oversized graphic tee with contemporary art print.', 17, ['graphic','oversized','trendy'], '2025-01-21'),
  mk('l12', 'u2', 'Nike Sportswear Club Tee', 'T-Shirts', 'Nike', 'M', 'Excellent', 20, 'Classic Nike swoosh tee in black. Comfortable everyday wear.', 3, ['sportswear','black','basic'], '2025-01-19'),
  mk('l13', 'u4', 'Adidas Trefoil Logo Tee', 'T-Shirts', 'Adidas', 'L', 'Like New', 22, 'White Adidas Originals tee with trefoil logo. Barely worn.', 7, ['sportswear','white','logo'], '2025-01-17'),
  mk('l14', 'u1', 'Bewakoof Marvel Print Tee', 'T-Shirts', 'Bewakoof', 'M', 'Good', 12, 'Officially licensed Iron Man print tee. For Marvel fans.', 11, ['graphic','marvel','fandom'], '2025-01-16'),
  mk('l15', 'u7', 'Uniqlo U Crewneck Tee', 'T-Shirts', 'Uniqlo', 'M', 'New', 18, 'Uniqlo U supima cotton tee in beige. Still with tags.', 13, ['premium','beige','basic'], '2025-01-14'),
  mk('l16', 'u3', "Levi's Housemark Tee", 'T-Shirts', "Levi's", 'S', 'Excellent', 20, 'Classic red Levi\'s housemark logo tee. Great fit.', 4, ['classic','red','logo'], '2025-01-12'),
  mk('l17', 'u8', 'H&M Basic White Tee', 'T-Shirts', 'H&M', 'M', 'Good', 8, 'Everyday basic white tee. Slight yellowing near collar.', 6, ['basic','white','everyday'], '2025-01-10'),
  mk('l18', 'u10', 'Puma Essentials Logo Tee', 'T-Shirts', 'Puma', 'S', 'Like New', 18, 'Navy Puma essentials tee. Worn twice.', 8, ['sportswear','navy','logo'], '2025-01-08'),
  mk('l19', 'u5', 'Roadster Striped Tee', 'T-Shirts', 'Roadster', 'M', 'Good', 10, 'Navy-white striped tee. Great for casual outings.', 12, ['striped','casual','navy'], '2025-01-06'),
  mk('l20', 'u9', 'Champion Script Logo Tee', 'T-Shirts', 'Champion', 'L', 'Excellent', 25, 'Grey Champion script tee. Vintage feel.', 15, ['vintage','grey','logo'], '2025-01-04'),

  // === SHIRTS (l21-l30) ===
  mk('l21', 'u6', 'Tommy Hilfiger Oxford Shirt', 'Shirts', 'Tommy Hilfiger', 'L', 'Excellent', 35, 'Classic blue Oxford shirt. Perfect for layering.', 6, ['classic','preppy','office'], '2025-01-14'),
  mk('l22', 'u2', 'Van Heusen Formal Shirt', 'Shirts', 'Van Heusen', 'M', 'Like New', 28, 'Crisp white formal shirt. Wrinkle-resistant fabric.', 15, ['formal','white','office'], '2025-01-16'),
  mk('l23', 'u4', 'Allen Solly Checkered Shirt', 'Shirts', 'Allen Solly', 'L', 'Good', 22, 'Blue and white checks. Semi-formal look.', 3, ['checks','semi-formal','blue'], '2025-01-13'),
  mk('l24', 'u1', 'Zara Linen Shirt', 'Shirts', 'Zara', 'M', 'Excellent', 32, 'Beige linen shirt. Breathable and stylish for summer.', 12, ['linen','summer','beige'], '2025-01-11'),
  mk('l25', 'u7', 'Louis Philippe Silk Shirt', 'Shirts', 'Louis Philippe', 'L', 'New', 45, 'Premium silk-blend shirt in wine color. Never worn.', 17, ['premium','wine','formal'], '2025-01-09'),
  mk('l26', 'u3', 'Peter England Denim Shirt', 'Shirts', 'Peter England', 'M', 'Good', 22, 'Light-wash denim shirt. Great for casual Fridays.', 5, ['denim','casual','light-wash'], '2025-01-07'),
  mk('l27', 'u8', 'Arrow Slim Fit Formal Shirt', 'Shirts', 'Arrow', 'M', 'Excellent', 28, 'Sky blue slim fit shirt. Wrinkle-free.', 15, ['formal','slim-fit','sky-blue'], '2025-01-05'),
  mk('l28', 'u10', 'H&M Regular Fit Flannel Shirt', 'Shirts', 'H&M', 'M', 'Like New', 20, 'Red-black flannel. Cozy for winter.', 6, ['flannel','winter','red'], '2025-01-03'),
  mk('l29', 'u5', 'UCB Printed Shirt', 'Shirts', 'UCB', 'S', 'Good', 24, 'Tropical print button-down. Vacation vibes.', 4, ['printed','tropical','vacation'], '2025-01-01'),
  mk('l30', 'u9', 'Jack & Jones Casual Shirt', 'Shirts', 'Jack & Jones', 'L', 'Excellent', 26, 'Grey casual shirt with subtle texture. Versatile piece.', 11, ['casual','grey','versatile'], '2024-12-29'),

  // === DRESSES (l31-l40) ===
  mk('l31', 'u1', 'Zara Floral Summer Dress', 'Dresses', 'Zara', 'M', 'Like New', 45, 'Beautiful floral dress, worn twice. Perfect for brunch.', 0, ['summer','floral','casual'], '2025-01-10'),
  mk('l32', 'u3', 'H&M Little Black Dress', 'Dresses', 'H&M', 'S', 'Excellent', 30, 'Classic LBD. Fits like a glove. Great for parties.', 2, ['party','black','classic'], '2025-01-12'),
  mk('l33', 'u5', 'Mango Wrap Midi Dress', 'Dresses', 'Mango', 'M', 'New', 42, 'Emerald wrap midi with tie waist. Brand new with tags.', 8, ['midi','emerald','new-with-tags'], '2025-01-08'),
  mk('l34', 'u8', 'AND Bodycon Dress', 'Dresses', 'AND', 'M', 'Like New', 38, 'Ruby red bodycon dress. Worn once at a wedding.', 12, ['red','bodycon','party'], '2025-01-06'),
  mk('l35', 'u10', 'Vero Moda Maxi Dress', 'Dresses', 'Vero Moda', 'L', 'Good', 32, 'Boho printed maxi dress. Great for vacations.', 4, ['boho','maxi','vacation'], '2025-01-04'),
  mk('l36', 'u2', 'W for Woman Anarkali Dress', 'Dresses', 'W for Woman', 'M', 'Excellent', 40, 'Fusion Anarkali-style dress in mint green.', 13, ['fusion','mint','ethnic'], '2025-01-02'),
  mk('l37', 'u6', 'Only Skater Dress', 'Dresses', 'Only', 'S', 'Like New', 28, 'Navy skater dress with polka dots. Cute and comfy.', 14, ['skater','navy','polka-dot'], '2024-12-30'),
  mk('l38', 'u4', 'Uniqlo Linen Shift Dress', 'Dresses', 'Uniqlo', 'M', 'New', 35, 'Beige linen shift dress. Minimalist and elegant.', 15, ['linen','minimalist','beige'], '2024-12-28'),
  mk('l39', 'u7', 'Roadster Denim Pinafore Dress', 'Dresses', 'Roadster', 'S', 'Good', 25, 'Vintage-style denim pinafore. Pair with a tee.', 18, ['denim','vintage','pinafore'], '2024-12-26'),
  mk('l40', 'u9', 'Anthropologie Tiered Dress', 'Dresses', 'Anthropologie', 'M', 'Excellent', 55, 'Cream tiered midi with lace details. Statement piece.', 5, ['statement','cream','lace'], '2024-12-24'),

  // === JEANS (l41-l50) ===
  mk('l41', 'u2', "Levi's 501 Original Fit Jeans", 'Jeans', "Levi's", '32', 'Good', 55, 'Classic Levi\'s 501 in medium wash. Iconic and comfortable.', 1, ['denim','classic','casual'], '2025-01-12'),
  mk('l42', 'u3', 'Only High-Waist Skinny Jeans', 'Jeans', 'Only', '28', 'Good', 32, 'Dark indigo high-waist skinny jeans. Slight stretch.', 19, ['denim','skinny','everyday'], '2025-01-02'),
  mk('l43', 'u4', 'Wrangler Slim Straight Jeans', 'Jeans', 'Wrangler', '34', 'Excellent', 40, 'Dark wash slim straight. Great for office or casual.', 1, ['slim','dark-wash','casual'], '2025-01-15'),
  mk('l44', 'u1', 'Pepe Jeans Bootcut', 'Jeans', 'Pepe Jeans', '30', 'Like New', 45, 'Bootcut medium wash jeans. Barely worn.', 19, ['bootcut','medium-wash','denim'], '2025-01-13'),
  mk('l45', 'u5', 'H&M Mom Jeans', 'Jeans', 'H&M', '26', 'Good', 28, 'High-waist mom jeans in light blue. Trendy silhouette.', 1, ['mom-jeans','light-blue','trendy'], '2025-01-11'),
  mk('l46', 'u7', 'Jack & Jones Regular Fit Jeans', 'Jeans', 'Jack & Jones', '32', 'Excellent', 38, 'Comfortable regular fit in dark indigo.', 19, ['regular-fit','dark-indigo','casual'], '2025-01-09'),
  mk('l47', 'u9', 'Lee Cooper Distressed Jeans', 'Jeans', 'Lee Cooper', '30', 'Good', 30, 'Distressed skinny jeans. Grunge vibes.', 1, ['distressed','skinny','grunge'], '2025-01-07'),
  mk('l48', 'u6', 'Killer Slim Fit Jeans', 'Jeans', 'Killer', '34', 'New', 35, 'Never worn black slim fit. Tags attached.', 19, ['slim-fit','black','new-with-tags'], '2025-01-05'),
  mk('l49', 'u10', 'Flying Machine Skinny Jeans', 'Jeans', 'Flying Machine', '28', 'Like New', 30, 'Grey skinny jeans. Worn just twice.', 1, ['skinny','grey','denim'], '2025-01-03'),
  mk('l50', 'u8', "Levi's Ribcage Wide Leg", 'Jeans', "Levi's", '26', 'Excellent', 60, 'Trendy ribcage wide-leg jeans. Vintage-inspired.', 19, ['wide-leg','vintage','trendy'], '2025-01-01'),

  // === PANTS (l51-l60) ===
  mk('l51', 'u2', 'Adidas Track Pants - Originals', 'Pants', 'Adidas', 'M', 'Good', 30, 'Iconic three-stripe track pants. Great for casual wear.', 7, ['sportswear','casual','streetwear'], '2025-01-11'),
  mk('l52', 'u1', 'Urbanic Cargo Pants', 'Pants', 'Urbanic', 'M', 'New', 35, 'Olive green cargo pants. Brand new with tags.', 12, ['trendy','cargo','streetwear'], '2025-01-19'),
  mk('l53', 'u5', 'Allen Solly Formal Trousers', 'Pants', 'Allen Solly', '34', 'Excellent', 30, 'Charcoal grey formal trousers. Office-ready.', 16, ['formal','office','trousers'], '2025-01-04'),
  mk('l54', 'u4', 'Nike Tech Fleece Joggers', 'Pants', 'Nike', 'L', 'Like New', 45, 'Black tech fleece joggers. Warm and stylish.', 3, ['joggers','black','activewear'], '2025-01-14'),
  mk('l55', 'u7', 'Uniqlo Smart Ankle Pants', 'Pants', 'Uniqlo', 'M', 'Excellent', 32, 'Beige smart ankle pants. Work-friendly.', 13, ['ankle-pants','beige','work'], '2025-01-12'),
  mk('l56', 'u9', 'H&M Wide Leg Trousers', 'Pants', 'H&M', 'S', 'Good', 25, 'High-waist wide leg trousers in black.', 15, ['wide-leg','black','trendy'], '2025-01-10'),
  mk('l57', 'u3', 'Puma Sweatpants', 'Pants', 'Puma', 'M', 'Good', 22, 'Comfortable navy sweatpants. Lounge-friendly.', 9, ['sweatpants','navy','lounge'], '2025-01-08'),
  mk('l58', 'u6', 'Louis Philippe Chinos', 'Pants', 'Louis Philippe', '32', 'Like New', 38, 'Beige chinos, semi-formal. Worn a handful of times.', 11, ['chinos','beige','semi-formal'], '2025-01-06'),
  mk('l59', 'u10', 'Zara Paperbag Waist Pants', 'Pants', 'Zara', 'M', 'New', 40, 'Trendy paperbag waist pants in mustard. Brand new.', 14, ['paperbag','mustard','trendy'], '2025-01-04'),
  mk('l60', 'u8', 'Van Heusen Slim Formals', 'Pants', 'Van Heusen', '30', 'Excellent', 32, 'Navy slim formals. Perfect drop and finish.', 15, ['slim','navy','formal'], '2025-01-02'),

  // === SKIRTS (l61-l70) ===
  mk('l61', 'u3', 'Mango Pleated Midi Skirt', 'Skirts', 'Mango', 'M', 'Like New', 38, 'Emerald pleated midi. Elastic waistband. Worn once.', 8, ['elegant','midi','green'], '2025-01-16'),
  mk('l62', 'u1', 'Zara Denim Mini Skirt', 'Skirts', 'Zara', 'S', 'Good', 25, 'Classic blue denim mini skirt. Great for casual outings.', 1, ['denim','mini','casual'], '2025-01-14'),
  mk('l63', 'u5', 'H&M A-Line Skirt', 'Skirts', 'H&M', 'M', 'Excellent', 22, 'Navy A-line skirt. Office-friendly length.', 6, ['a-line','navy','office'], '2025-01-12'),
  mk('l64', 'u8', 'Vero Moda Wrap Skirt', 'Skirts', 'Vero Moda', 'S', 'New', 30, 'Cream wrap skirt with tie. Brand new with tags.', 13, ['wrap','cream','new-with-tags'], '2025-01-10'),
  mk('l65', 'u10', 'Only Ruffle Mini Skirt', 'Skirts', 'Only', 'M', 'Like New', 28, 'Blush pink ruffle mini. Feminine and fun.', 14, ['ruffle','pink','mini'], '2025-01-08'),
  mk('l66', 'u2', 'W for Woman Long Skirt', 'Skirts', 'W for Woman', 'L', 'Excellent', 32, 'Printed long skirt with elastic waist. Ethnic vibe.', 13, ['long','printed','ethnic'], '2025-01-06'),
  mk('l67', 'u6', 'AND Pencil Skirt', 'Skirts', 'AND', 'M', 'Good', 26, 'Black pencil skirt. Classic office wear.', 15, ['pencil','black','office'], '2025-01-04'),
  mk('l68', 'u4', 'Uniqlo Tiered Skirt', 'Skirts', 'Uniqlo', 'S', 'New', 30, 'Beige tiered midi skirt. Boho-chic.', 12, ['tiered','beige','boho'], '2025-01-02'),
  mk('l69', 'u7', 'Roadster Corduroy Skirt', 'Skirts', 'Roadster', 'M', 'Good', 22, 'Mustard corduroy mini. Retro feel.', 18, ['corduroy','mustard','retro'], '2024-12-31'),
  mk('l70', 'u9', 'Global Desi Boho Skirt', 'Skirts', 'Global Desi', 'M', 'Like New', 30, 'Multi-print boho maxi skirt. Fusion piece.', 4, ['boho','maxi','fusion'], '2024-12-29'),

  // === JACKETS (l71-l80) ===
  mk('l71', 'u4', 'Nike Dri-FIT Running Jacket', 'Jackets', 'Nike', 'M', 'Like New', 50, 'Lightweight running jacket with reflective details.', 3, ['sportswear','running','activewear'], '2025-01-15'),
  mk('l72', 'u5', 'Vintage Denim Jacket', 'Jackets', "Levi's", 'S', 'Good', 65, 'Authentic 90s Levi\'s trucker denim jacket. Rare find.', 4, ['vintage','denim','statement'], '2025-01-05'),
  mk('l73', 'u1', 'Zara Faux Leather Biker Jacket', 'Jackets', 'Zara', 'M', 'Excellent', 55, 'Black faux leather biker. Edgy statement piece.', 10, ['leather','biker','black'], '2025-01-17'),
  mk('l74', 'u4', 'The North Face Puffer Vest', 'Jackets', 'The North Face', 'L', 'Like New', 75, 'Black 700-fill down puffer vest. Warm layering.', 15, ['winter','outdoor','warm'], '2025-01-20'),
  mk('l75', 'u7', 'Adidas Windbreaker', 'Jackets', 'Adidas', 'M', 'Good', 40, 'Colorblock windbreaker. Retro style.', 7, ['windbreaker','retro','sportswear'], '2025-01-13'),
  mk('l76', 'u8', 'H&M Trench Coat', 'Jackets', 'H&M', 'M', 'Excellent', 50, 'Classic beige trench. Timeless piece.', 6, ['trench','beige','classic'], '2025-01-11'),
  mk('l77', 'u3', 'Uniqlo Ultra Light Down', 'Jackets', 'Uniqlo', 'M', 'New', 60, 'Ultra-light packable down jacket in navy. Never worn.', 13, ['down','navy','lightweight'], '2025-01-09'),
  mk('l78', 'u9', 'Woodland Field Jacket', 'Jackets', 'Woodland', 'L', 'Good', 55, 'Olive military-style field jacket. Rugged.', 11, ['military','olive','outdoor'], '2025-01-07'),
  mk('l79', 'u9', 'Tommy Hilfiger Varsity Jacket', 'Jackets', 'Tommy Hilfiger', 'L', 'Excellent', 65, 'Navy varsity with red trim. Preppy classic.', 6, ['varsity','navy','preppy'], '2025-01-05'),
  mk('l80', 'u10', 'Only Faux Fur Coat', 'Jackets', 'Only', 'M', 'Like New', 60, 'Ivory faux fur coat. Glamorous winter piece.', 5, ['fur','ivory','winter'], '2025-01-03'),

  // === BLAZERS (l81-l90) ===
  mk('l81', 'u3', 'H&M Wool Blend Blazer', 'Blazers', 'H&M', 'L', 'Excellent', 60, 'Navy wool blend blazer. Perfect for office or smart casual.', 2, ['formal','office','navy'], '2025-01-08'),
  mk('l82', 'u6', 'Louis Philippe Formal Blazer', 'Blazers', 'Louis Philippe', 'L', 'Like New', 85, 'Charcoal wool blazer. Worn only twice for occasions.', 15, ['formal','charcoal','wool'], '2025-01-06'),
  mk('l83', 'u1', 'Zara Oversized Blazer', 'Blazers', 'Zara', 'M', 'New', 65, 'Trendy oversized beige blazer. Brand new.', 12, ['oversized','beige','trendy'], '2025-01-04'),
  mk('l84', 'u4', 'Van Heusen Slim Fit Blazer', 'Blazers', 'Van Heusen', 'M', 'Excellent', 70, 'Black slim fit blazer. Wedding-worthy.', 17, ['slim-fit','black','formal'], '2025-01-02'),
  mk('l85', 'u5', 'AND Cropped Blazer', 'Blazers', 'AND', 'S', 'Good', 45, 'White cropped blazer. Contemporary silhouette.', 5, ['cropped','white','contemporary'], '2024-12-31'),
  mk('l86', 'u8', 'Peter England Two-Piece Blazer', 'Blazers', 'Peter England', 'L', 'Excellent', 90, 'Grey formal two-piece. Matching trousers included.', 11, ['two-piece','grey','formal'], '2024-12-29'),
  mk('l87', 'u10', 'Vero Moda Blush Blazer', 'Blazers', 'Vero Moda', 'M', 'Like New', 50, 'Blush pink blazer. Feminine and versatile.', 14, ['blush','pink','versatile'], '2024-12-27'),
  mk('l88', 'u7', 'Marks & Spencer Tweed Blazer', 'Blazers', 'Marks & Spencer', 'L', 'Good', 55, 'Classic brown tweed blazer. Vintage academia.', 6, ['tweed','brown','vintage'], '2024-12-25'),
  mk('l89', 'u2', 'Arrow Structured Blazer', 'Blazers', 'Arrow', 'M', 'Excellent', 60, 'Navy pinstripe structured blazer.', 15, ['pinstripe','navy','structured'], '2024-12-23'),
  mk('l90', 'u9', 'Mango Boyfriend Blazer', 'Blazers', 'Mango', 'M', 'Like New', 55, 'Camel boyfriend fit blazer. Effortlessly cool.', 8, ['boyfriend','camel','cool'], '2024-12-21'),

  // === HOODIES (l91-l100) ===
  mk('l91', 'u4', 'Puma Graphic Hoodie', 'Hoodies', 'Puma', 'L', 'Excellent', 42, 'Unique graphic hoodie with soft fleece interior.', 9, ['casual','streetwear','cozy'], '2025-01-13'),
  mk('l92', 'u2', 'Adidas Trefoil Hoodie', 'Hoodies', 'Adidas', 'M', 'Like New', 45, 'Black hoodie with iconic trefoil logo.', 7, ['sportswear','black','logo'], '2025-01-11'),
  mk('l93', 'u1', 'Nike Sportswear Club Hoodie', 'Hoodies', 'Nike', 'M', 'Good', 40, 'Grey Nike hoodie. Great for gym or errands.', 3, ['sportswear','grey','activewear'], '2025-01-09'),
  mk('l94', 'u7', 'Champion Reverse Weave Hoodie', 'Hoodies', 'Champion', 'L', 'Excellent', 55, 'Vintage reverse weave hoodie in navy.', 15, ['vintage','navy','streetwear'], '2025-01-07'),
  mk('l95', 'u9', 'H&M Oversized Hoodie', 'Hoodies', 'H&M', 'M', 'New', 30, 'Beige oversized hoodie with drawstring. Brand new.', 6, ['oversized','beige','cozy'], '2025-01-05'),
  mk('l96', 'u3', 'Bewakoof Anime Print Hoodie', 'Hoodies', 'Bewakoof', 'L', 'Like New', 35, 'Naruto print hoodie. For anime fans.', 11, ['anime','graphic','streetwear'], '2025-01-03'),
  mk('l97', 'u10', 'Roadster Zip-Up Hoodie', 'Hoodies', 'Roadster', 'M', 'Good', 25, 'Dark green zip-up hoodie. Everyday layering.', 18, ['zip-up','green','casual'], '2025-01-01'),
  mk('l98', 'u5', "Uniqlo Sweat Full-Zip Hoodie", 'Hoodies', 'Uniqlo', 'S', 'Excellent', 30, 'Off-white full-zip hoodie. Minimalist basic.', 13, ['minimalist','off-white','zip'], '2024-12-30'),
  mk('l99', 'u8', 'Reebok Classic Hoodie', 'Hoodies', 'Reebok', 'M', 'Good', 32, 'Maroon Reebok pullover hoodie.', 9, ['maroon','pullover','sportswear'], '2024-12-28'),
  mk('l100', 'u6', 'Jack & Jones Pullover Hoodie', 'Hoodies', 'Jack & Jones', 'L', 'Like New', 38, 'Black minimal hoodie. Well-cut and warm.', 15, ['black','minimal','warm'], '2024-12-26'),

  // === SWEATERS (l101-l110) ===
  mk('l101', 'u5', 'Forever 21 Knit Cardigan', 'Sweaters', 'Forever 21', 'S', 'Good', 25, 'Cream knit cardigan. Versatile and soft.', 10, ['cozy','neutral','versatile'], '2025-01-09'),
  mk('l102', 'u1', 'H&M Cable Knit Sweater', 'Sweaters', 'H&M', 'M', 'Excellent', 30, 'Cream cable knit pullover. Chunky and warm.', 6, ['cable-knit','cream','warm'], '2025-01-07'),
  mk('l103', 'u3', 'Uniqlo Merino Wool Crewneck', 'Sweaters', 'Uniqlo', 'M', 'Like New', 40, 'Navy merino wool sweater. Premium feel.', 13, ['merino','navy','premium'], '2025-01-05'),
  mk('l104', 'u7', 'Zara Turtleneck Sweater', 'Sweaters', 'Zara', 'S', 'New', 35, 'Camel turtleneck. Brand new with tags.', 12, ['turtleneck','camel','new-with-tags'], '2025-01-03'),
  mk('l105', 'u9', 'Marks & Spencer V-Neck Sweater', 'Sweaters', 'Marks & Spencer', 'L', 'Excellent', 32, 'Burgundy V-neck sweater. Preppy classic.', 15, ['v-neck','burgundy','preppy'], '2025-01-01'),
  mk('l106', 'u4', "Levi's Half-Zip Sweater", 'Sweaters', "Levi's", 'M', 'Good', 30, 'Grey half-zip pullover sweater.', 11, ['half-zip','grey','casual'], '2024-12-30'),
  mk('l107', 'u2', 'Only Ribbed Crop Sweater', 'Sweaters', 'Only', 'S', 'Like New', 28, 'Blush pink ribbed crop sweater.', 5, ['ribbed','crop','pink'], '2024-12-28'),
  mk('l108', 'u8', 'Van Heusen Argyle Sweater', 'Sweaters', 'Van Heusen', 'L', 'Excellent', 35, 'Navy argyle pattern sweater. Golf-club chic.', 15, ['argyle','navy','preppy'], '2024-12-26'),
  mk('l109', 'u10', 'Vero Moda Oversized Sweater', 'Sweaters', 'Vero Moda', 'M', 'New', 32, 'Grey oversized knit sweater. Brand new.', 6, ['oversized','grey','cozy'], '2024-12-24'),
  mk('l110', 'u6', 'Roadster Fair Isle Sweater', 'Sweaters', 'Roadster', 'M', 'Good', 25, 'Fair Isle pattern winter sweater in cream and red.', 10, ['fair-isle','winter','festive'], '2024-12-22'),

  // === ETHNIC WEAR (l111-l120) ===
  mk('l111', 'u3', 'Biba Anarkali Suit Set', 'Ethnic Wear', 'Biba', 'M', 'Excellent', 70, 'Embroidered Anarkali with dupatta. Worn once at a festival.', 13, ['ethnic','festive','embroidered'], '2025-01-07'),
  mk('l112', 'u8', 'Manyavar Kurta Pajama', 'Ethnic Wear', 'Manyavar', 'L', 'Like New', 65, 'Cream kurta pajama with subtle work. Wedding-worthy.', 15, ['kurta','wedding','cream'], '2025-01-05'),
  mk('l113', 'u1', 'Fabindia Cotton Kurta', 'Ethnic Wear', 'Fabindia', 'M', 'Excellent', 35, 'Handloom cotton kurta in indigo. Everyday ethnic.', 11, ['handloom','indigo','cotton'], '2025-01-03'),
  mk('l114', 'u5', 'W for Woman Palazzo Set', 'Ethnic Wear', 'W for Woman', 'M', 'Good', 40, 'Kurta with palazzo pants in mustard.', 12, ['palazzo','mustard','fusion'], '2025-01-01'),
  mk('l115', 'u9', 'Sabhyata Silk Saree', 'Ethnic Wear', 'Sabhyata', 'One Size', 'Like New', 90, 'Banarasi silk saree with zari border. Worn once.', 17, ['saree','silk','banarasi'], '2024-12-30'),
  mk('l116', 'u2', 'Libas Straight Kurta', 'Ethnic Wear', 'Libas', 'L', 'New', 30, 'Peach straight-cut kurta with embroidery. Brand new.', 5, ['kurta','peach','embroidered'], '2024-12-28'),
  mk('l117', 'u10', 'Global Desi Sharara Set', 'Ethnic Wear', 'Global Desi', 'M', 'Excellent', 55, 'Fusion sharara set in aqua. Statement piece.', 14, ['sharara','aqua','fusion'], '2024-12-26'),
  mk('l118', 'u6', 'Anouk Nehru Jacket', 'Ethnic Wear', 'Anouk', 'L', 'Like New', 45, 'Black Nehru jacket. Pairs with kurta.', 17, ['nehru','black','jacket'], '2024-12-24'),
  mk('l119', 'u4', 'Rangriti Anarkali Kurta', 'Ethnic Wear', 'Rangriti', 'M', 'Good', 32, 'Floral Anarkali kurta in maroon. Casual festive wear.', 11, ['anarkali','maroon','floral'], '2024-12-22'),
  mk('l120', 'u7', 'Aurelia Straight Palazzo', 'Ethnic Wear', 'Aurelia', 'S', 'Excellent', 38, 'Turquoise straight palazzo set. Contemporary ethnic.', 8, ['palazzo','turquoise','contemporary'], '2024-12-20'),

  // === SHOES (l121-l130) ===
  mk('l121', 'u2', 'Converse Chuck Taylor All Star', 'Shoes', 'Converse', '9', 'Good', 40, 'Classic white sneakers. Iconic style, some scuffs but lots of life left.', 14, ['sneakers','classic','casual'], '2025-01-06'),
  mk('l122', 'u4', 'Nike Air Max 90', 'Shoes', 'Nike', '10', 'Excellent', 90, 'White/grey Air Max 90. Barely worn, box included.', 3, ['sneakers','airmax','streetwear'], '2025-01-04'),
  mk('l123', 'u1', 'Adidas Stan Smith', 'Shoes', 'Adidas', '8', 'Like New', 65, 'Classic white Stan Smith with green tab.', 7, ['sneakers','stan-smith','classic'], '2025-01-02'),
  mk('l124', 'u7', 'Vans Old Skool', 'Shoes', 'Vans', '9', 'Good', 50, 'Black-white Old Skool skate shoes.', 15, ['skate','vans','streetwear'], '2024-12-31'),
  mk('l125', 'u9', 'Puma Suede Classic', 'Shoes', 'Puma', '8', 'Excellent', 45, 'Navy suede classic sneakers.', 9, ['suede','navy','classic'], '2024-12-29'),
  mk('l126', 'u5', 'Bata Formal Loafers', 'Shoes', 'Bata', '9', 'New', 40, 'Black formal loafers. Never worn, box included.', 17, ['loafers','formal','black'], '2024-12-27'),
  mk('l127', 'u10', 'Aldo Block Heel Sandals', 'Shoes', 'Aldo', '7', 'Like New', 50, 'Nude block heel sandals. Party or wedding worthy.', 5, ['heels','nude','party'], '2024-12-25'),
  mk('l128', 'u8', 'Skechers Go Walk', 'Shoes', 'Skechers', '9', 'Good', 42, 'Grey walking shoes. Ultra-comfortable soles.', 6, ['walking','grey','comfort'], '2024-12-23'),
  mk('l129', 'u3', 'New Balance 574', 'Shoes', 'New Balance', '7', 'Excellent', 60, 'Beige-navy 574 sneakers. Retro vibes.', 4, ['sneakers','retro','beige'], '2024-12-21'),
  mk('l130', 'u6', 'Woodland Leather Boots', 'Shoes', 'Woodland', '10', 'Like New', 70, 'Tan leather boots. Rugged and durable.', 11, ['boots','leather','tan'], '2024-12-19'),

  // === ACCESSORIES (l131-l140) ===
  mk('l131', 'u6', 'Ray-Ban Aviator Sunglasses', 'Accessories', 'Ray-Ban', 'One Size', 'Like New', 80, 'Gold-frame aviators, green lenses. Original case included.', 11, ['sunglasses','luxury','classic'], '2025-01-17'),
  mk('l132', 'u1', 'Handmade Macrame Tote Bag', 'Accessories', 'Handmade', 'One Size', 'New', 28, 'Beautiful handmade macrame tote. Bohemian style.', 18, ['handmade','bohemian','bag'], '2025-01-03'),
  mk('l133', 'u3', 'Fossil Leather Wallet', 'Accessories', 'Fossil', 'One Size', 'Excellent', 45, 'Brown leather bifold wallet. Barely used.', 15, ['wallet','leather','brown'], '2025-01-01'),
  mk('l134', 'u5', 'Baggit Sling Bag', 'Accessories', 'Baggit', 'One Size', 'Good', 30, 'Black quilted sling bag. Chain strap.', 9, ['sling','black','quilted'], '2024-12-30'),
  mk('l135', 'u7', 'Titan Analog Watch', 'Accessories', 'Titan', 'One Size', 'Like New', 55, 'Silver-tone analog watch. Classic look.', 17, ['watch','silver','classic'], '2024-12-28'),
  mk('l136', 'u9', 'H&M Woven Belt', 'Accessories', 'H&M', 'M', 'New', 15, 'Tan woven belt with gold buckle. Brand new.', 18, ['belt','tan','woven'], '2024-12-26'),
  mk('l137', 'u10', 'Michael Kors Handbag', 'Accessories', 'Michael Kors', 'One Size', 'Excellent', 120, 'Beige signature MK handbag. Barely used, dust bag included.', 15, ['handbag','beige','luxury'], '2024-12-24'),
  mk('l138', 'u8', 'Fabindia Silk Scarf', 'Accessories', 'Fabindia', 'One Size', 'Like New', 22, 'Hand-block-printed silk scarf. Beautiful indigo pattern.', 13, ['scarf','silk','indigo'], '2024-12-22'),
  mk('l139', 'u2', 'Aldo Sunglasses', 'Accessories', 'Aldo', 'One Size', 'Good', 30, 'Tortoiseshell cat-eye sunglasses.', 11, ['sunglasses','cat-eye','tortoise'], '2024-12-20'),
  mk('l140', 'u4', 'Casio Vintage Watch', 'Accessories', 'Casio', 'One Size', 'Excellent', 45, 'Silver retro digital watch. Iconic Casio A168.', 17, ['watch','vintage','digital'], '2024-12-18'),
];

export const SEED_SWAPS = [
  { id: 's1', senderId: 'u1', receiverId: 'u2', senderListingId: 'l31', receiverListingId: 'l41', status: 'pending', message: 'Would love to swap my Zara floral dress for your Levi\'s 501!', createdAt: '2025-01-20' },
  { id: 's2', senderId: 'u3', receiverId: 'u4', senderListingId: 'l61', receiverListingId: 'l91', status: 'accepted', message: 'Your Puma hoodie looks amazing! Interested in a swap?', createdAt: '2025-01-18' },
  { id: 's3', senderId: 'u5', receiverId: 'u6', senderListingId: 'l101', receiverListingId: 'l131', status: 'rejected', message: 'Can I swap my Forever 21 cardigan for your Ray-Bans?', createdAt: '2025-01-15' },
  { id: 's4', senderId: 'u7', receiverId: 'u8', senderListingId: 'l121', receiverListingId: 'l111', status: 'pending', message: 'Interested in swapping Converse for the Anarkali suit?', createdAt: '2025-01-22' },
  { id: 's5', senderId: 'u9', receiverId: 'u10', senderListingId: 'l79', receiverListingId: 'l140', status: 'accepted', message: 'Your Casio watch would go great with my Tommy varsity!', createdAt: '2025-01-19' },
];

export const SEED_MESSAGES = [
  { id: 'm1', senderId: 'u1', receiverId: 'u2', text: 'Hi! I\'m interested in swapping my Zara dress for your Levi\'s 501 jeans. What do you think?', timestamp: '2025-01-20T10:30:00' },
  { id: 'm2', senderId: 'u2', receiverId: 'u1', text: 'Hey Priya! That dress looks great. I\'d be interested! Can you share more details about the condition?', timestamp: '2025-01-20T11:15:00' },
  { id: 'm3', senderId: 'u1', receiverId: 'u2', text: 'It\'s in like-new condition! Worn only twice. No stains or tears at all.', timestamp: '2025-01-20T11:45:00' },
  { id: 'm4', senderId: 'u3', receiverId: 'u4', text: 'Love your Puma hoodie! Would you consider swapping for my Mango skirt?', timestamp: '2025-01-18T09:00:00' },
  { id: 'm5', senderId: 'u4', receiverId: 'u3', text: 'Sure Sneha! The hoodie is in great shape. Let\'s do it!', timestamp: '2025-01-18T14:30:00' },
  { id: 'm6', senderId: 'u7', receiverId: 'u8', text: 'Hey Meera, your Anarkali is beautiful. Any chance you\'d swap for my Converse?', timestamp: '2025-01-22T16:20:00' },
  { id: 'm7', senderId: 'u8', receiverId: 'u7', text: 'Thanks Ishaan! Let me think about it. What size are the Converse?', timestamp: '2025-01-22T18:00:00' },
];

const SEED_VERSION = 'v2-140-items';

export function getSeedData() {
  const stored = localStorage.getItem('swapstyle_seed_version');
  if (stored === SEED_VERSION) return;
  localStorage.setItem('swapstyle_users', JSON.stringify(SEED_USERS));
  localStorage.setItem('swapstyle_listings', JSON.stringify(SEED_LISTINGS));
  localStorage.setItem('swapstyle_swaps', JSON.stringify(SEED_SWAPS));
  localStorage.setItem('swapstyle_messages', JSON.stringify(SEED_MESSAGES));
  localStorage.setItem('swapstyle_seed_version', SEED_VERSION);
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
export const BRANDS = ['Zara', 'H&M', 'Nike', 'Adidas', "Levi's", 'Puma', 'Mango', 'Tommy Hilfiger', 'Anthropologie', 'Forever 21', 'Converse', 'The North Face', 'Biba', 'Allen Solly', 'Only', 'Urbanic', 'Ray-Ban', 'Vero Moda', 'Van Heusen', 'Louis Philippe', 'Peter England', 'Arrow', 'Jack & Jones', 'Uniqlo', 'Bewakoof', 'Roadster', 'Wrangler', 'Lee Cooper', 'Pepe Jeans', 'Killer', 'Flying Machine', 'Fabindia', 'W for Woman', 'Global Desi', 'Manyavar', 'Sabhyata', 'Aurelia', 'Anouk', 'Libas', 'Rangriti', 'AND', 'Marks & Spencer', 'Champion', 'UCB', 'Fossil', 'Michael Kors', 'Baggit', 'Titan', 'Aldo', 'Casio', 'Vans', 'Reebok', 'New Balance', 'Woodland', 'Bata', 'Skechers', 'Handmade', 'Other'];
