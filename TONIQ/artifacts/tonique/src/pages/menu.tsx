import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";

const menuCategories = ["Starters", "Main Course", "Cocktails", "Mocktails", "Desserts"];

const menuData: Record<string, { name: string; desc: string; imageLabel: string }[]> = {
  "Starters": [
    { name: "Truffle Arancini", desc: "Wild mushroom, mozzarella, black truffle aioli, parmesan crisp", imageLabel: "Truffle Arancini" },
    { name: "Wagyu Carpaccio", desc: "Thinly sliced A5 wagyu, capers, cured egg yolk, micro greens", imageLabel: "Wagyu Carpaccio" },
    { name: "Oysters Rockefeller", desc: "Half dozen local oysters, spinach, pernod, hollandaise", imageLabel: "Oysters" },
    { name: "Burrata & Fig", desc: "Imported burrata, bruleed mission figs, balsamic glaze, crostini", imageLabel: "Burrata" },
  ],
  "Main Course": [
    { name: "Bone-in Ribeye", desc: "32oz prime beef, roasted garlic butter, charred broccolini", imageLabel: "Ribeye Steak" },
    { name: "Miso Glazed Black Cod", desc: "Sustainably caught cod, forbidden rice, dashi broth", imageLabel: "Black Cod" },
    { name: "Duck Confit Ravioli", desc: "House-made pasta, brown butter sage sauce, shaved truffles", imageLabel: "Duck Ravioli" },
    { name: "Saffron Cauliflower Steak", desc: "Fire-roasted whole cauliflower, pistachio pureé, pomegranate", imageLabel: "Cauliflower" },
  ],
  "Cocktails": [
    { name: "Smoked Old Fashioned", desc: "Woodford Reserve, angostura, brandied cherry, hickory smoke", imageLabel: "Old Fashioned" },
    { name: "Midnight Martini", desc: "Grey Goose, cold brew espresso, coffee liqueur, vanilla bean", imageLabel: "Espresso Martini" },
    { name: "The Botanist", desc: "Hendrick's gin, elderflower, cucumber, fresh mint, lime", imageLabel: "Gin Cocktail" },
    { name: "Spicy Mezcalita", desc: "Casamigos Mezcal, jalapeño agave, blood orange, tajin rim", imageLabel: "Mezcalita" },
  ],
  "Mocktails": [
    { name: "Guava Spritz", desc: "Fresh guava nectar, lime juice, sparkling water, mint", imageLabel: "Guava Spritz" },
    { name: "Zero Proof Mule", desc: "Kentucky 74, ginger beer, lime, aromatic bitters", imageLabel: "Mock Mule" },
    { name: "Lavender Lemonade", desc: "House-made lavender syrup, fresh squeezed lemon, butterfly pea", imageLabel: "Lavender Drink" },
  ],
  "Desserts": [
    { name: "Gold Leaf Entremet", desc: "Dark chocolate mousse, hazelnut praline, 24k gold", imageLabel: "Chocolate Dessert" },
    { name: "Deconstructed Cheesecake", desc: "Vanilla bean cheesecake mousse, graham crumble, berry compote", imageLabel: "Cheesecake" },
    { name: "Matcha Creme Brulee", desc: "Kyoto matcha, sesame crust, white chocolate drizzle", imageLabel: "Matcha Dessert" },
  ]
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      {/* Header */}
      <div className="py-20 text-center relative border-b border-white/5 bg-zinc-950">
        <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none overflow-hidden">
          <span className="text-[20vw] font-display font-bold whitespace-nowrap text-primary">MENU</span>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl text-white font-display mb-6">
            Culinary <span className="text-primary">Curations</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto">
            A meticulously crafted selection of dishes and libations designed to tantalize your senses.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[80px] z-30 bg-background/80 backdrop-blur-lg border-b border-white/10 py-4 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar gap-8 justify-start md:justify-center">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "whitespace-nowrap font-display tracking-[0.15em] uppercase text-sm py-2 transition-all duration-300 border-b-2",
                  activeCategory === cat 
                    ? "text-primary border-primary text-glow" 
                    : "text-white/50 border-transparent hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16"
          >
            {menuData[activeCategory].map((item, idx) => (
              <div key={idx} className="group flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-full sm:w-40 h-48 sm:h-40 shrink-0 overflow-hidden border border-white/10 rounded-sm">
                  <PlaceholderImage 
                    label={item.imageLabel} 
                    className="w-full h-full transform group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="flex flex-col justify-center pt-2">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-2xl text-white font-display tracking-wide">{item.name}</h3>
                    <div className="h-[1px] flex-grow bg-white/10"></div>
                  </div>
                  <p className="text-white/60 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
