import React from 'react';
import { Sparkles, Compass, Refrigerator, Heart, ArrowRight } from 'lucide-react';
import { Recipe } from '../types';

interface HeroBannerProps {
  onOpenPantry: () => void;
  onExploreTop100: () => void;
  onSelectFeaturedRecipe: (recipe: Recipe) => void;
  featuredRecipe: Recipe;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenPantry,
  onExploreTop100,
  onSelectFeaturedRecipe,
  featuredRecipe,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF8F0] via-[#FAF0CA]/60 to-[#FCF4E8] border border-[#E85D04]/15 p-6 sm:p-10 mb-8 shadow-sm">
      {/* Decorative Warm Shapes */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#E85D04]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#2A9D8F]/10 blur-3xl pointer-events-none" />

      {/* Exploration Prompt Banner */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E85D04]/20 text-xs font-semibold text-[#E85D04] mb-5 shadow-xs backdrop-blur-xs">
        <Compass className="w-3.5 h-3.5 text-[#E85D04]" />
        <span>Feeling adventurous? Travel to {featuredRecipe.originCountry} {featuredRecipe.flag} with {featuredRecipe.localName}!</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading and Story */}
        <div className="lg:col-span-7 space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#2B2D42] leading-[1.15] tracking-tight">
            Step Into Grandma's Kitchen. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85D04] via-[#F48C06] to-[#2A9D8F]">
              Handcrafted Around the World.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed max-w-2xl">
            Authentic, slow-simmered family recipes handed down across generations. Cook with the ingredients you have right now in your pantry, or dive deep into the cultural stories that shaped human civilization.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenPantry}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#2A9D8F] hover:bg-[#238276] text-white font-semibold text-sm shadow-md shadow-[#2A9D8F]/20 transition-all cursor-pointer active:scale-95"
            >
              <Refrigerator className="w-4 h-4" />
              What's In My Fridge? (Pantry Matcher)
            </button>

            <button
              onClick={onExploreTop100}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-stone-50 text-[#2B2D42] border border-[#E85D04]/20 font-semibold text-sm shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E85D04]" />
              Top 100 Foods Around the Globe
            </button>
          </div>

          {/* Editorial Stats Strip (No fake slop counters, pure clean text) */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs font-medium text-stone-500 border-t border-stone-200/60">
            <span>1,000+ Curated Heritage Dishes</span>
            <span aria-hidden="true">·</span>
            <span>48 Continents & Regions</span>
            <span aria-hidden="true">·</span>
            <span>No Account Required · 100% Free Forever</span>
          </div>
        </div>

        {/* Right Column: Featured Recipe Showcase Card */}
        <div className="lg:col-span-5">
          <div 
            onClick={() => onSelectFeaturedRecipe(featuredRecipe)}
            className="group relative bg-white rounded-3xl p-4 border border-[#E85D04]/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-4">
              <img
                src={featuredRecipe.image}
                alt={featuredRecipe.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FAF0CA]">
                  Featured Heritage Dish {featuredRecipe.flag}
                </span>
                <h3 className="text-lg font-serif font-bold text-white leading-snug line-clamp-1">
                  {featuredRecipe.title}
                </h3>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-stone-600 line-clamp-2 italic">
                "{featuredRecipe.heritageStory}"
              </p>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <span>{featuredRecipe.prepTimeMinutes + featuredRecipe.cookTimeMinutes} mins</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredRecipe.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span>★ {featuredRecipe.rating}</span>
                </div>
                <span className="inline-flex items-center gap-1 font-semibold text-[#E85D04] group-hover:translate-x-1 transition-transform">
                  Cook Now <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
