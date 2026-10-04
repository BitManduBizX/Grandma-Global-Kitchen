import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  Printer, 
  Sparkles, 
  Clock, 
  Flame, 
  Users, 
  ChefHat, 
  CheckCircle2, 
  Circle, 
  Play, 
  Pause, 
  RotateCcw,
  Share2,
  Scale
} from 'lucide-react';
import { Recipe, Ingredient, InstructionStep } from '../types';

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  unitSystem: 'metric' | 'imperial';
  setUnitSystem: (system: 'metric' | 'imperial') => void;
  onAskGrandmaAboutRecipe: (recipe: Recipe) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
  unitSystem,
  setUnitSystem,
  onAskGrandmaAboutRecipe,
}) => {
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Play a soft audio chime using Web Audio API
      playTimerChime();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  const playTimerChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // Audio context blocked, ignore gracefully
    }
  };

  const startTimer = (stepNumber: number, minutes: number) => {
    setActiveTimerStep(stepNumber);
    setTimerSecondsLeft(minutes * 60);
    setIsTimerRunning(true);
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${recipe.title} — Grandma's Global Kitchen`,
        text: `Check out this authentic recipe for ${recipe.title} from ${recipe.originCountry}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentServings = recipe.servings * servingsMultiplier;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E85D04]/20 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{recipe.flag}</span>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#2B2D42] line-clamp-1">
                {recipe.title}
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                {recipe.originCountry} · {recipe.region}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-stone-600 hover:text-[#E85D04] rounded-xl hover:bg-[#FFF8F0] transition-colors cursor-pointer"
              title="Share Recipe"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => window.print()}
              className="p-2 text-stone-600 hover:text-[#E85D04] rounded-xl hover:bg-[#FFF8F0] transition-colors cursor-pointer"
              title="Print Recipe Card"
            >
              <Printer className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => onToggleFavorite(recipe.id, e)}
              className="p-2 text-stone-600 hover:text-rose-500 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
              title="Favorite"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer ml-2"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Hero Image & Heritage Story */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md">
              <img
                src={recipe.image}
                alt={recipe.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-medium">
                ★ {recipe.rating} ({recipe.reviewCount} grandmother approvals)
              </div>
            </div>

            <div className="md:col-span-6 space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#2A9D8F]">
                  Generational Heritage Story
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2B2D42]">
                  {recipe.localName}
                </h3>
              </div>

              <p className="text-stone-700 text-sm leading-relaxed italic bg-[#FFF8F0] p-4 rounded-2xl border border-[#E85D04]/10">
                "{recipe.heritageStory}"
              </p>

              {/* Cooking Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
                  <Clock className="w-4 h-4 mx-auto text-[#E85D04] mb-1" />
                  <span className="block text-[11px] text-stone-500 uppercase">Prep Time</span>
                  <span className="font-semibold text-xs text-[#2B2D42]">{recipe.prepTimeMinutes} mins</span>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
                  <Flame className="w-4 h-4 mx-auto text-[#E85D04] mb-1" />
                  <span className="block text-[11px] text-stone-500 uppercase">Cook Time</span>
                  <span className="font-semibold text-xs text-[#2B2D42]">{recipe.cookTimeMinutes} mins</span>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
                  <Users className="w-4 h-4 mx-auto text-[#2A9D8F] mb-1" />
                  <span className="block text-[11px] text-stone-500 uppercase">Yield</span>
                  <span className="font-semibold text-xs text-[#2B2D42]">{currentServings} servings</span>
                </div>
              </div>

              {/* Ask Grandma Highlight Banner */}
              <button
                onClick={() => onAskGrandmaAboutRecipe(recipe)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#E85D04] to-[#F48C06] hover:opacity-95 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Ask Grandma About This Dish (Substitutes, History, Rescues)
              </button>
            </div>
          </div>

          {/* Grandma's Secret Tip Box */}
          <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FAF0CA]/50 p-5 rounded-3xl border-2 border-dashed border-[#E85D04]/30 space-y-2">
            <div className="flex items-center gap-2 text-[#E85D04] font-serif font-bold text-base">
              <ChefHat className="w-5 h-5" />
              <span>Nonna's Secret Family Trick</span>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed font-sans">
              {recipe.secretGrandmaTip}
            </p>
          </div>

          {/* Interactive Controls Bar: Servings Scaler + Metric/Imperial */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-200">
            {/* Servings Multiplier Stepper */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
                Adjust Servings:
              </span>
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-200 shadow-xs">
                {[1, 2, 4].map((mult) => (
                  <button
                    key={mult}
                    onClick={() => setServingsMultiplier(mult)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      servingsMultiplier === mult
                        ? 'bg-[#E85D04] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {recipe.servings * mult} serv ({mult}x)
                  </button>
                ))}
              </div>
            </div>

            {/* Metric / Imperial Unit Toggle */}
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#2A9D8F]" />
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-200 shadow-xs">
                <button
                  onClick={() => setUnitSystem('metric')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    unitSystem === 'metric'
                      ? 'bg-[#2A9D8F] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Metric (g / ml)
                </button>
                <button
                  onClick={() => setUnitSystem('imperial')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    unitSystem === 'imperial'
                      ? 'bg-[#2A9D8F] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Imperial (oz / cups)
                </button>
              </div>
            </div>
          </div>

          {/* Main Cooking Grid: Ingredients & Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Ingredients Checklist */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-xl font-bold text-[#2B2D42]">
                  Ingredients ({recipe.ingredients.length})
                </h4>
                <span className="text-xs text-stone-500">
                  Tap to cross off as you prep
                </span>
              </div>

              <div className="space-y-2">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = Boolean(checkedIngredients[idx]);
                  const scaledAmount = unitSystem === 'metric' 
                    ? (ing.amountMetric * servingsMultiplier).toFixed(ing.amountMetric % 1 === 0 ? 0 : 1)
                    : (ing.amountImperial * servingsMultiplier).toFixed(ing.amountImperial % 1 === 0 ? 0 : 1);
                  const unit = unitSystem === 'metric' ? ing.unitMetric : ing.unitImperial;

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                          : 'bg-white border-stone-200/80 hover:border-[#E85D04]/40 text-[#2B2D42]'
                      }`}
                    >
                      <button className="mt-0.5 shrink-0 text-[#2A9D8F]">
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 fill-emerald-100 text-emerald-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-300" />
                        )}
                      </button>
                      <div className="flex-1 text-sm">
                        <span className="font-semibold text-[#E85D04]">
                          {scaledAmount} {unit}
                        </span>{' '}
                        <span>{ing.name}</span>
                        {ing.notes && (
                          <span className="text-xs text-stone-500 block italic">({ing.notes})</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Nutrition Summary Box */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2 mt-6">
                <h5 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Estimated Nutrition (per serving)
                </h5>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 bg-stone-50 rounded-xl">
                    <span className="block font-bold text-stone-800">{recipe.nutrition.calories}</span>
                    <span className="text-[10px] text-stone-500">Calories</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-xl">
                    <span className="block font-bold text-stone-800">{recipe.nutrition.protein}g</span>
                    <span className="text-[10px] text-stone-500">Protein</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-xl">
                    <span className="block font-bold text-stone-800">{recipe.nutrition.carbs}g</span>
                    <span className="text-[10px] text-stone-500">Carbs</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-xl">
                    <span className="block font-bold text-stone-800">{recipe.nutrition.fat}g</span>
                    <span className="text-[10px] text-stone-500">Fats</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Step-by-Step Cooking Guide with Timers */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-xl font-bold text-[#2B2D42]">
                  Step-by-Step Instructions
                </h4>
                <span className="text-xs text-[#2A9D8F] font-semibold">
                  {Object.values(completedSteps).filter(Boolean).length} of {recipe.instructions.length} completed
                </span>
              </div>

              <div className="space-y-4">
                {recipe.instructions.map((step) => {
                  const isDone = Boolean(completedSteps[step.stepNumber]);
                  const isTimerActiveForThisStep = activeTimerStep === step.stepNumber;

                  return (
                    <div
                      key={step.stepNumber}
                      className={`p-5 rounded-3xl border transition-all ${
                        isDone
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-white border-stone-200/90 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleStep(step.stepNumber)}
                            className="shrink-0 cursor-pointer"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-stone-300 hover:border-[#E85D04] flex items-center justify-center text-xs font-bold text-stone-600 transition-colors">
                                {step.stepNumber}
                              </div>
                            )}
                          </button>
                          <h5 className={`font-serif text-base font-bold ${isDone ? 'text-emerald-900 line-through' : 'text-[#2B2D42]'}`}>
                            {step.title}
                          </h5>
                        </div>

                        {/* Interactive Step Timer Button if step has a duration */}
                        {step.timerMinutes && (
                          <div className="shrink-0">
                            {isTimerActiveForThisStep ? (
                              <div className="flex items-center gap-2 bg-[#E85D04]/10 px-3 py-1.5 rounded-xl border border-[#E85D04]/30">
                                <Clock className="w-4 h-4 text-[#E85D04] animate-pulse" />
                                <span className="font-mono font-bold text-sm text-[#E85D04]">
                                  {formatTimer(timerSecondsLeft)}
                                </span>
                                <button
                                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                                  className="p-1 hover:bg-[#E85D04]/20 rounded-lg text-[#E85D04]"
                                >
                                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveTimerStep(null);
                                    setIsTimerRunning(false);
                                  }}
                                  className="p-1 hover:bg-[#E85D04]/20 rounded-lg text-stone-400"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => startTimer(step.stepNumber, step.timerMinutes!)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                {step.timerMinutes}m Timer
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      <p className={`text-sm mt-3 leading-relaxed ${isDone ? 'text-stone-500' : 'text-stone-700'}`}>
                        {step.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
