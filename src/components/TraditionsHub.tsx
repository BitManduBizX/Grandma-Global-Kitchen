import React, { useState } from 'react';
import { 
  BookOpen, 
  Compass, 
  Flame, 
  Sparkles, 
  Clock, 
  Quote, 
  Check, 
  ChevronRight,
  Globe2,
  UtensilsCrossed
} from 'lucide-react';
import { FoodTradition, Continent } from '../types';
import { FOOD_TRADITIONS, CULINARY_AROMATIC_BASES } from '../data/traditions';

interface TraditionsHubProps {
  onOpenDishByName?: (dishName: string) => void;
}

export const TraditionsHub: React.FC<TraditionsHubProps> = ({ onOpenDishByName }) => {
  const [selectedTradition, setSelectedTradition] = useState<FoodTradition | null>(FOOD_TRADITIONS[0]);
  const [activeBaseIndex, setActiveBaseIndex] = useState(0);
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'All'>('All');

  const filteredTraditions = selectedContinent === 'All'
    ? FOOD_TRADITIONS
    : FOOD_TRADITIONS.filter((t) => t.continent === selectedContinent);

  const continents: (Continent | 'All')[] = ['All', 'Asia', 'Europe', 'Africa', 'Americas'];

  return (
    <div className="space-y-12 animate-in fade-in duration-300 pb-12">
      
      {/* Editorial Header */}
      <div className="bg-gradient-to-r from-[#FAF0CA]/60 via-[#FFF8F0] to-[#FAF0CA]/40 p-8 sm:p-10 rounded-3xl border border-[#E85D04]/15 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-semibold text-[#E85D04] border border-[#E85D04]/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Living Heritage of Human Foodways</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2B2D42] tracking-tight">
          Food Traditions, Migration & Ancestral Wisdom
        </h2>
        <p className="text-stone-700 text-sm sm:text-base max-w-3xl leading-relaxed">
          Before modern industrial supply chains, cooking was an intimate collaboration between soil, climate, fermentation, and the loving hands of grandmothers. Explore how recipes survived wars, migrations, and bitter winters to become the comfort foods we celebrate today.
        </p>

        {/* Filter by Continent */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Explore Region:
          </span>
          {continents.map((continent) => (
            <button
              key={continent}
              onClick={() => setSelectedContinent(continent)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                selectedContinent === continent
                  ? 'bg-[#E85D04] text-white shadow-xs'
                  : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
              }`}
            >
              {continent === 'All' ? '🌍 All World Traditions' : continent}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Deep Dive Tradition & Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Tradition Navigation List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs uppercase font-bold text-stone-500 tracking-wider">
            Curated Heritage Chronicles
          </h3>

          <div className="space-y-3">
            {filteredTraditions.map((tradition) => {
              const isSelected = selectedTradition?.id === tradition.id;
              return (
                <div
                  key={tradition.id}
                  onClick={() => setSelectedTradition(tradition)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-center ${
                    isSelected
                      ? 'bg-white border-[#E85D04] shadow-md ring-1 ring-[#E85D04]'
                      : 'bg-white/70 border-stone-200 hover:border-stone-300 hover:bg-white'
                  }`}
                >
                  <img
                    src={tradition.image}
                    alt={tradition.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <span className="text-[#2A9D8F] font-semibold">{tradition.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{tradition.readTimeMinutes}m read</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#2B2D42] line-clamp-1 leading-snug">
                      {tradition.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2">
                      {tradition.summary}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#E85D04] translate-x-1' : 'text-stone-300'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Tradition Article Reader */}
        {selectedTradition && (
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-sm">
              <img
                src={selectedTradition.image}
                alt={selectedTradition.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#FAF0CA]">
                  {selectedTradition.region} · {selectedTradition.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                  {selectedTradition.title}
                </h3>
              </div>
            </div>

            <p className="font-serif text-base text-stone-800 italic leading-relaxed bg-[#FFF8F0] p-4 rounded-2xl border border-[#E85D04]/10">
              "{selectedTradition.subtitle}"
            </p>

            {/* Grandma Wisdom Quote */}
            <div className="p-4 bg-amber-50 rounded-2xl border-l-4 border-amber-500 flex items-start gap-3">
              <Quote className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium text-amber-900 italic">
                "{selectedTradition.grandmaQuote}"
              </p>
            </div>

            {/* Full Story Paragraphs */}
            <div className="space-y-4 text-sm text-stone-700 leading-relaxed font-sans">
              {selectedTradition.fullStory.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Key Ancestral Insights */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-3">
              <h5 className="text-xs uppercase font-bold text-stone-700 tracking-wider">
                Key Ancestral Takeaways
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                {selectedTradition.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Connected Recipes */}
            <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-500 font-medium">
                Dishes honoring this tradition:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedTradition.featuredDishes.map((dish) => (
                  <span
                    key={dish}
                    className="font-semibold text-[#E85D04] bg-[#FFF8F0] px-3 py-1 rounded-lg border border-[#E85D04]/20"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Global Aromatic Bases Explorer ("The Mother Sauces of the Earth") */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A9D8F] uppercase tracking-wider">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Universal Food Alchemy</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2D42]">
              The 6 Sacred Aromatic Bases of World Cuisine
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Almost every great pot starts with one of these foundational combinations. Master these, and you can cook any dish on earth without a recipe!
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 border-b border-stone-100 pb-3">
          {CULINARY_AROMATIC_BASES.map((base, idx) => (
            <button
              key={base.name}
              onClick={() => setActiveBaseIndex(idx)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeBaseIndex === idx
                  ? 'bg-[#2B2D42] text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {base.name} ({base.culture})
            </button>
          ))}
        </div>

        {/* Selected Base Breakdown */}
        {CULINARY_AROMATIC_BASES[activeBaseIndex] && (
          <div className="bg-[#FFF8F0] p-6 rounded-2xl border border-[#E85D04]/15 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-[#E85D04] tracking-wider">
                Region & Core Ingredients
              </span>
              <h4 className="font-serif text-xl font-bold text-[#2B2D42]">
                {CULINARY_AROMATIC_BASES[activeBaseIndex].name}
              </h4>
              <p className="text-xs text-stone-600">
                Culture: <strong>{CULINARY_AROMATIC_BASES[activeBaseIndex].culture}</strong>
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {CULINARY_AROMATIC_BASES[activeBaseIndex].ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs font-medium bg-white px-2.5 py-1 rounded-lg border border-stone-200 text-stone-800"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-[#2A9D8F] tracking-wider">
                How Grandmothers Cook It
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                {CULINARY_AROMATIC_BASES[activeBaseIndex].cookingMethod}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                Iconic Dishes Born from This
              </span>
              <div className="space-y-1">
                {CULINARY_AROMATIC_BASES[activeBaseIndex].iconicDishes.map((dish) => (
                  <div key={dish} className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D04]" />
                    <span>{dish}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
