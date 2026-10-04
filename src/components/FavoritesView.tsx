import React from 'react';
import { Heart, Sparkles, ChefHat, ArrowLeft } from 'lucide-react';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

interface FavoritesViewProps {
  recipes: Recipe[];
  favorites: string[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onBackToExplore: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  recipes,
  favorites,
  onSelectRecipe,
  onToggleFavorite,
  onBackToExplore,
}) => {
  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2D42]">
              Your Saved Recipes ({favoriteRecipes.length})
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Personal heirloom dishes bookmarked for family dinners and weekend gatherings
            </p>
          </div>
        </div>

        <button
          onClick={onBackToExplore}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Discover More Dishes
        </button>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
          <Heart className="w-12 h-12 mx-auto text-stone-300" />
          <h3 className="font-serif text-xl font-bold text-[#2B2D42]">
            Your recipe heirloom box is empty
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Whenever a dish catches your eye, tap the little heart icon on its card to save it right here for your next cooking adventure.
          </p>
          <button
            onClick={onBackToExplore}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#E85D04] hover:bg-[#F48C06] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Explore Top 100 Foods Around the Globe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={onSelectRecipe}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}

    </div>
  );
};
