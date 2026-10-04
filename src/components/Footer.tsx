import React from 'react';
import { Soup, Heart, ChefHat } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'recipes' | 'pantry' | 'traditions' | 'ai' | 'favorites') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-[#E85D04]/10 mt-20 pt-12 pb-24 lg:pb-12 text-[#2B2D42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Dedication */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E85D04] text-white flex items-center justify-center shadow-sm">
                <Soup className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#2B2D42]">
                Grandma's Global Kitchen
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md">
              Dedicated with love to the grandmothers, mothers, and home cooks across every continent who taught us that food is warmth, belonging, and memory made tangible.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Explore Kitchen
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-600">
              <li>
                <button
                  onClick={() => onNavigate('recipes')}
                  className="hover:text-[#E85D04] transition-colors cursor-pointer"
                >
                  All 1,000+ Global Recipes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pantry')}
                  className="hover:text-[#E85D04] transition-colors cursor-pointer"
                >
                  Pantry Matcher ("Supercook" style)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('traditions')}
                  className="hover:text-[#E85D04] transition-colors cursor-pointer"
                >
                  Cultural Traditions & Foodways
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai')}
                  className="hover:text-[#E85D04] transition-colors cursor-pointer"
                >
                  Grandma Rosa (AI Assistant)
                </button>
              </li>
            </ul>
          </div>

          {/* Cooking Philosophy */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Heirloom Rule
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed italic bg-[#FFF8F0] p-3 rounded-xl border border-[#E85D04]/10">
              "Taste often. Season with confidence. Don't rush the onions. And always leave room at your table for an unexpected guest."
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2">
          <span>&copy; {new Date().getFullYear()} Grandma's Global Kitchen. 100% Free & Open Access.</span>
          <span className="flex items-center gap-1">
            Simmered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> and generational wisdom
          </span>
        </div>

      </div>
    </footer>
  );
};
