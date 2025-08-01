import type { TravelDetails, PackingItem } from '../types';

const baseItems: Record<string, { name: string; category: string }[]> = {
  essentials: [
    { name: 'Passport', category: 'Documents' },
    { name: 'Phone Charger', category: 'Electronics' },
    { name: 'Toiletries', category: 'Personal Care' },
    { name: 'Travel Insurance', category: 'Documents' },
    { name: 'Power Bank', category: 'Electronics' },
    { name: 'First Aid Kit', category: 'Health & Safety' },
  ],
  hot: [
    { name: 'Sunscreen', category: 'Personal Care' },
    { name: 'Sunglasses', category: 'Accessories' },
    { name: 'Hat', category: 'Accessories' },
    { name: 'T-shirts', category: 'Clothing' },
    { name: 'Shorts', category: 'Clothing' },
    { name: 'Sandals', category: 'Footwear' },
    { name: 'Insect Repellent', category: 'Personal Care' },
    { name: 'Light Rain Jacket', category: 'Clothing' },
  ],
  mild: [
    { name: 'Light Jacket', category: 'Clothing' },
    { name: 'Long Sleeve Shirts', category: 'Clothing' },
    { name: 'Pants', category: 'Clothing' },
    { name: 'Walking Shoes', category: 'Footwear' },
    { name: 'Light Sweater', category: 'Clothing' },
    { name: 'Umbrella', category: 'Accessories' },
  ],
  cold: [
    { name: 'Winter Coat', category: 'Clothing' },
    { name: 'Thermal Underwear', category: 'Clothing' },
    { name: 'Gloves', category: 'Accessories' },
    { name: 'Scarf', category: 'Accessories' },
    { name: 'Winter Boots', category: 'Footwear' },
    { name: 'Wool Socks', category: 'Clothing' },
    { name: 'Hand Warmers', category: 'Accessories' },
  ],
  activities: {
    Beach: [
      { name: 'Beach Towel', category: 'Beach Gear' },
      { name: 'Swimsuit', category: 'Clothing' },
      { name: 'Beach Umbrella', category: 'Beach Gear' },
      { name: 'Beach Bag', category: 'Accessories' },
      { name: 'Water Shoes', category: 'Footwear' },
    ],
    Hiking: [
      { name: 'Hiking Boots', category: 'Footwear' },
      { name: 'Water Bottle', category: 'Equipment' },
      { name: 'First Aid Kit', category: 'Health & Safety' },
      { name: 'Hiking Poles', category: 'Equipment' },
      { name: 'Trail Map', category: 'Equipment' },
      { name: 'Backpack', category: 'Equipment' },
    ],
    'City Tours': [
      { name: 'Comfortable Walking Shoes', category: 'Footwear' },
      { name: 'Day Bag', category: 'Accessories' },
      { name: 'Camera', category: 'Electronics' },
      { name: 'City Map', category: 'Documents' },
      { name: 'Travel Guide', category: 'Documents' },
    ],
    Business: [
      { name: 'Business Suits', category: 'Clothing' },
      { name: 'Dress Shoes', category: 'Footwear' },
      { name: 'Laptop', category: 'Electronics' },
      { name: 'Business Cards', category: 'Documents' },
      { name: 'Portable Charger', category: 'Electronics' },
    ],
    'Winter Sports': [
      { name: 'Ski Jacket', category: 'Sports Gear' },
      { name: 'Ski Pants', category: 'Sports Gear' },
      { name: 'Goggles', category: 'Sports Gear' },
      { name: 'Ski Gloves', category: 'Sports Gear' },
      { name: 'Thermal Base Layer', category: 'Clothing' },
    ],
    Camping: [
      { name: 'Tent', category: 'Camping Gear' },
      { name: 'Sleeping Bag', category: 'Camping Gear' },
      { name: 'Flashlight', category: 'Equipment' },
      { name: 'Multi-tool', category: 'Equipment' },
      { name: 'Camping Stove', category: 'Camping Gear' },
    ],
    Photography: [
      { name: 'Camera Body', category: 'Photography Gear' },
      { name: 'Camera Lenses', category: 'Photography Gear' },
      { name: 'Tripod', category: 'Photography Gear' },
      { name: 'Memory Cards', category: 'Electronics' },
      { name: 'Camera Bag', category: 'Photography Gear' },
    ],
    Swimming: [
      { name: 'Swimsuit', category: 'Clothing' },
      { name: 'Goggles', category: 'Sports Gear' },
      { name: 'Swim Cap', category: 'Sports Gear' },
      { name: 'Pool Shoes', category: 'Footwear' },
      { name: 'Towel', category: 'Personal Care' },
    ],
    Cycling: [
      { name: 'Cycling Shorts', category: 'Sports Gear' },
      { name: 'Cycling Jersey', category: 'Sports Gear' },
      { name: 'Helmet', category: 'Safety Gear' },
      { name: 'Bike Repair Kit', category: 'Equipment' },
      { name: 'Water Bottle', category: 'Equipment' },
    ],
    'Cultural Events': [
      { name: 'Smart Casual Outfit', category: 'Clothing' },
      { name: 'Dress Shoes', category: 'Footwear' },
      { name: 'Event Tickets', category: 'Documents' },
      { name: 'Small Purse/Wallet', category: 'Accessories' },
    ],
    'Fine Dining': [
      { name: 'Formal Attire', category: 'Clothing' },
      { name: 'Dress Shoes', category: 'Footwear' },
      { name: 'Evening Bag', category: 'Accessories' },
      { name: 'Restaurant Reservations', category: 'Documents' },
    ],
    Shopping: [
      { name: 'Comfortable Shoes', category: 'Footwear' },
      { name: 'Shopping Bags', category: 'Accessories' },
      { name: 'Credit Cards', category: 'Documents' },
      { name: 'Shopping List', category: 'Documents' },
    ],
    'Museum Visits': [
      { name: 'Comfortable Shoes', category: 'Footwear' },
      { name: 'Light Jacket', category: 'Clothing' },
      { name: 'Museum Passes', category: 'Documents' },
      { name: 'Small Backpack', category: 'Accessories' },
    ],
    'Water Sports': [
      { name: 'Wetsuit', category: 'Sports Gear' },
      { name: 'Water Shoes', category: 'Footwear' },
      { name: 'Waterproof Bag', category: 'Equipment' },
      { name: 'Sports Sunscreen', category: 'Personal Care' },
      { name: 'Quick-dry Towel', category: 'Sports Gear' },
    ],
    Nightlife: [
      { name: 'Evening Outfits', category: 'Clothing' },
      { name: 'Dress Shoes', category: 'Footwear' },
      { name: 'ID/Documents', category: 'Documents' },
      { name: 'Small Purse/Wallet', category: 'Accessories' },
    ],
    'Spa & Wellness': [
      { name: 'Swimsuit', category: 'Clothing' },
      { name: 'Flip Flops', category: 'Footwear' },
      { name: 'Robe', category: 'Clothing' },
      { name: 'Spa Reservations', category: 'Documents' },
    ],
    Golf: [
      { name: 'Golf Clubs', category: 'Sports Gear' },
      { name: 'Golf Shoes', category: 'Footwear' },
      { name: 'Golf Gloves', category: 'Sports Gear' },
      { name: 'Golf Attire', category: 'Clothing' },
      { name: 'Tees & Balls', category: 'Sports Gear' },
    ],
    Safari: [
      { name: 'Safari Clothing', category: 'Clothing' },
      { name: 'Binoculars', category: 'Equipment' },
      { name: 'Safari Hat', category: 'Accessories' },
      { name: 'Insect Repellent', category: 'Personal Care' },
      { name: 'Camera Equipment', category: 'Photography Gear' },
    ],
    'Road Trip': [
      { name: 'Car Documents', category: 'Documents' },
      { name: 'Road Map/GPS', category: 'Equipment' },
      { name: 'Emergency Kit', category: 'Safety Gear' },
      { name: 'Snacks', category: 'Food & Drinks' },
      { name: 'Car Charger', category: 'Electronics' },
    ],
    Backpacking: [
      { name: 'Backpack', category: 'Equipment' },
      { name: 'Travel Towel', category: 'Personal Care' },
      { name: 'Universal Adapter', category: 'Electronics' },
      { name: 'Travel Lock', category: 'Safety Gear' },
      { name: 'Travel Insurance', category: 'Documents' },
    ],
  },
};

export function generatePackingList(details: TravelDetails): PackingItem[] {
  const items: PackingItem[] = [];
  const addItem = (name: string, category: string) => {
    if (!items.some(item => item.name === name)) {
      items.push({
        id: Math.random().toString(36).substr(2, 9),
        name,
        category,
        quantity: 1,
        packed: false,
      });
    }
  };

  // Add essential items
  baseItems.essentials.forEach(item => addItem(item.name, item.category));

  // Add weather-specific items
  baseItems[details.weather].forEach(item => addItem(item.name, item.category));

  // Add activity-specific items
  details.activities.forEach(activity => {
    const activityItems = baseItems.activities[activity as keyof typeof baseItems.activities];
    if (activityItems) {
      activityItems.forEach(item => addItem(item.name, item.category));
    }
  });

  // Calculate trip duration
  const start = new Date(details.startDate);
  const end = new Date(details.endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  // Adjust quantities based on trip duration
  const clothingItems = items.filter(item => item.category === 'Clothing');
  clothingItems.forEach(item => {
    item.quantity = Math.ceil(days / 2); // Assume changing clothes every 2 days
  });

  return items.sort((a, b) => a.category.localeCompare(b.category));
}