import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  Globe2, 
  Heart, 
  Filter, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Recipe, DietaryTag, Continent, MealType } from '../types';
import { RecipeCard } from './RecipeCard';

interface CollectionsHubProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  searchQuery: string;
}

type CollectionTab = 
  | 'all'
  | 'top10'
  | 'top100'
  | 'quick'
  | 'comfort'
  | 'countries';

export const CollectionsHub: React.FC<CollectionsHubProps> = ({
  recipes,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  searchQuery,
}) => {
  const [activeTab, setActiveTab] = useState<CollectionTab>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'All'>('All');
  const [selectedMaxTime, setSelectedMaxTime] = useState<number | 'Any'>('Any');
  const [selectedIngredientLimit, setSelectedIngredientLimit] = useState<number | 'Any'>('Any');
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'All'>('All');

  // Country counts
  const countryCounts = useMemo(() => {
    const counts: Record<string, { count: number; flag: string }> = {};
    recipes.forEach((r) => {
      if (!counts[r.originCountry]) {
        counts[r.originCountry] = { count: 1, flag: r.flag };
      } else {
        counts[r.originCountry].count += 1;
      }
    });
    return counts;
  }, [recipes]);

  // Filtering logic
  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(query);
        const matchesLocal = r.localName.toLowerCase().includes(query);
        const matchesCountry = r.originCountry.toLowerCase().includes(query);
        const matchesIngredients = r.ingredients.some((i) => i.name.toLowerCase().includes(query));
        if (!matchesTitle && !matchesLocal && !matchesCountry && !matchesIngredients) {
          return false;
        }
      }

      // Tab collections filter
      if (activeTab === 'top10' && !r.curationTags.includes('Top 10 Week')) return false;
      if (activeTab === 'top100' && !r.curationTags.includes('Top 100 Globe')) return false;
      if (activeTab === 'quick' && (r.prepTimeMinutes + r.cookTimeMinutes > 30)) return false;
      if (activeTab === 'comfort' && r.mealType !== 'Comfort Food') return false;

      // Country filter
      if (selectedCountry !== 'All' && r.originCountry !== selectedCountry) return false;

      // Continent filter
      if (selectedContinent !== 'All' && r.continent !== selectedContinent) return false;

      // Dietary filter
      if (selectedDietary !== 'All' && !r.dietaryTags.includes(selectedDietary)) return false;

      // Max preparation time filter
      if (selectedMaxTime !== 'Any' && (r.prepTimeMinutes + r.cookTimeMinutes) > selectedMaxTime) return false;

      // Max ingredient count filter
      if (selectedIngredientLimit !== 'Any' && r.ingredients.length > selectedIngredientLimit) return false;

      return true;
    });
  }, [
    recipes,
    activeTab,
    selectedCountry,
    selectedContinent,
    selectedDietary,
    selectedMaxTime,
    selectedIngredientLimit,
    searchQuery,
  ]);

  const dietaryOptions: (DietaryTag | 'All')[] = [
    'All',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Curation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-stone-200">
        <button
          onClick={() => {
            setActiveTab('all');
            setSelectedCountry('All');
          }}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#2B2D42] text-white shadow-xs'
              : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
          }`}
        >
          All Recipes Catalog
        </button>

        <button
          onClick={() => setActiveTab('top10')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'top10'
              ? 'bg-[#E85D04] text-white shadow-xs'
              : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          Top 10 Recipes of the Week
        </button>

        <button
          onClick={() => setActiveTab('top100')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'top100'
              ? 'bg-[#2A9D8F] text-white shadow-xs'
              : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
          }`}
        >
          <Globe2 className="w-4 h-4" />
          Top 100 Foods Around the Globe
        </button>

        <button
          onClick={() => setActiveTab('quick')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'quick'
              ? 'bg-[#E85D04] text-white shadow-xs'
              : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          Quick Dinners (&le; 25 Mins)
        </button>

        <button
          onClick={() => setActiveTab('comfort')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'comfort'
              ? 'bg-[#E85D04] text-white shadow-xs'
              : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
          }`}
        >
          <Flame className="w-4 h-4" />
          Ultimate Comfort Foods
        </button>

        <button
          onClick={() => setActiveTab('countries')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'countries'
              ? 'bg-[#2B2D42] text-white shadow-xs'
              : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
          }`}
        >
          🌍 Browse By Country
        </button>
      </div>

      {/* Interactive Country Flag Selector if in 'countries' tab or 'all' */}
      {(activeTab === 'countries' || selectedCountry !== 'All') && (
        <div className="bg-white p-5 rounded-3xl border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
              Select Country of Origin:
            </span>
            {selectedCountry !== 'All' && (
              <button
                onClick={() => setSelectedCountry('All')}
                className="text-xs text-[#E85D04] font-semibold hover:underline cursor-pointer"
              >
                Clear Country Filter (Show All)
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCountry('All')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                selectedCountry === 'All'
                  ? 'bg-[#2B2D42] text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Nations ({recipes.length})
            </button>
            {Object.entries(countryCounts).map(([country, { count, flag }]) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer border ${
                  selectedCountry === country
                    ? 'bg-[#E85D04] border-[#E85D04] text-white shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
              >
                <span>{flag}</span>
                <span>{country}</span>
                <span className="opacity-70 text-[10px]">({count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Multi-Dimensional Filter Bar */}
      <div className="bg-[#FFF8F0] p-4 sm:p-5 rounded-3xl border border-[#E85D04]/15 flex flex-wrap items-center justify-between gap-4">
        
        {/* Dietary Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#2A9D8F]" /> Dietary:
          </span>
          {dietaryOptions.map((diet) => (
            <button
              key={diet}
              onClick={() => setSelectedDietary(diet)}
              className={`px-3 py-1 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
                selectedDietary === diet
                  ? 'bg-[#2A9D8F] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {diet}
            </button>
          ))}
        </div>

        {/* Prep Time & Ingredients Count Dropdowns */}
        <div className="flex items-center gap-3">
          {/* Prep time */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-stone-500 font-medium">Time:</span>
            <select
              value={selectedMaxTime}
              onChange={(e) => setSelectedMaxTime(e.target.value === 'Any' ? 'Any' : Number(e.target.value))}
              className="bg-white border border-stone-200 text-stone-700 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#E85D04]"
            >
              <option value="Any">Any Duration</option>
              <option value="25">≤ 25 mins</option>
              <option value="45">≤ 45 mins</option>
              <option value="90">≤ 90 mins</option>
            </select>
          </div>

          {/* Ingredient limit */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-stone-500 font-medium">Ingredients:</span>
            <select
              value={selectedIngredientLimit}
              onChange={(e) => setSelectedIngredientLimit(e.target.value === 'Any' ? 'Any' : Number(e.target.value))}
              className="bg-white border border-stone-200 text-stone-700 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#E85D04]"
            >
              <option value="Any">Any Count</option>
              <option value="8">≤ 8 items (Simple)</option>
              <option value="10">≤ 10 items</option>
            </select>
          </div>
        </div>

      </div>

      {/* Recipes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>Showing <strong>{filteredRecipes.length}</strong> authentic global recipes</span>
          {searchQuery && (
            <span>Filtered for query: "<strong>{searchQuery}</strong>"</span>
          )}
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
            <Globe2 className="w-12 h-12 mx-auto text-stone-300" />
            <h4 className="font-serif text-lg font-bold text-[#2B2D42]">
              No dishes found matching your criteria
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your dietary filter, prep time limit, or clear the search query to discover more global recipes.
            </p>
            <button
              onClick={() => {
                setSelectedCountry('All');
                setSelectedDietary('All');
                setSelectedMaxTime('Any');
                setSelectedIngredientLimit('Any');
                setActiveTab('all');
              }}
              className="px-4 py-2 bg-[#E85D04] text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={onSelectRecipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
