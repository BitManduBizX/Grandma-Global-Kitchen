export type Continent = 
  | 'Europe'
  | 'Asia'
  | 'Americas'
  | 'Africa'
  | 'Middle East'
  | 'Oceania';

export type DietaryTag = 
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Dairy-Free'
  | 'Nut-Free'
  | 'Halal-Friendly';

export type MealType = 
  | 'Quick Dinners'
  | 'Comfort Food'
  | 'Soups & Stews'
  | 'Heritage Breads'
  | 'Dinner Classics'
  | 'Sweet Traditions';

export interface Ingredient {
  name: string;
  amountMetric: number;
  unitMetric: string;
  amountImperial: number;
  unitImperial: string;
  notes?: string;
  category: 'Produce' | 'Protein' | 'Grains' | 'Dairy & Fats' | 'Pantry & Spices';
  pantryKey: string;
}

export interface InstructionStep {
  stepNumber: number;
  title: string;
  text: string;
  timerMinutes?: number;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber: number;   // in grams
}

export interface Recipe {
  id: string;
  title: string;
  localName: string;
  originCountry: string;
  continent: Continent;
  region: string;
  flag: string;
  heritageStory: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Intermediate' | 'Masterclass';
  mealType: MealType;
  dietaryTags: DietaryTag[];
  image: string;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  secretGrandmaTip: string;
  nutrition: NutritionInfo;
  curationTags: ('Top 10 Week' | 'Top 100 Globe' | 'Quick Dinner' | 'Comfort Food' | 'Dinner Classic')[];
  rating: number;
  reviewCount: number;
}

export interface FoodTradition {
  id: string;
  title: string;
  subtitle: string;
  category: 'Migration & History' | 'Seasonal Wisdom' | 'Ancestral Techniques' | 'Hearth Rituals';
  region: string;
  continent: Continent;
  readTimeMinutes: number;
  image: string;
  summary: string;
  fullStory: string[];
  keyTakeaways: string[];
  featuredDishes: string[];
  grandmaQuote: string;
}

export interface PantryStaple {
  id: string;
  name: string;
  category: 'Produce' | 'Protein' | 'Grains' | 'Dairy & Fats' | 'Pantry & Spices';
  common: boolean;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'grandma';
  text: string;
  timestamp: string;
  recipeName?: string;
}
