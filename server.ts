import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Server-side Gemini initialization
let aiClient: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health check endpoint for Cloud Run
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    aiEnabled: Boolean(aiClient),
  });
});

// Grandma AI culinary assistant endpoint
app.post('/api/grandma-ai', async (req, res) => {
  const { prompt, recipeContext, conversationHistory = [] } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'A valid question or prompt is required.' });
  }

  // Construct warm grandmother culinary persona prompt
  const systemInstruction = `You are "Grandma Rosa" (also affectionately known as Nonna, Abuela, Baa, and Babushka) on "Grandma's Global Kitchen".
You are a warm, wise, encouraging, and deeply knowledgeable culinary grandmother who has spent 50+ years cooking traditional family recipes from all corners of the earth.
Your tone is loving, comforting, practical, and enthusiastic ("Bless your heart", "Sit down by the counter", "Don't you worry child", "A little pinch of love").
You provide authoritative culinary advice grounded in food science, generational wisdom, cultural history, and home kitchen thrift.

When giving advice:
1. Always be encouraging and practical. If food was oversalted, burnt, or missing ingredients, give immediate rescue steps.
2. If suggesting substitutions, explain WHY the replacement works (ratio, moisture, fat content, acid balance).
3. If discussing cultural dishes, share the cultural significance and how grandmothers traditionally adapted recipes.
4. Keep answers concise, cozy, formatted with clear bullet points or short steps when giving cooking instructions.`;

  let fullPrompt = prompt;
  if (recipeContext) {
    fullPrompt = `Current recipe context:
Dish: "${recipeContext.title}" (${recipeContext.originCountry || 'Global'})
Ingredients: ${recipeContext.ingredients?.map((i: any) => `${i.amountMetric || ''} ${i.unitMetric || ''} ${i.name}`).join(', ') || 'N/A'}
Instructions: ${recipeContext.instructions?.map((s: any) => `${s.stepNumber}. ${s.title}: ${s.text}`).join(' ') || 'N/A'}

User's Question for Grandma:
${prompt}`;
  }

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Bless your heart! I was just stirring the pot and didn't catch that. Could you ask once more, dear?";
      return res.json({ reply: replyText, source: 'gemini' });
    } catch (apiError: any) {
      console.warn('Gemini API call failed, falling back to culinary wisdom engine:', apiError?.message || apiError);
      // Fall through to resilient fallback wisdom generator
    }
  }

  // Resilient Domain Fallback when API key is missing or offline
  const fallbackReply = generateCulinaryFallbackResponse(prompt, recipeContext);
  return res.json({ reply: fallbackReply, source: 'fallback' });
});

// Intelligent Grandma culinary heuristic engine for zero-crash fallback
function generateCulinaryFallbackResponse(userPrompt: string, recipe?: any): string {
  const p = userPrompt.toLowerCase();

  if (p.includes('salty') || p.includes('too much salt')) {
    return `Oh honey, don't throw it out! Every grandma has slipped with the salt shaker before:
• **For Soups & Stews:** Peel a raw whole potato and drop it in to simmer for 15 minutes—it drinks up excess sodium like magic, then fish it out. Or add a splash of cream, unsalted broth, or a squeeze of fresh lemon juice; acidity tricks the palate into tasting less salt!
• **For Sauces:** Stir in a spoonful of brown sugar, honey, or unsalted butter to coat your tastebuds and soften the sharp brine.
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
    return `Bless you for being resourceful in the kitchen! That is the true heart of grandmother cooking. Whatever ingredient you're missing, think about its role:
• **Is it fat?** Olive oil, butter, or schmaltz can swap in equal measure.
• **Is it acid?** Lemon, lime, or wine vinegars balance rich flavors.
• **Is it aromatic?** Shallots, scallions, leeks, and yellow onions are all sisters from the allium family!
Tell me exactly which ingredient is missing and I'll find you the perfect pantry treasure!`;
  }

  if (p.includes('story') || p.includes('history') || p.includes('tradition') || p.includes('origin')) {
    const dish = recipe?.title || "traditional cooking";
    return `Ah, sit down and let Grandma tell you the story of ${dish}!
Food has never been just fuel; it's a love letter passed down across generations. Long before modern grocery stores, our ancestors gathered whatever the soil, sun, and seasonal harvest provided. They simmered tough cuts of meat slowly over hearth embers until they melted like butter. They preserved vegetables through winter with fermentation, sea salt, and crocks.
When families migrated across oceans and mountains, recipes were the only treasures that couldn't be confiscated—they lived safely in their hearts and fingertips. Every time you make this dish, you honor millions of grandmothers who fed their babies before us.`;
  }

  if (p.includes('dough') || p.includes('bread') || p.includes('fluffy') || p.includes('crust')) {
    return `Grandma's golden secrets for bread and dough:
1. **Never rush yeast:** Feed it lukewarm water (around 105°F–110°F, warm like a baby's bath) and a pinch of honey or sugar. If it doesn't foam happily in 7 minutes, start over!
2. **Moisture is tenderness:** A slightly sticky dough yields a cloud-soft crumb. Don't drown your board in excess flour when kneading!
3. **Steam creates the crust:** Toss 4 ice cubes onto a hot baking tray at the bottom of your oven right when your bread goes in. The burst of steam allows the dough to expand fully before the crisp, blistered golden crust sets!`;
  }

  if (p.includes('spicy') || p.includes('too hot')) {
    return `Don't panic! Capsaicin (the chemical in chili peppers) is fat-soluble and acid-sensitive.
1. **Add dairy or fat:** Stir in yogurt, sour cream, coconut milk, or avocado. Casein in milk literally binds to capsaicin and washes it away!
2. **Sweet & sour counterpunch:** Add a squeeze of lime juice with a drizzle of honey or brown sugar.
3. **Add more bulk:** Add more unseasoned rice, noodles, or diced potatoes to distribute the heat evenly.`;
  }

  if (p.includes('double') || p.includes('yield') || p.includes('halve') || p.includes('serving')) {
    return `Here is Grandma's golden rule for adjusting recipe sizes:
• **Grains, liquids, meats, and veggies:** Double or halve cleanly 1:1.
• **Spices & aromatics (garlic, chili, salt):** Don't double completely! Start with 1.5x the spices for a double batch, taste as it simmers, and add more if your palate calls for it. Salt compounds quickly!
• **Baking:** Keep pan sizes in mind—a doubled cake batter needs two pans, not one thick pan, or the center won't bake through.`;
  }

  return `Bless your heart, darling! Grandma is right here with you. Whether you want to substitute a missing spice, rescue a simmering pot, scale your portions for Sunday dinner, or learn the heritage story of this meal—just ask. You are the master chef of your home! What are we cooking today?`;
}

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Grandma's Global Kitchen server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
