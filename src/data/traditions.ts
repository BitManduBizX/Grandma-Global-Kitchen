import { FoodTradition, Continent } from '../types';

export const FOOD_TRADITIONS: FoodTradition[] = [
  {
    id: 'noodle-migration',
    title: "The Great Migration of Noodles & Strands",
    subtitle: "From Ancient Chang'an to the Pasta Labs of Gragnano & Tokyo",
    category: "Migration & History",
    region: "Silk Road, East Asia & Southern Europe",
    continent: "Asia",
    readTimeMinutes: 6,
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=80",
    summary: "How a 4,000-year-old millet noodle preserved in the floodplains of the Yellow River evolved through camel caravans, Islamic trade routes, and Mediterranean seaports into the world's most universal comfort food.",
    fullStory: [
      "In 2005, archaeologists at the Lajia site in northwestern China unearthed an overturned earthenware bowl sealed under three meters of river silt. Inside lay fossilized strands of yellow noodles dating back over 4,000 years—the oldest known noodles in human history, made from broomcorn and foxtail millet.",
      "As merchants traversed the Silk Road, dough-kneading techniques traveled across borders. In Central Asia, Uyghur cooks pulled lagman noodles by rhythmically slapping ropey dough against wooden workbenches. By the 5th century, Arab travelers documented 'itriyya'—dried wheat ribbons engineered to survive desert voyages across the Mediterranean.",
      "When dry durum wheat pasta arrived in Sicily and Naples, it transformed peasant resilience. Southern Italian grandmothers learned that extruded semolina could dry under the salty Tyrrhenian winds and keep in larder bins for months, ready to be revived by boiling well water and a handful of garden herbs.",
      "Simultaneously in Japan, Chinese wheat soba transformed into ramen during the Meiji era, as Yokohama dockworkers combined alkaline wheat noodles with rich bone broths. What began as survival technology became an emotional language spoken in every kitchen across the earth."
    ],
    keyTakeaways: [
      "Noodles were originally developed as lightweight, shelf-stable travel food for nomadic journeys.",
      "Alkaline water (kansui) in Asia and high-protein durum semolina in the Mediterranean independently solved the same physical challenge: keeping boiled dough toothsome and resilient.",
      "Every grandmother’s noodle shape—from Italian tagliatelle to Japanese udon and Polish kluski—is engineered specifically to cling to the viscosity of its regional sauce."
    ],
    featuredDishes: ["Nonna Maria's Tagliatelle al Ragù", "Grandma Keiko's Miso Ramen", "Bà Nội's Hanoi Phở Bò"],
    grandmaQuote: "When your hands pull dough, you aren't just making dinner—you are holding the hands of ten thousand mothers who kneaded before you."
  },
  {
    id: 'fermentation-wisdom',
    title: "Fermentation: How Grandmothers Tamed Winter",
    subtitle: "The Ancestral Microbial Alchemy of Salt, Crocks, and Time",
    category: "Seasonal Wisdom",
    region: "Global (Korea, Eastern Europe, Japan, Nordic)",
    continent: "Europe",
    readTimeMinutes: 7,
    image: "https://images.unsplash.com/photo-1583032015879-5836480e0fa3?auto=format&fit=crop&w=1200&q=80",
    summary: "Long before refrigeration or artificial preservatives, our grandmothers partnered with microscopic wild yeasts and lactobacillus bacteria to turn seasonal gluts of cabbage, milk, and soybeans into nutritional powerhouses.",
    fullStory: [
      "Before modern supermarkets made fresh strawberries available in December, winter was a real threat. In the sub-zero chill of the Korean peninsula, November was known as Gimjang season—a collaborative neighborhood festival where families harvested mountains of Napa cabbage, salted them in sea brine, and layered them with red pepper, garlic, and wild fermented shrimp.",
      "These stoneware onggi jars were then buried neck-deep in the earth. The soil maintained a natural, stable cool temperature between 0°C and 4°C, protecting the lactic acid bacteria while locking out rot. By February, that humble cabbage was brimming with Vitamin C, live probiotics, and rich umami that sustained villages through the bitterest blizzards.",
      "In Poland, Ukraine, and the Baltic forests, babcias filled oak barrels with shredded cabbage and caraway seeds to make kapusta kiszona (sauerkraut). In Alpine chalets, wheels of Gruyère and Comté cured for two years, transforming summer meadow milk into shelf-stable protein blocks.",
      "Fermentation was never merely about preservation; it was an alchemy of flavor. Microbes break down hard proteins into glutamates—the purest molecular essence of umami. A grandmother's fermented pantry was her family's greatest treasure."
    ],
    keyTakeaways: [
      "Lactic acid bacteria act as living shields, acidifying the food environment to kill harmful pathogens while preserving vitamins.",
      "Burying jars in the earth was the world's first geothermal, zero-electricity climate-controlled refrigerator.",
      "Fermentation releases free amino acids (glutamates), transforming plain vegetables into intensely savory comfort meals."
    ],
    featuredDishes: ["Halmeoni's Vintage Kimchi Jjigae", "Babcia Halina's Pierogi Ruskie"],
    grandmaQuote: "Salt and patience are the two greatest cooks in the world. What fire starts in an hour, salt and time perfect in a month."
  },
  {
    id: 'soul-of-jollof',
    title: "The Fire, The Smoke, and The Hearth: The West African Jollof Diaspora",
    subtitle: "Identity, Storytelling, and Friendly National Pride",
    category: "Hearth Rituals",
    region: "Senegal, Nigeria, Ghana, Cameroon",
    continent: "Africa",
    readTimeMinutes: 5,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80",
    summary: "The origins of Jollof trace back to the Wolof Empire of Senegal (where it was known as thiéboudienne), migrating across West African borders into a beloved culinary symbol of celebration, homecoming, and community solidarity.",
    fullStory: [
      "No Sunday celebration, traditional wedding, or milestone anniversary in West Africa is complete without Jollof. While the famous 'Jollof Wars' between Nigeria and Ghana provide endless lighthearted rivalry across social media, the dish's roots belong to the Wolof people of ancient Senegambia, where fishermen cooked broken jasmine rice in caramelized tomato stew with local sea fish.",
      "As merchants and families moved eastward, the recipe adapted to local soil and grains. In Nigeria, parboiled long-grain rice took center stage, cooked in heavy cast-iron pots (often called 'pot-bellied pots') fueled by fragrant firewood. The woodsmoke curls into the iron pot, creating the legendary smoky aroma that cannot be duplicated on an induction stove.",
      "The scorched bottom layer—known as 'bottom pot' or 'kanzo'—is fiercely contested among children and cousins at family banquets. It represents the intimacy of the hearth: food that has stood close to the flame and earned its depth through patience and heat."
    ],
    keyTakeaways: [
      "West African party cooking relies on aluminum foil and heavy iron lids to steam grains evenly without crushing.",
      "The deep flavor comes from reducing the fresh pepper-tomato puree before adding stock, concentrating natural fruit sugars.",
      "Jollof is communal by definition—it is rarely cooked for one, but in towering cauldrons to welcome unexpected guests."
    ],
    featuredDishes: ["Mama Ngozi's Smoky Party Jollof Rice"],
    grandmaQuote: "If your pot doesn't sing at the bottom, your rice is just boiled. The smoke is where the memories live."
  },
  {
    id: 'ancient-nixtamalization',
    title: "Nixtamalization: The 3,500-Year-Old Science that Built the Americas",
    subtitle: "How Indigenous Grandmothers Unlocked the Secret Power of Corn",
    category: "Ancestral Techniques",
    region: "Mesoamerica & Oaxaca",
    continent: "Americas",
    readTimeMinutes: 6,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80",
    summary: "Corn by itself cannot support human life without deficiency diseases. Ancient Mesoamerican women discovered that steeping dried kernels in limestone ashes unlocked essential vitamin B3, paving the way for the Aztec and Maya empires.",
    fullStory: [
      "Over 3,500 years ago in the highlands of Oaxaca, indigenous women noticed something crucial about dried maize: while raw ground corn made brittle cakes and caused sickness when eaten as a sole staple, boiling kernels in water mixed with wood ashes or slaked lime (calcium hydroxide) fundamentally changed the grain.",
      "This process—now scientifically termed nixtamalization (from the Nahuatl nextli 'ashes' and tamalli 'dough')—dissolves the pericarp hull, releases bound niacin (Vitamin B3) so the human digestive tract can absorb it, balances essential amino acids, and makes the dough pliable enough to form soft, puffed tortillas.",
      "When European explorers took corn back across the Atlantic to Europe and the American South, they neglected to learn the alkaline ash step. The tragic result was centuries of pellagra outbreaks among poor tenant farmers who ate un-nixtamalized cornmeal. Mesoamerican grandmothers had solved this dietary mystery millenia earlier with a handful of clean hearth ash."
    ],
    keyTakeaways: [
      "Alkaline treatment chemically unlocks Vitamin B3 (niacin) and protein bioavailability in corn.",
      "The process transforms hard starch into elastic dough (masa) capable of puffing into airy comal tortillas.",
      "Traditional wisdom was rigorous empirical science, developed through centuries of quiet observation by home cooks."
    ],
    featuredDishes: ["Abuelita Elena's Mole Poblano con Tortillas"],
    grandmaQuote: "The corn gave us life, but the hearth fire gave the corn its soul."
  }
];

export interface AromaticBase {
  name: string;
  culture: string;
  ingredients: string[];
  cookingMethod: string;
  iconicDishes: string[];
}

export const CULINARY_AROMATIC_BASES: AromaticBase[] = [
  {
    name: "Soffritto",
    culture: "Italy",
    ingredients: ["Yellow Onion", "Carrot", "Celery", "Extra Virgin Olive Oil / Butter"],
    cookingMethod: "Diced finely in a 2:1:1 ratio, sweated gently over low heat for 15-20 minutes until melted and sweet without browning.",
    iconicDishes: ["Bolognese Ragù", "Ribollita", "Ossobuco"]
  },
  {
    name: "Mirepoix",
    culture: "France",
    ingredients: ["Onion", "Carrot", "Celery", "Butter / Duck Fat"],
    cookingMethod: "Sweated in butter as a fondation for classic sauces, braises, and brown stocks.",
    iconicDishes: ["Bœuf Bourguignon", "Coq au Vin", "French Onion Soup"]
  },
  {
    name: "The Holy Trinity",
    culture: "Cajun & Creole (Louisiana / Caribbean)",
    ingredients: ["Yellow Onion", "Bell Pepper", "Celery"],
    cookingMethod: "Cooked into dark nutty roux or butter until unctuous and caramelized.",
    iconicDishes: ["Gumbo", "Jambalaya", "Crawfish Étouffée"]
  },
  {
    name: "Tadka / Chhonk / Baghar",
    culture: "India & South Asia",
    ingredients: ["Mustard Seeds", "Cumin", "Ginger", "Garlic", "Curry Leaves", "Ghee"],
    cookingMethod: "Whole spices bloomed in smoking-hot ghee or mustard oil for seconds until sputtering, then poured sizzling over lentils.",
    iconicDishes: ["Dal Tadka", "Dal Makhani", "Sambar", "Khichdi"]
  },
  {
    name: "Sofrito Criollo",
    culture: "Latin America & Caribbean",
    ingredients: ["Onion", "Garlic", "Bell Pepper / Ají Dulce", "Cilantro / Culantro", "Tomatoes"],
    cookingMethod: "Finely pureed or diced, simmered in lard or achiote oil until thick and fragrant.",
    iconicDishes: ["Arroz con Pollo", "Picadillo", "Frijoles Negros"]
  },
  {
    name: "Yuanwei Trinity",
    culture: "China & East Asia",
    ingredients: ["Ginger", "Garlic", "Scallions (White Stems)"],
    cookingMethod: "Pounded or thinly sliced, flash-fried in a smoking wok with lard or peanut oil for 10-15 seconds.",
    iconicDishes: ["Stir-Fried Greens", "Steamed Whole Fish", "Kung Pao Chicken"]
  }
];
