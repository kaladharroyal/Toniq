import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";

const menuCategories = ["Appetizer", "Main Course", "Soups", "Beverages", "Desserts"];

interface MenuItem {
  name: string;
  desc: string;
  imageLabel: string;
  price?: string;
  type?: "veg" | "nonveg";
  variants?: { label: string; price: string }[];
  subCategory?: string;
}

const menuData: Record<string, MenuItem[]> = {
  "Appetizer": [
    // Veg Appetizer
    { name: "Veg Salad", desc: "Fresh garden vegetables tossed in a light dressing", imageLabel: "Veg Salad", price: "150", type: "veg" },
    { name: "French Fries", desc: "Crispy golden fries seasoned to perfection", imageLabel: "French Fries", price: "180", type: "veg" },
    { name: "Greenpeas Fry", desc: "Crunchy fried green peas with spices", imageLabel: "Greenpeas Fry", price: "160", type: "veg" },
    { name: "Greenpeas Rost", desc: "Roasted green peas with aromatic seasoning", imageLabel: "Greenpeas Rost", price: "160", type: "veg" },
    { name: "Boiled Corn", desc: "Sweet corn kernels boiled with butter and spices", imageLabel: "Boiled Corn", price: "190", type: "veg" },
    { name: "Boiled Palli Masala", desc: "Spiced boiled peanuts with tangy masala", imageLabel: "Palli Masala", price: "180", type: "veg" },
    { name: "Boiled Palli", desc: "Classic boiled peanuts with a pinch of salt", imageLabel: "Boiled Palli", price: "160", type: "veg" },
    { name: "Peanut Masala", desc: "Crunchy peanuts tossed in spicy masala mix", imageLabel: "Peanut Masala", price: "160", type: "veg" },
    // Non-Veg Appetizer
    { name: "Chilli Egg", desc: "Boiled eggs tossed in spicy chilli sauce", imageLabel: "Chilli Egg", price: "240", type: "nonveg" },
    { name: "Egg Manchurian", desc: "Crispy egg fritters in tangy Manchurian gravy", imageLabel: "Egg Manchurian", price: "240", type: "nonveg" },
    { name: "Egg 65", desc: "Deep-fried eggs coated in a spicy masala batter", imageLabel: "Egg 65", price: "230", type: "nonveg" },
    { name: "Chicken Mangolian", desc: "Tender chicken in a smoky Mongolian sauce", imageLabel: "Chicken Mongolian", price: "330", type: "nonveg" },
    { name: "Chicken 555", desc: "Spicy deep-fried chicken with fiery seasoning", imageLabel: "Chicken 555", price: "330", type: "nonveg" },
    { name: "Chicken Majestic", desc: "Crispy fried chicken strips with curry leaves and spices", imageLabel: "Chicken Majestic", price: "330", type: "nonveg" },
    { name: "Hunan Chicken", desc: "Chicken stir-fried in bold Hunan-style chilli sauce", imageLabel: "Hunan Chicken", price: "330", type: "nonveg" },
    { name: "Slice Chicken", desc: "Thinly sliced chicken sautéed with peppers and onions", imageLabel: "Slice Chicken", price: "350", type: "nonveg" },
    { name: "Crunchi Chicken", desc: "Extra-crispy battered chicken with signature dip", imageLabel: "Crunchy Chicken", price: "300", type: "nonveg" },
    { name: "Chilli Chicken", desc: "Classic Indo-Chinese chilli chicken with bell peppers", imageLabel: "Chilli Chicken", price: "350", type: "nonveg" },
  ],
  "Main Course": [
    // Biryani Veg
    { name: "Biryani Rice", desc: "Fragrant basmati rice cooked with aromatic biryani spices", imageLabel: "Biryani Rice", price: "240", type: "veg" },
    { name: "Plain Biryani", desc: "Classic vegetable biryani with mild spices and herbs", imageLabel: "Plain Biryani", price: "220", type: "veg" },
    { name: "Kaju Paneer Biryani", desc: "Rich biryani with cashews and paneer in aromatic gravy", imageLabel: "Kaju Paneer Biryani", price: "280", type: "veg" },
    { name: "Mushroom Biryani", desc: "Flavorful biryani loaded with fresh mushrooms and spices", imageLabel: "Mushroom Biryani", price: "260", type: "veg" },
    { name: "SP Veg Biryani", desc: "Special house-style veg biryani with premium ingredients", imageLabel: "SP Veg Biryani", price: "280", type: "veg" },
    // Biryani Non-Veg
    { name: "Chicken Dum Biryani", desc: "Slow-cooked dum biryani with tender chicken and saffron rice", imageLabel: "Chicken Dum Biryani", price: "240", type: "nonveg" },
    { name: "Chicken Dum Biryani BL", desc: "Boneless chicken dum biryani with rich spices", imageLabel: "Chicken BL Biryani", price: "220", type: "nonveg" },
    { name: "Chicken Fry Biryani Bone", desc: "Biryani topped with crispy fried chicken on the bone", imageLabel: "Chicken Fry Biryani", price: "280", type: "nonveg" },
    { name: "Chicken Keema Biryani", desc: "Aromatic biryani with spiced minced chicken keema", imageLabel: "Keema Biryani", price: "260", type: "nonveg" },
    { name: "Rambo Biryani", desc: "Extra-loaded signature biryani with bold flavors", imageLabel: "Rambo Biryani", price: "280", type: "nonveg" },
    { name: "SP Chicken Biryani", desc: "Special house chicken biryani with premium spice blend", imageLabel: "SP Chicken Biryani", price: "330", type: "nonveg" },
    { name: "Mutton Dum Biryani", desc: "Traditional slow-cooked mutton dum biryani", imageLabel: "Mutton Biryani", price: "350", type: "nonveg" },
    { name: "Mutton Fry Biryani", desc: "Biryani served with crispy fried mutton pieces", imageLabel: "Mutton Fry Biryani", price: "400", type: "nonveg" },
    { name: "Mutton SP Biryani", desc: "Special house mutton biryani with extra masala", imageLabel: "Mutton SP Biryani", price: "420", type: "nonveg" },
    { name: "Prawns Biryani", desc: "Coastal-style biryani with juicy prawns and spices", imageLabel: "Prawns Biryani", price: "420", type: "nonveg" },
    { name: "SP Prawns Biryani", desc: "Premium special prawns biryani with rich gravy", imageLabel: "SP Prawns Biryani", price: "400", type: "nonveg" },
  ],
  "Soups": [
    // Veg Soups
    { name: "Veg Clear Soup", desc: "Light and refreshing clear vegetable broth with seasonal greens", imageLabel: "Clear Soup", price: "160", type: "veg" },
    { name: "Veg Hot & Sour Soup", desc: "Spicy and tangy broth with mixed vegetables, tofu, and chili", imageLabel: "Hot Sour Soup", price: "160", type: "veg" },
    { name: "Veg Manchow Soup", desc: "Indo-Chinese style thick soup with crispy fried noodles", imageLabel: "Manchow Soup", price: "160", type: "veg" },
    { name: "Veg Sweet Corn Soup", desc: "Creamy sweet corn soup with fresh herbs and pepper", imageLabel: "Corn Soup", price: "160", type: "veg" },
    // Non-Veg Soups
    { name: "Chicken Clear Soup", desc: "Classic clear chicken broth with shredded chicken and herbs", imageLabel: "Chicken Soup", price: "200", type: "nonveg" },
    { name: "Chicken Sweet Corn Soup", desc: "Silky sweet corn soup with tender chicken strips", imageLabel: "Chicken Corn Soup", price: "200", type: "nonveg" },
    { name: "Chicken Manchow Soup", desc: "Spiced chicken broth topped with crispy fried noodles", imageLabel: "Chicken Manchow", price: "200", type: "nonveg" },
    { name: "Chicken Hot & Sour Soup", desc: "Bold and fiery chicken broth with tangy spices and vegetables", imageLabel: "Chicken Hot Sour", price: "200", type: "nonveg" },
    { name: "Chicken Dragon Soup", desc: "Fiery dragon-style chicken broth with exotic spices", imageLabel: "Dragon Soup", price: "200", type: "nonveg" },
    { name: "Chicken Egg Drop Soup", desc: "Delicate chicken broth with silky ribbons of beaten egg", imageLabel: "Egg Drop Soup", price: "210", type: "nonveg" },
    { name: "Sea Food Soup", desc: "Rich seafood medley in a savory aromatic broth", imageLabel: "Seafood Soup", price: "210", type: "nonveg" },
  ],
  "Beverages": [
    // Wine
    { name: "Jacob (White & Red)", desc: "Premium imported wine, white and red varieties", imageLabel: "Jacob Wine", subCategory: "wine", variants: [{ label: "90ML", price: "520" }, { label: "750ML", price: "4200" }] },
    { name: "Madera", desc: "Rich and smooth Madera wine", imageLabel: "Madera Wine", subCategory: "wine", variants: [{ label: "90ML", price: "430" }, { label: "750ML", price: "3400" }] },
    { name: "Kyra", desc: "Light and fruity Kyra wine", imageLabel: "Kyra Wine", subCategory: "wine", variants: [{ label: "90ML", price: "270" }, { label: "750ML", price: "2200" }] },
    { name: "Elite", desc: "Everyday classic wine selection", imageLabel: "Elite Wine", subCategory: "wine", variants: [{ label: "90ML", price: "180" }, { label: "750ML", price: "1400" }] },
    // Beer
    { name: "Budwiser Magnum", desc: "Bold and strong premium lager", imageLabel: "Budweiser Magnum", subCategory: "beer", price: "450" },
    { name: "Budwiser Premium", desc: "Smooth premium American lager", imageLabel: "Budweiser Premium", subCategory: "beer", price: "420" },
    { name: "Carlsberg Elephant", desc: "Extra strong Danish lager", imageLabel: "Carlsberg", subCategory: "beer", price: "400" },
    { name: "King Fisher Ultra", desc: "Ultra-smooth wheat beer", imageLabel: "Kingfisher Ultra", subCategory: "beer", price: "400" },
    { name: "King Fisher Storm", desc: "Bold and intense strong beer", imageLabel: "Kingfisher Storm", subCategory: "beer", price: "360" },
    { name: "King Fisher Strong", desc: "India's favourite strong beer", imageLabel: "Kingfisher Strong", subCategory: "beer", price: "350" },
    { name: "King Fisher Light", desc: "Light and refreshing lager", imageLabel: "Kingfisher Light", subCategory: "beer", price: "350" },
    { name: "Budwiser Magnum Tin", desc: "Magnum in a convenient tin can", imageLabel: "Budweiser Tin", subCategory: "beer", price: "330" },
    { name: "Budwiser Premium Tin", desc: "Premium lager in a tin can", imageLabel: "Budweiser Tin", subCategory: "beer", price: "320" },
    { name: "Heineken Tin", desc: "Classic Dutch lager in a tin", imageLabel: "Heineken", subCategory: "beer", price: "300" },
    { name: "Bacardi Brezer", desc: "Fruity and refreshing Bacardi cooler", imageLabel: "Bacardi Brezer", subCategory: "beer", price: "290" },
    { name: "Brezer", desc: "Light fruity cooler drink", imageLabel: "Brezer", subCategory: "beer", price: "270" },
    // Premium Brandys
    { name: "S T Remy VSOP", desc: "Premium French brandy, smooth and refined", imageLabel: "ST Remy", subCategory: "brandy", variants: [{ label: "30ML", price: "300" }, { label: "60ML", price: "590" }, { label: "750ML", price: "5900" }] },
    { name: "Hobsons XR", desc: "Rich and full-bodied premium brandy", imageLabel: "Hobsons XR", subCategory: "brandy", variants: [{ label: "30ML", price: "230" }, { label: "60ML", price: "440" }, { label: "750ML", price: "4400" }] },
    { name: "Emperador", desc: "World's best-selling brandy", imageLabel: "Emperador", subCategory: "brandy", variants: [{ label: "30ML", price: "200" }, { label: "60ML", price: "380" }, { label: "750ML", price: "3800" }] },
    { name: "Morpheus Blue", desc: "Smooth Indian premium brandy", imageLabel: "Morpheus Blue", subCategory: "brandy", variants: [{ label: "30ML", price: "130" }, { label: "60ML", price: "260" }, { label: "750ML", price: "2600" }] },
    { name: "Bols", desc: "Dutch legacy brandy with a smooth finish", imageLabel: "Bols", subCategory: "brandy", variants: [{ label: "30ML", price: "120" }, { label: "60ML", price: "230" }, { label: "750ML", price: "2300" }] },
    { name: "Kyron", desc: "Classic brandy with a warm finish", imageLabel: "Kyron", subCategory: "brandy", variants: [{ label: "30ML", price: "110" }, { label: "60ML", price: "220" }, { label: "750ML", price: "2200" }] },
    { name: "Courrier Napoleon Green", desc: "French-style brandy with herbal notes", imageLabel: "Napoleon Green", subCategory: "brandy", variants: [{ label: "30ML", price: "110" }, { label: "60ML", price: "220" }, { label: "750ML", price: "2200" }] },
    { name: "Morpheus", desc: "Popular Indian brandy, smooth and mellow", imageLabel: "Morpheus", subCategory: "brandy", variants: [{ label: "30ML", price: "110" }, { label: "60ML", price: "210" }, { label: "750ML", price: "2100" }] },
    { name: "Courrier Napoleon Red", desc: "Bold French-style brandy", imageLabel: "Napoleon Red", subCategory: "brandy", variants: [{ label: "30ML", price: "80" }, { label: "60ML", price: "160" }, { label: "750ML", price: "1600" }] },
    { name: "Black & Gold VSOP", desc: "Aged VSOP brandy with oaky undertones", imageLabel: "Black Gold", subCategory: "brandy", variants: [{ label: "30ML", price: "80" }, { label: "60ML", price: "160" }, { label: "750ML", price: "1600" }] },
    { name: "Mansion House", desc: "Classic everyday brandy", imageLabel: "Mansion House", subCategory: "brandy", variants: [{ label: "30ML", price: "80" }, { label: "60ML", price: "150" }, { label: "750ML", price: "1500" }] },
  ],
  "Desserts": [
    { name: "Gold Leaf Entremet", desc: "Dark chocolate mousse, hazelnut praline, 24k gold", imageLabel: "Chocolate Dessert" },
    { name: "Deconstructed Cheesecake", desc: "Vanilla bean cheesecake mousse, graham crumble, berry compote", imageLabel: "Cheesecake" },
    { name: "Matcha Creme Brulee", desc: "Kyoto matcha, sesame crust, white chocolate drizzle", imageLabel: "Matcha Dessert" },
  ]
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});

  const getVariantIndex = (itemName: string) => selectedVariants[itemName] ?? 0;
  const setVariantIndex = (itemName: string, idx: number) =>
    setSelectedVariants((prev) => ({ ...prev, [itemName]: idx }));

  return (
    <div className="min-h-screen bg-background pt-16 pb-32">
      {/* Header */}
      <div className="py-12 text-center relative border-b border-white/5 bg-zinc-950">
        <div className="absolute inset-0 flex justify-center items-center opacity-15 pointer-events-none overflow-hidden">
          <span className="text-[20vw] font-display font-bold whitespace-nowrap text-primary">MENU</span>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl text-white font-display mb-6">
            Culinary <span className="text-white">Curations</span>
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
          >
            {(activeCategory === "Soups" || activeCategory === "Appetizer" || activeCategory === "Main Course") ? (
              /* Veg / Non-Veg split layout */
              <div className="space-y-16">
                {(["veg", "nonveg"] as const).map((itemType) => {
                  const items = menuData[activeCategory].filter((i) => i.type === itemType);
                  if (items.length === 0) return null;
                  const labelMap: Record<string, [string, string]> = {
                    "Soups": ["Soups Veg", "Soups Non-Veg"],
                    "Appetizer": ["Veg Appetizer", "Non-Veg Appetizer"],
                    "Main Course": ["Biryani Veg", "Biryani Non-Veg"],
                  };
                  const label = labelMap[activeCategory]?.[itemType === "veg" ? 0 : 1] ?? activeCategory;
                  return (
                    <div key={itemType}>
                      <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-2xl font-display tracking-[0.15em] uppercase text-white">
                          {label}
                        </h3>
                        <div className="h-[1px] flex-grow bg-white/10" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {items.map((item, idx) => (
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
                                <span className="text-primary font-display text-lg whitespace-nowrap">₹{item.price}</span>
                              </div>
                              <p className="text-white/60 leading-relaxed font-light">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : activeCategory === "Beverages" ? (
              /* Beverages — split by subCategory with variant dropdowns */
              <div className="space-y-16">
                {["wine", "beer", "brandy"].map((sub) => {
                  const items = menuData["Beverages"].filter((i) => i.subCategory === sub);
                  if (items.length === 0) return null;
                  const subLabel = sub === "wine" ? "Wine" : sub === "beer" ? "Beer" : "Premium Brandys";
                  return (
                    <div key={sub}>
                      <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-2xl font-display tracking-[0.15em] uppercase text-white">
                          {subLabel}
                        </h3>
                        <div className="h-[1px] flex-grow bg-white/10" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {items.map((item, idx) => {
                          const hasVariants = item.variants && item.variants.length > 0;
                          const vi = getVariantIndex(item.name);
                          const displayPrice = hasVariants ? item.variants![vi].price : item.price;
                          return (
                            <div key={idx} className="group flex flex-col sm:flex-row gap-6 items-start">
                              <div className="w-full sm:w-40 h-48 sm:h-40 shrink-0 overflow-hidden border border-white/10 rounded-sm">
                                <PlaceholderImage
                                  label={item.imageLabel}
                                  className="w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                                />
                              </div>
                              <div className="flex flex-col justify-center pt-2 flex-1">
                                <div className="flex items-center gap-4 mb-3">
                                  <h3 className="text-2xl text-white font-display tracking-wide">{item.name}</h3>
                                  <div className="h-[1px] flex-grow bg-white/10"></div>
                                  <span className="text-primary font-display text-lg whitespace-nowrap">₹{displayPrice}</span>
                                </div>
                                <p className="text-white/60 leading-relaxed font-light">{item.desc}</p>
                                {hasVariants && (
                                  <div className="mt-3 flex items-center gap-3">
                                    <span className="text-white/40 text-sm font-light">Qty:</span>
                                    <div className="flex gap-2">
                                      {item.variants!.map((v, vIdx) => (
                                        <button
                                          key={v.label}
                                          onClick={() => setVariantIndex(item.name, vIdx)}
                                          className={cn(
                                            "px-3 py-1 text-xs font-display tracking-wider uppercase rounded border transition-all duration-200",
                                            vi === vIdx
                                              ? "border-primary text-primary bg-primary/10"
                                              : "border-white/10 text-white/40 hover:text-white hover:border-white/30"
                                          )}
                                        >
                                          {v.label}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Default grid layout for other categories */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16">
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
                        {item.price && (
                          <span className="text-primary font-display text-lg whitespace-nowrap">₹{item.price}</span>
                        )}
                      </div>
                      <p className="text-white/60 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
