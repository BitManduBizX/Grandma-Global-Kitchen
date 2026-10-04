/**
 * Grandma AI Culinary Service
 * Reads Gemini API key securely from environment variables (import.meta.env.VITE_GEMINI_API_KEY)
 * or calls the server proxy endpoint (/api/grandma-ai) with a robust culinary fallback engine.
 */

export interface CulinaryQueryContext {
  prompt: string;
  recipeContext?: {
    title: string;
    originCountry: string;
    ingredients?: any[];
    instructions?: any[];
  } | null;
}

export async function askGrandmaCulinaryAI(query: CulinaryQueryContext): Promise<string> {
  const { prompt, recipeContext } = query;
  
  // Safely check environment variables without hardcoding
  const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // 1. First attempt full-stack proxy route
  try {
    const res = await fetch('/api/grandma-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, recipeContext }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.reply) {
        return data.reply;
      }
    }
  } catch (netErr) {
    console.info('Proxy endpoint /api/grandma-ai unavailable (static deployment), evaluating client fallback.');
  }

  // 2. If client environment variable is present and valid on a static host
  if (clientApiKey && clientApiKey !== 'MY_GEMINI_API_KEY' && clientApiKey.trim().length > 10) {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: clientApiKey });
      const systemInstruction = `You are "Grandma Rosa" on Grandma's Global Kitchen. You are a warm, wise, loving grandmother sharing 50+ years of generational culinary wisdom. Give encouraging, practical, and science-grounded advice.`;
      
      let contents = prompt;
      if (recipeContext) {
        contents = `Recipe: ${recipeContext.title} (${recipeContext.originCountry}). User asks: ${prompt}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: { systemInstruction, temperature: 0.7 },
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (clientErr) {
      console.warn('Client Gemini call failed, using heuristic culinary wisdom:', clientErr);
    }
  }

  // 3. Resilient heuristic grandma fallback engine (ensures zero crashes)
  return getResilientGrandmaAdvice(prompt, recipeContext);
}

export function getResilientGrandmaAdvice(prompt: string, recipeContext?: any): string {
  const p = prompt.toLowerCase();

  if (p.includes('salty') || p.includes('too much salt')) {
    return `Oh honey, don't throw it out! Every grandma has slipped with the salt shaker before:
• For Soups & Stews: Peel a raw whole potato and drop it in to simmer for 15 minutes—it drinks up excess sodium like magic, then fish it out. Or add a splash of cream, unsalted broth, or a squeeze of fresh lemon juice; acidity tricks the palate into tasting less salt!
• For Sauces: Stir in a spoonful of brown sugar, honey, or unsalted butter to coat your tastebuds and soften the sharp brine.
You're doing wonderful, darling. We save dishes here, we don't discard them! 💛`;
  }

  if (p.includes('substitute') || p.includes('replace') || p.includes('don\'t have') || p.includes('missing')) {
    if (p.includes('buttermilk')) {
      return `Easy peasy, sweetheart! For every 1 cup of milk, stir in 1 tablespoon of fresh lemon juice or white vinegar. Let it sit on the counter for 5 minutes until it curdles slightly. It gives your pancakes and breads the exact same tenderizing acid!`;
    }
    if (p.includes('egg') || p.includes('eggs')) {
      return `Grandmothers during tough times learned every trick in the book! For baking, 1/4 cup unsweetened applesauce, 1/2 mashed ripe banana, or 1 tablespoon ground flaxseed whisked with 3 tablespoons warm water replaces 1 egg seamlessly!`;
    }
    if (p.includes('wine') || p.includes('alcohol')) {
      return `No wine needed, darling! Replace white wine with chicken or vegetable broth plus a splash of lemon juice or apple cider vinegar. For red wine in hearty beef stews, use beef bone broth with a tablespoon of balsamic vinegar and a dash of tomato paste. The depth will be magnificent!`;
    }
    if (p.includes('heavy cream') || p.includes('cream')) {
      return `To mimic heavy cream, melt 1/4 cup of unsalted butter and whisk it slowly into 3/4 cup of whole milk. Or for plant-based creaminess, full-fat canned coconut milk or soaked blended cashews work wonders in soups and curries!`;
    }
    return `Bless you for being resourceful in the kitchen! Whatever ingredient you're missing, tell me if it's a fat, an acid, or an aromatic herb, and I'll find you the perfect pantry treasure!`;
  }

  if (p.includes('story') || p.includes('history') || p.includes('origin')) {
    const dish = recipeContext?.title || "this traditional dish";
    return `Sit down by the counter and let Grandma tell you the story of ${dish}! Food has never been just fuel; it's a love letter passed down across generations. Long before modern grocery stores, our ancestors gathered whatever the soil, sun, and seasonal harvest provided, simmering modest ingredients with boundless patience.`;
  }

  return `Bless your heart, darling! Grandma is right here with you. Whether you want to substitute a missing spice, rescue a simmering pot, or adjust portions for Sunday dinner, just ask. You're doing wonderful at the stove!`;
}
