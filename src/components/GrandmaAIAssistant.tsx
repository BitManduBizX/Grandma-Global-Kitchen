import React, { useState, useRef, useEffect } from 'react';
import { 
  BotMessageSquare, 
  Send, 
  Sparkles, 
  ChefHat, 
  X, 
  RotateCcw, 
  Flame, 
  Heart,
  Lightbulb,
  AlertCircle
} from 'lucide-react';
import { Recipe, AIMessage } from '../types';

interface GrandmaAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  activeRecipeContext?: Recipe | null;
  prefillPrompt?: string;
}

const PRESET_QUESTIONS = [
  "How do I fix a soup that is too salty?",
  "What is the best substitute for buttermilk?",
  "Why is my bread crust not golden and crisp?",
  "How do I safely double the spices for a large pot?",
  "What can I replace dry white wine with?",
];

export const GrandmaAIAssistant: React.FC<GrandmaAIAssistantProps> = ({
  isOpen,
  onClose,
  activeRecipeContext,
  prefillPrompt,
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      sender: 'grandma',
      text: "Bless your heart, darling! Come on in and sit by the counter. I've got the kettle on. What are we cooking today? If you're missing an ingredient or need to rescue a simmering pot, Grandma is right here!",
      timestamp: 'Just now',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle prefilled prompt from recipes or missing ingredients
  useEffect(() => {
    if (prefillPrompt && isOpen) {
      setInputPrompt(prefillPrompt);
    }
  }, [prefillPrompt, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputPrompt).trim();
    if (!prompt || isLoading) return;

    setErrorNotice(null);
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: prompt,
      timestamp: 'Just now',
      recipeName: activeRecipeContext ? activeRecipeContext.title : undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/grandma-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          recipeContext: activeRecipeContext ? {
            title: activeRecipeContext.title,
            originCountry: activeRecipeContext.originCountry,
            ingredients: activeRecipeContext.ingredients,
            instructions: activeRecipeContext.instructions,
          } : null,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();
      const grandmaMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'grandma',
        text: data.reply || "Bless your heart, my dear! I'm stirring the sauce right now—ask me once more!",
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, grandmaMsg]);
    } catch (err: any) {
      console.warn('Grandma AI request error, using client fallback:', err);
      // Resilience fallback directly in UI so the user NEVER encounters a blank or dead interface
      const fallbackText = getClientFallbackAdvice(prompt);
      const grandmaMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'grandma',
        text: fallbackText,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, grandmaMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  function getClientFallbackAdvice(p: string): string {
    const lower = p.toLowerCase();
    if (lower.includes('salty') || lower.includes('salt')) {
      return `Oh sweetheart, don't worry! Drop a raw peeled potato into the pot for 15 minutes to absorb the brine, or add a squeeze of fresh lemon juice or a splash of unsweetened cream. Acidity and fat trick your tastebuds into tasting less salt! 💛`;
    }
    if (lower.includes('substitute') || lower.includes('replace') || lower.includes('missing')) {
      return `That is the true heart of home cooking! Whatever you are missing, tell me if it's a dairy, a fresh herb, or a spice. For instance, buttermilk is easily made with 1 cup milk + 1 tbsp lemon juice!`;
    }
    return `Bless your heart, darling! Grandma always says: cooking isn't about rigid chemistry, it's about tasting as you go. Add love, don't rush the onions, and your table will be full of smiles!`;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Chat Window Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E85D04]/25 overflow-hidden flex flex-col h-[85vh] max-h-[750px]">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#FFF8F0] via-[#FAF0CA] to-[#FFF8F0] px-6 py-4 border-b border-[#E85D04]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E85D04] to-[#F48C06] text-white flex items-center justify-center shadow-md shadow-[#E85D04]/20">
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2B2D42]">
                Grandma Rosa (Culinary AI)
              </h3>
              <p className="text-xs text-[#2A9D8F] font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Wise advice, substitutions, and culinary rescues
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'welcome',
                    sender: 'grandma',
                    text: "Bless your heart, darling! Fresh clean counter. What recipe or ingredient can I help you with?",
                    timestamp: 'Just now',
                  }
                ]);
              }}
              className="p-2 text-stone-500 hover:text-stone-800 rounded-xl hover:bg-white/60 transition-colors"
              title="Clear Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-white/60 transition-colors"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Recipe Context Pill if opened from a specific recipe */}
        {activeRecipeContext && (
          <div className="bg-[#FFF8F0] px-6 py-2 border-b border-[#E85D04]/10 flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-2 truncate">
              <span className="font-bold text-[#E85D04]">Active Recipe:</span>
              <span className="font-medium truncate">{activeRecipeContext.title} ({activeRecipeContext.originCountry} {activeRecipeContext.flag})</span>
            </div>
            <span className="text-[10px] text-[#2A9D8F] font-bold uppercase tracking-wider shrink-0">
              Context Loaded
            </span>
          </div>
        )}

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FFF8F0]/30">
          {messages.map((msg) => {
            const isGrandma = msg.sender === 'grandma';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isGrandma ? 'justify-start' : 'justify-end'}`}
              >
                {isGrandma && (
                  <div className="w-9 h-9 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center shrink-0 mt-1">
                    <ChefHat className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                    isGrandma
                      ? 'bg-white text-stone-800 border border-[#E85D04]/15 rounded-tl-xs'
                      : 'bg-[#2B2D42] text-white rounded-tr-xs font-medium'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-9 h-9 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center shrink-0 animate-pulse">
                <ChefHat className="w-5 h-5" />
              </div>
              <div className="bg-white rounded-2xl p-4 border border-[#E85D04]/15 text-xs text-stone-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E85D04] animate-ping" />
                <span>Grandma is tasting the broth and checking her handwritten cookbook...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Bubbles */}
        <div className="p-3 bg-white border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" /> Quick Ask:
          </span>
          {PRESET_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#FAF0CA]/50 hover:bg-[#FAF0CA] text-stone-700 shrink-0 border border-[#E85D04]/10 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask Grandma anything (e.g., 'What can I use instead of wine?', 'Fix my salty sauce')..."
              className="flex-1 px-4 py-3 bg-[#FFF8F0] text-sm text-[#2B2D42] rounded-2xl border border-[#E85D04]/20 focus:outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="px-5 py-3 bg-[#E85D04] hover:bg-[#F48C06] disabled:opacity-50 text-white font-semibold rounded-2xl shadow-md transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-stone-400 text-center mt-2">
            Grandma AI combines authentic culinary food science, generational wisdom, and Gemini intelligence. Always verify food allergies.
          </p>
        </div>

      </div>

    </div>
  );
};
