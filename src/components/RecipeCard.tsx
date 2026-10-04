import React from 'react';
import { Heart, Clock, Utensils, Star, Sparkles, ChefHat } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  pantryMatch?: {
    matchCount: number;
    totalCount: number;
    percentage: number;
    missingIngredients: string[];
  };
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelect,
  isFavorite,
  onToggleFavorite,
  pantryMatch,
}) => {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <article
      onClick={() => onSelect(recipe)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-[#E85D04]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Recipe Image with Flag and Favorite Heart */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Origin Flag Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-xs rounded-full text-xs font-semibold text-[#2B2D42] shadow-xs flex items-center gap-1.5">
          <span className="text-base">{recipe.flag}</span>
          <span>{recipe.originCountry}</span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite(recipe.id, e)}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-stone-600 hover:text-rose-500 shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title={isFavorite ? 'Remove from saved' : 'Save recipe'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-700'}`} />
        </button>

        {/* Supercook / Pantry Match Indicator on Image if active */}
        {pantryMatch && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className={`px-3 py-1.5 rounded-xl backdrop-blur-md text-xs font-semibold flex items-center justify-between text-white ${
              pantryMatch.percentage === 100 
                ? 'bg-emerald-600/90' 
                : pantryMatch.percentage >= 70 
                ? 'bg-[#E85D04]/90' 
                : 'bg-stone-800/85'
            }`}>
              <span>
                {pantryMatch.percentage === 100 ? '✨ 100% Ready to Cook!' : `You have ${pantryMatch.matchCount} of ${pantryMatch.totalCount} items`}
              </span>
              <span className="font-mono font-bold">{pantryMatch.percentage}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
            <span className="text-[#2A9D8F] font-semibold">{recipe.mealType}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {totalTime}m
            </span>
            <span aria-hidden="true">·</span>
            <span>{recipe.difficulty}</span>
          </div>

          {/* Recipe Title & Local Name */}
          <h3 className="font-serif text-lg font-bold text-[#2B2D42] group-hover:text-[#E85D04] transition-colors leading-snug line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-xs text-stone-500 italic line-clamp-1 font-serif">
            {recipe.localName}
          </p>

          {/* Grandma's Secret Tip Snippet */}
          <div className="bg-[#FFF8F0] p-3 rounded-2xl border border-[#E85D04]/10 text-xs text-stone-700 flex items-start gap-2">
            <ChefHat className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
            <p className="line-clamp-2 italic">
              <strong className="font-semibold text-[#E85D04] not-italic">Nonna's Tip:</strong> {recipe.secretGrandmaTip}
            </p>
          </div>
        </div>

        {/* Card Footer: Rating and Servings */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-1 text-amber-600 font-semibold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{recipe.rating}</span>
            <span className="text-stone-400 font-normal">({recipe.reviewCount})</span>
          </div>

          <span className="font-medium text-[#E85D04] group-hover:underline">
            View Recipe →
          </span>
        </div>
      </div>
    </article>
  );
};
