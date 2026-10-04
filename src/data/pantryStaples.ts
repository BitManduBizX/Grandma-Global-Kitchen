import { PantryStaple } from '../types';

export const PANTRY_STAPLES: PantryStaple[] = [
  // Produce
  { id: 'garlic', name: 'Garlic', category: 'Produce', common: true },
  { id: 'onion', name: 'Onion (Yellow or Red)', category: 'Produce', common: true },
  { id: 'tomato', name: 'Tomatoes / Canned Tomatoes', category: 'Produce', common: true },
  { id: 'potato', name: 'Potatoes', category: 'Produce', common: true },
  { id: 'ginger', name: 'Fresh Ginger', category: 'Produce', common: true },
  { id: 'lemon', name: 'Lemon / Lime', category: 'Produce', common: true },
  { id: 'carrot', name: 'Carrots', category: 'Produce', common: true },
  { id: 'celery', name: 'Celery', category: 'Produce', common: false },
  { id: 'spinach', name: 'Spinach / Greens', category: 'Produce', common: true },
  { id: 'cilantro', name: 'Cilantro / Coriander', category: 'Produce', common: true },
  { id: 'basil', name: 'Fresh Basil', category: 'Produce', common: false },
  { id: 'chili', name: 'Fresh Chilies / Jalapeño', category: 'Produce', common: true },
  { id: 'mushroom', name: 'Mushrooms', category: 'Produce', common: false },
  { id: 'scallion', name: 'Green Onions / Scallions', category: 'Produce', common: true },
  { id: 'bell_pepper', name: 'Bell Peppers', category: 'Produce', common: true },

  // Proteins
  { id: 'egg', name: 'Eggs', category: 'Protein', common: true },
  { id: 'chicken', name: 'Chicken (Breast or Thigh)', category: 'Protein', common: true },
  { id: 'beef', name: 'Beef / Ground Beef', category: 'Protein', common: true },
  { id: 'pork', name: 'Pork Belly or Chops', category: 'Protein', common: false },
  { id: 'tofu', name: 'Tofu', category: 'Protein', common: false },
  { id: 'shrimp', name: 'Shrimp / Prawns', category: 'Protein', common: false },
  { id: 'chickpea', name: 'Chickpeas (Garbanzo)', category: 'Protein', common: true },
  { id: 'black_bean', name: 'Black Beans / Kidney Beans', category: 'Protein', common: true },
  { id: 'lentils', name: 'Lentils (Red or Brown)', category: 'Protein', common: true },

  // Grains & Starches
  { id: 'rice', name: 'White or Jasmine Rice', category: 'Grains', common: true },
  { id: 'basmati', name: 'Basmati Rice', category: 'Grains', common: false },
  { id: 'pasta', name: 'Pasta / Spaghetti / Noodles', category: 'Grains', common: true },
  { id: 'flour', name: 'All-Purpose Flour', category: 'Grains', common: true },
  { id: 'corn_tortilla', name: 'Corn or Flour Tortillas', category: 'Grains', common: true },
  { id: 'bread', name: 'Crusty Bread / Sourdough', category: 'Grains', common: true },
  { id: 'couscous', name: 'Couscous / Semolina', category: 'Grains', common: false },

  // Dairy & Fats
  { id: 'olive_oil', name: 'Extra Virgin Olive Oil', category: 'Dairy & Fats', common: true },
  { id: 'butter', name: 'Butter (Unsalted)', category: 'Dairy & Fats', common: true },
  { id: 'milk', name: 'Milk (Whole or Dairy-free)', category: 'Dairy & Fats', common: true },
  { id: 'parmesan', name: 'Parmesan / Pecorino', category: 'Dairy & Fats', common: true },
  { id: 'feta', name: 'Feta Cheese', category: 'Dairy & Fats', common: false },
  { id: 'heavy_cream', name: 'Heavy Cream / Cooking Cream', category: 'Dairy & Fats', common: false },
  { id: 'coconut_milk', name: 'Coconut Milk (Canned)', category: 'Dairy & Fats', common: true },
  { id: 'ghee', name: 'Ghee (Clarified Butter)', category: 'Dairy & Fats', common: false },

  // Pantry & Spices
  { id: 'soy_sauce', name: 'Soy Sauce / Tamari', category: 'Pantry & Spices', common: true },
  { id: 'cumin', name: 'Ground Cumin', category: 'Pantry & Spices', common: true },
  { id: 'paprika', name: 'Smoked or Sweet Paprika', category: 'Pantry & Spices', common: true },
  { id: 'turmeric', name: 'Turmeric Powder', category: 'Pantry & Spices', common: true },
  { id: 'oregano', name: 'Dried Oregano', category: 'Pantry & Spices', common: true },
  { id: 'cinnamon', name: 'Cinnamon', category: 'Pantry & Spices', common: true },
  { id: 'sesame_oil', name: 'Toasted Sesame Oil', category: 'Pantry & Spices', common: false },
  { id: 'fish_sauce', name: 'Fish Sauce', category: 'Pantry & Spices', common: false },
  { id: 'vinegar', name: 'Vinegar (Apple Cider / Rice / Wine)', category: 'Pantry & Spices', common: true },
  { id: 'honey', name: 'Honey or Brown Sugar', category: 'Pantry & Spices', common: true },
  { id: 'bay_leaf', name: 'Bay Leaves', category: 'Pantry & Spices', common: true },
  { id: 'black_pepper', name: 'Black Pepper & Sea Salt', category: 'Pantry & Spices', common: true }
];

export const PANTRY_PRESETS = [
  {
    name: 'Everyday Essentials',
    description: 'The foundation of 90% of home kitchens around the globe',
    items: ['garlic', 'onion', 'olive_oil', 'butter', 'egg', 'flour', 'rice', 'tomato', 'black_pepper'],
  },
  {
    name: 'Mediterranean Hearth',
    description: 'Fragrant herbs, extra virgin olive oil, garlic, and fresh vegetables',
    items: ['garlic', 'onion', 'olive_oil', 'tomato', 'basil', 'oregano', 'parmesan', 'feta', 'lemon', 'pasta'],
  },
  {
    name: 'Asian Homestyle',
    description: 'Ginger, garlic, scallions, soy sauce, and aromatic sesame oil',
    items: ['garlic', 'ginger', 'scallion', 'soy_sauce', 'sesame_oil', 'rice', 'egg', 'chili', 'chicken'],
  },
  {
    name: 'Latin American Heart',
    description: 'Onions, garlic, cilantro, tomatoes, lime, and hearty beans',
    items: ['onion', 'garlic', 'cilantro', 'tomato', 'lemon', 'corn_tortilla', 'black_bean', 'cumin', 'chicken'],
  },
  {
    name: 'Comfort Curries & Dal',
    description: 'Fragrant turmeric, cumin, ginger, garlic, lentils, and basmati',
    items: ['ginger', 'garlic', 'onion', 'turmeric', 'cumin', 'lentils', 'chickpea', 'coconut_milk', 'basmati'],
  },
];
