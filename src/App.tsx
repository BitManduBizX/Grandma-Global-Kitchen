import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ConsentBanner } from './components/ConsentBanner';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CollectionsHub } from './components/CollectionsHub';
import { PantryMatcher } from './components/PantryMatcher';
import { TraditionsHub } from './components/TraditionsHub';
import { FavoritesView } from './components/FavoritesView';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { GrandmaAIAssistant } from './components/GrandmaAIAssistant';
import { Footer } from './components/Footer';
import { RECIPES } from './data/recipes';
import { Recipe } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'recipes' | 'pantry' | 'traditions' | 'ai' | 'favorites'>('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isGrandmaAIOpen, setIsGrandmaAIOpen] = useState(false);
  const [grandmaContextRecipe, setGrandmaContextRecipe] = useState<Recipe | null>(null);
  const [grandmaPrefillPrompt, setGrandmaPrefillPrompt] = useState<string>('');

  // Persisted Favorites in LocalStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kitchen_favorites');
      return saved ? JSON.parse(saved) : ['tagliatelle-bolognese', 'spanakopita-traditional'];
    } catch {
      return ['tagliatelle-bolognese', 'spanakopita-traditional'];
    }
  });

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('kitchen_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleOpenAskGrandma = (prefill?: string, recipeContext?: Recipe) => {
    setGrandmaPrefillPrompt(prefill || '');
    setGrandmaContextRecipe(recipeContext || selectedRecipe || null);
    setIsGrandmaAIOpen(true);
  };

  const handleAskGrandmaAboutRecipe = (recipe: Recipe) => {
    handleOpenAskGrandma(
      `Grandma, can you share your best tips, substitutions, or the heritage story for "${recipe.title}"?`,
      recipe
    );
  };

  const handleAskGrandmaForSub = (missingItem: string, recipeTitle: string) => {
    handleOpenAskGrandma(
      `I am making "${recipeTitle}", but I don't have "${missingItem}". What can I substitute from my kitchen?`
    );
  };

  // If user navigated to AI via tab
  useEffect(() => {
    if (activeTab === 'ai') {
      setIsGrandmaAIOpen(true);
      setActiveTab('recipes');
    }
  }, [activeTab]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#2B2D42]">
        
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          unitSystem={unitSystem}
          setUnitSystem={setUnitSystem}
          favoritesCount={favorites.length}
          openAskGrandma={() => handleOpenAskGrandma()}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          
          {/* Top Hero Banner (Shown when exploring recipes) */}
          {activeTab === 'recipes' && !searchQuery && (
            <HeroBanner
              featuredRecipe={RECIPES[0]}
              onOpenPantry={() => {
                setActiveTab('pantry');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreTop100={() => {
                setActiveTab('recipes');
              }}
              onSelectFeaturedRecipe={(recipe) => setSelectedRecipe(recipe)}
            />
          )}

          {/* Active View Router */}
          {activeTab === 'recipes' && (
            <CollectionsHub
              recipes={RECIPES}
              onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'pantry' && (
            <PantryMatcher
              recipes={RECIPES}
              onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onAskGrandmaForSub={handleAskGrandmaForSub}
            />
          )}

          {activeTab === 'traditions' && (
            <TraditionsHub />
          )}

          {activeTab === 'favorites' && (
            <FavoritesView
              recipes={RECIPES}
              favorites={favorites}
              onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
              onToggleFavorite={handleToggleFavorite}
              onBackToExplore={() => setActiveTab('recipes')}
            />
          )}

        </main>

        {/* Global Footer */}
        <Footer onNavigate={(tab) => setActiveTab(tab)} />

        {/* Recipe Detail Modal */}
        {selectedRecipe && (
          <RecipeDetailModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            isFavorite={favorites.includes(selectedRecipe.id)}
            onToggleFavorite={handleToggleFavorite}
            unitSystem={unitSystem}
            setUnitSystem={setUnitSystem}
            onAskGrandmaAboutRecipe={handleAskGrandmaAboutRecipe}
          />
        )}

        {/* Grandma AI Assistant Drawer / Modal */}
        <GrandmaAIAssistant
          isOpen={isGrandmaAIOpen}
          onClose={() => {
            setIsGrandmaAIOpen(false);
            setGrandmaContextRecipe(null);
            setGrandmaPrefillPrompt('');
          }}
          activeRecipeContext={grandmaContextRecipe}
          prefillPrompt={grandmaPrefillPrompt}
        />

        {/* Privacy & Storage Consent Banner */}
        <ConsentBanner />

      </div>
    </ErrorBoundary>
  );
}
