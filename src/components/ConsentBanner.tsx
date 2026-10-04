import React, { useState, useEffect } from 'react';
import { Cookie, Check, X } from 'lucide-react';

export const ConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('kitchen_consent_given');
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // LocalStorage not available, remain calm
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('kitchen_consent_given', 'true');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#E85D04]/20 shadow-2xl space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#FFF8F0] text-[#E85D04] rounded-xl shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[#2B2D42]">A Pinch of Privacy</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Grandma keeps your saved recipe favorites, pantry staples, and cooking preferences saved right in your browser's private memory. No tracking, no accounts, 100% free!
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors"
          >
            Just Browsing
          </button>
          <button
            onClick={handleAccept}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-[#2A9D8F] hover:bg-[#238276] text-white rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            Accept & Keep Saved
          </button>
        </div>
      </div>
    </div>
  );
};
