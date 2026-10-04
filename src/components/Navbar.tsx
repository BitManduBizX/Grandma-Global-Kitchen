import React from 'react';
import { 
  Soup, 
  Search, 
  Refrigerator, 
  BookOpen, 
  BotMessageSquare, 
  Heart, 
  Scale, 
  Sparkles 
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'recipes' | 'pantry' | 'traditions' | 'ai' | 'favorites';
  setActiveTab: (tab: 'recipes' | 'pantry' | 'traditions' | 'ai' | 'favorites') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  unitSystem: 'metric' | 'imperial';
  setUnitSystem: (system: 'metric' | 'imperial') => void;
  favoritesCount: number;
  openAskGrandma: (prefillPrompt?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  unitSystem,
  setUnitSystem,
  favoritesCount,
  openAskGrandma,
}) => {
  return (
    <>
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-[#E85D04]/10 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Brand Logo */}
            <button 
              onClick={() => setActiveTab('recipes')} 
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E85D04] to-[#F48C06] text-white flex items-center justify-center shadow-md shadow-[#E85D04]/20 group-hover:scale-105 transition-transform">
                <Soup className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2B2D42] group-hover:text-[#E85D04] transition-colors">
                  Grandma's Global Kitchen
                </span>
                <span className="hidden sm:block text-xs font-medium text-[#2A9D8F] tracking-wide">
                  The World's Recipe Book — Homemade & Connected
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#FAF0CA]/50 p-1.5 rounded-2xl border border-[#E85D04]/10">
              <button
                onClick={() => setActiveTab('recipes')}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                  activeTab === 'recipes'
                    ? 'bg-white text-[#E85D04] shadow-sm font-semibold'
                    : 'text-[#2B2D42]/80 hover:text-[#2B2D42] hover:bg-white/50'
                }`}
              >
                All Recipes
              </button>

              <button
                onClick={() => setActiveTab('pantry')}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                  activeTab === 'pantry'
                    ? 'bg-white text-[#2A9D8F] shadow-sm font-semibold'
                    : 'text-[#2B2D42]/80 hover:text-[#2B2D42] hover:bg-white/50'
                }`}
              >
                <Refrigerator className="w-4 h-4 text-[#2A9D8F]" />
                Pantry Matcher
              </button>

              <button
                onClick={() => setActiveTab('traditions')}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                  activeTab === 'traditions'
                    ? 'bg-white text-[#E85D04] shadow-sm font-semibold'
                    : 'text-[#2B2D42]/80 hover:text-[#2B2D42] hover:bg-white/50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Cultural Traditions
              </button>

              <button
                onClick={() => openAskGrandma()}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-white text-[#E85D04] shadow-sm font-semibold'
                    : 'text-[#2B2D42]/80 hover:text-[#2B2D42] hover:bg-white/50'
                }`}
              >
                <BotMessageSquare className="w-4 h-4 text-[#E85D04]" />
                Ask Grandma
              </button>
            </nav>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Unit System Switcher */}
              <button
                onClick={() => setUnitSystem(unitSystem === 'metric' ? 'imperial' : 'metric')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-[#E85D04]/20 text-[#2B2D42] hover:border-[#E85D04] transition-colors cursor-pointer shadow-xs"
                title={`Switch to ${unitSystem === 'metric' ? 'Imperial (oz, cups)' : 'Metric (g, ml)'}`}
              >
                <Scale className="w-3.5 h-3.5 text-[#2A9D8F]" />
                <span>{unitSystem === 'metric' ? 'Metric (g/ml)' : 'Imperial (oz/cups)'}</span>
              </button>

              {/* Favorites Button */}
              <button
                onClick={() => setActiveTab('favorites')}
                className={`relative p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  activeTab === 'favorites'
                    ? 'bg-[#E85D04] border-[#E85D04] text-white'
                    : 'bg-white border-[#E85D04]/20 text-[#2B2D42] hover:border-[#E85D04]'
                }`}
                title="Saved Recipes"
              >
                <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-current text-rose-500' : ''}`} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#E85D04] text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#FFF8F0]">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Ask Grandma Highlight CTA */}
              <button
                onClick={() => openAskGrandma()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#F48C06] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#E85D04]/20 transition-all cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Ask Grandma</span>
                <span className="sm:hidden">AI</span>
              </button>
            </div>

          </div>

          {/* Search bar row */}
          <div className="pb-3 pt-1">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 1,000+ authentic global dishes, countries, or ingredients (e.g. Bolognese, Mexico, Ginger)..."
                className="w-full pl-11 pr-10 py-2.5 bg-white text-sm text-[#2B2D42] placeholder-stone-400 rounded-2xl border border-[#E85D04]/20 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#E85D04]/50 focus:border-[#E85D04] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E85D04]/15 px-3 py-2 shadow-lg flex items-center justify-around">
        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            activeTab === 'recipes' ? 'text-[#E85D04] font-bold' : 'text-stone-500'
          }`}
        >
          <Soup className="w-5 h-5" />
          <span>Recipes</span>
        </button>

        <button
          onClick={() => setActiveTab('pantry')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            activeTab === 'pantry' ? 'text-[#2A9D8F] font-bold' : 'text-stone-500'
          }`}
        >
          <Refrigerator className="w-5 h-5" />
          <span>Pantry</span>
        </button>

        <button
          onClick={() => setActiveTab('traditions')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            activeTab === 'traditions' ? 'text-[#E85D04] font-bold' : 'text-stone-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Heritage</span>
        </button>

        <button
          onClick={() => openAskGrandma()}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            activeTab === 'ai' ? 'text-[#E85D04] font-bold' : 'text-stone-500'
          }`}
        >
          <BotMessageSquare className="w-5 h-5 text-[#E85D04]" />
          <span>Grandma AI</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            activeTab === 'favorites' ? 'text-rose-500 font-bold' : 'text-stone-500'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#E85D04] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </div>
          <span>Saved</span>
        </button>
      </nav>
    </>
  );
};
