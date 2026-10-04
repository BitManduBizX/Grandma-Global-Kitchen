import React, { useState, useMemo } from 'react';
import { 
  Refrigerator, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles, 
  ChefHat, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { Recipe, PantryStaple } from '../types';
import { PANTRY_STAPLES, PANTRY_PRESETS } from '../data/pantryStaples';
import { RecipeCard } from './RecipeCard';

interface PantryMatcherProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onAskGrandmaForSub: (missingItem: string, recipeTitle: string) => void;
}

export const PantryMatcher: React.FC<PantryMatcherProps> = ({
  recipes,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  onAskGrandmaForSub,
}) => {
  const [selectedStaples, setSelectedStaples] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kitchen_selected_pantry');
      return saved ? JSON.parse(saved) : ['garlic', 'onion', 'olive_oil', 'egg', 'rice', 'tomato'];
    } catch {
      return ['garlic', 'onion', 'olive_oil', 'egg', 'rice', 'tomato'];
    }
  });

  const [customInput, setCustomInput] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [matchFilter, setMatchFilter] = useState<'all' | 'exact' | 'almost'>('all');

  // Persist to local storage
  const updateSelectedStaples = (newItems: string[]) => {
    setSelectedStaples(newItems);
    try {
      localStorage.setItem('kitchen_selected_pantry', JSON.stringify(newItems));
    } catch {
      // ignore
    }
  };

  const toggleStaple = (id: string) => {
    if (selectedStaples.includes(id)) {
      updateSelectedStaples(selectedStaples.filter((item) => item !== id));
    } else {
      updateSelectedStaples([...selectedStaples, id]);
    }
  };

  const applyPreset = (presetItems: string[]) => {
    const combined = Array.from(new Set([...selectedStaples, ...presetItems]));
    updateSelectedStaples(combined);
  };

  const clearAllStaples = () => {
    updateSelectedStaples([]);
  };

  const addCustomStaple = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customInput.trim().toLowerCase().replace(/\s+/g, '_');
    if (clean && !selectedStaples.includes(clean)) {
      updateSelectedStaples([...selectedStaples, clean]);
      setCustomInput('');
    }
  };

  // Recipe matching logic
  const matchedRecipes = useMemo(() => {
    if (selectedStaples.length === 0) return [];

    return recipes
      .map((recipe) => {
        const totalCount = recipe.ingredients.length;
        const missing: string[] = [];
        let matchCount = 0;

        recipe.ingredients.forEach((ing) => {
          const key = ing.pantryKey.toLowerCase();
          const name = ing.name.toLowerCase();
          const isMatched = selectedStaples.some(
            (staple) => key.includes(staple) || staple.includes(key) || name.includes(staple)
          );

          if (isMatched) {
            matchCount++;
          } else {
            missing.push(ing.name);
          }
        });

        const percentage = Math.round((matchCount / totalCount) * 100);

        return {
          recipe,
          match: {
            matchCount,
            totalCount,
            percentage,
            missingIngredients: missing,
          },
        };
      })
      .filter((item) => {
        if (matchFilter === 'exact') return item.match.percentage === 100;
        if (matchFilter === 'almost') return item.match.missingIngredients.length <= 2;
        return item.match.percentage > 25; // return at least partial match
      })
      .sort((a, b) => b.match.percentage - a.match.percentage);
  }, [recipes, selectedStaples, matchFilter]);

  const categories = ['All', 'Produce', 'Protein', 'Grains', 'Dairy & Fats', 'Pantry & Spices'];

  const filteredStaples = useMemo(() => {
    if (activeCategory === 'All') return PANTRY_STAPLES;
    return PANTRY_STAPLES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header and Story */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E85D04]/15 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2A9D8F]/15 text-[#2A9D8F] flex items-center justify-center">
              <Refrigerator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2D42]">
                Grandma's Pantry Matcher
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Pick the ingredients you have at home. We'll find authentic meals you can make right now!
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Quick Bundles:
            </span>
            {PANTRY_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.items)}
                className="text-xs font-medium px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-[#FAF0CA] text-stone-700 hover:text-[#2B2D42] transition-colors cursor-pointer"
                title={preset.description}
              >
                + {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Ingredients Bar */}
        <div className="p-4 bg-[#FFF8F0] rounded-2xl border border-[#E85D04]/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#E85D04] uppercase tracking-wider">
              Your Kitchen Pantry ({selectedStaples.length} items on hand):
            </span>
            {selectedStaples.length > 0 && (
              <button
                onClick={clearAllStaples}
                className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedStaples.length === 0 ? (
              <p className="text-xs text-stone-500 italic py-1">
                Your pantry is currently empty. Tap common staples below or type custom ingredients!
              </p>
            ) : (
              selectedStaples.map((staple) => (
                <button
                  key={staple}
                  onClick={() => toggleStaple(staple)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#2B2D42] text-xs font-semibold rounded-xl border border-[#2A9D8F]/40 shadow-2xs hover:bg-rose-50 hover:border-rose-300 transition-all cursor-pointer group"
                >
                  <Check className="w-3.5 h-3.5 text-[#2A9D8F] group-hover:hidden" />
                  <span className="capitalize">{staple.replace(/_/g, ' ')}</span>
                  <span className="text-stone-400 group-hover:text-rose-500 ml-1">✕</span>
                </button>
              ))
            )}
          </div>

          {/* Add custom item form */}
          <form onSubmit={addCustomStaple} className="flex gap-2 pt-1">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Add another ingredient (e.g. coconut milk, thyme, prawns)..."
              className="flex-1 px-4 py-2 bg-white text-xs text-[#2B2D42] rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 px-4 py-2 bg-[#2A9D8F] text-white text-xs font-semibold rounded-xl hover:bg-[#238276] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </form>
        </div>

        {/* Category Filter Tabs for Common Staples */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-100 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#2B2D42] text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Staples Grid */}
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
            {filteredStaples.map((staple) => {
              const isSelected = selectedStaples.includes(staple.id);
              return (
                <button
                  key={staple.id}
                  onClick={() => toggleStaple(staple.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#2A9D8F] border-[#2A9D8F] text-white shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {staple.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Matched Results Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2B2D42]">
              Matching Dishes ({matchedRecipes.length})
            </h3>
            <p className="text-xs text-stone-500">
              Ranked by ingredients you already have in your kitchen
            </p>
          </div>

          {/* Match Filter Segmented Control */}
          <div className="inline-flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setMatchFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                matchFilter === 'all' ? 'bg-white text-[#2B2D42] shadow-xs' : 'text-stone-600'
              }`}
            >
              All Matches
            </button>
            <button
              onClick={() => setMatchFilter('almost')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                matchFilter === 'almost' ? 'bg-white text-[#2B2D42] shadow-xs' : 'text-stone-600'
              }`}
            >
              Missing ≤ 2 Items
            </button>
            <button
              onClick={() => setMatchFilter('exact')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                matchFilter === 'exact' ? 'bg-white text-[#2B2D42] shadow-xs' : 'text-stone-600'
              }`}
            >
              100% Ready (0 Missing)
            </button>
          </div>
        </div>

        {matchedRecipes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
            <ChefHat className="w-12 h-12 mx-auto text-[#E85D04]/60" />
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-bold text-[#2B2D42]">
                No exact recipe matches found for this filter
              </h4>
              <p className="text-sm text-stone-500 max-w-md mx-auto">
                Try switching the filter to "All Matches", or add a few more staple ingredients like eggs, onions, or rice above!
              </p>
            </div>
            <button
              onClick={() => setMatchFilter('all')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#E85D04] text-white text-xs font-semibold rounded-xl shadow-xs"
            >
              Show All Partial Matches
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedRecipes.map(({ recipe, match }) => (
              <div key={recipe.id} className="flex flex-col">
                <RecipeCard
                  recipe={recipe}
                  onSelect={onSelectRecipe}
                  isFavorite={favorites.includes(recipe.id)}
                  onToggleFavorite={onToggleFavorite}
                  pantryMatch={match}
                />

                {/* Missing Ingredient Callout with Grandma AI Substitution Link */}
                {match.missingIngredients.length > 0 && match.missingIngredients.length <= 3 && (
                  <div className="mt-2 p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2">
                    <span className="truncate">
                      Missing: <strong>{match.missingIngredients.slice(0, 2).join(', ')}</strong>
                    </span>
                    <button
                      onClick={() => onAskGrandmaForSub(match.missingIngredients[0], recipe.title)}
                      className="shrink-0 text-[#E85D04] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      Substitute?
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
