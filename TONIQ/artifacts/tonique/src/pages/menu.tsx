import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";

import imgBoiledCorn from "@/assets/menu/Boiled Corn.webp";
import imgBoiledPalliMasala from "@/assets/menu/Boiled Palli Masala.png";
import imgFrenchFries from "@/assets/menu/French Fries.webp";
import imgBoiledPalli from "@/assets/menu/boiled palli.png";
import imgVegSalad from "@/assets/menu/veg salad.webp";

import imgChicken555 from "@/assets/menu/Chicken 555.jpg";
import imgChickenMajestic from "@/assets/menu/Chicken Majestic.jpg";
import imgChickenMangolian from "@/assets/menu/Chicken Mangolian.jpg";
import imgChilliChicken from "@/assets/menu/Chilli Chicken.png";
import imgChilliEgg from "@/assets/menu/Chilli Egg.webp";
import imgEggManchurian from "@/assets/menu/Egg Manchurian.jpg";

import imgKajuPaneerBiryani from "@/assets/menu/Kaju Paneer Biryani.avif";
import imgMushroomBiryani from "@/assets/menu/Mushroom Biryani.jpg";
import imgPlainBiryani from "@/assets/menu/Plain Biryani.webp";
import imgSPVegBiryani from "@/assets/menu/SP Veg Biryani.avif";

import imgChickenDumBiryaniBL from "@/assets/menu/Chicken Dum Biryani BL.jpg";
import imgChickenDumBiryani from "@/assets/menu/Chicken Dum Biryani.jpg";
import imgChickenFryBiryani from "@/assets/menu/Chicken Fry Biryani.webp";
import imgChickenKeemaBiryani from "@/assets/menu/Chicken Keema Biryani.jpeg";
import imgMuttonDumBiryani from "@/assets/menu/Mutton Dum Biryani.webp";
import imgMuttonFryBiryani from "@/assets/menu/Mutton Fry Biryani.jpg";
import imgPrawnsBiryani from "@/assets/menu/Prawns Biryani.jpg";
import imgRamboBiryani from "@/assets/menu/Rambo Biryani.jpg";
import imgSPPrawnsBiryani from "@/assets/menu/sp Prawns Biryani.webp";
import imgSPChickenBiryani from "@/assets/menu/SP Chicken Biryani.png";

import imgVegClearSoup from "@/assets/menu/Veg Clear Soup.jpg";
import imgVegHotSourSoup from "@/assets/menu/Veg Hot & Sour Soup.jpg";
import imgVegManchowSoup from "@/assets/menu/Veg Manchow Soup.jpg";
import imgVegSweetCornSoup from "@/assets/menu/Veg Sweet Corn Soup.webp";

import imgChickenClearSoup from "@/assets/menu/Chicken Clear Soup.jpg";
import imgChickenDragonSoup from "@/assets/menu/Chicken Dragon Soup.jpg";
import imgChickenEggDropSoup from "@/assets/menu/Chicken Egg Drop Soup.jpg";
import imgChickenHotSourSoup from "@/assets/menu/Chicken Hot & Sour Soup.jpg";
import imgChickenManchowSoup from "@/assets/menu/Chicken Manchow Soup.jpg";
import imgChickenSweetCornSoup from "@/assets/menu/Chicken Sweet Corn Soup.jpeg";
import imgSeafoodSoup from "@/assets/menu/Seafood Soup.webp";

import imgJacobWine from "@/assets/menu/Jacob (White & Red).jpg";
import imgMaderaWine from "@/assets/menu/Madera Wine.webp";
import imgKyraWine from "@/assets/menu/Kyra Wine.webp";
import imgEliteWine from "@/assets/menu/ELITE.webp";

import imgBudwiserMagnum from "@/assets/menu/Budweiser Magnum.jpg";
import imgBudwiserPremium from "@/assets/menu/Budweiser Premium.jpg";
import imgCarlsbergElephant from "@/assets/menu/Carlsberg Elephant.png";
import imgKingFisherUltra from "@/assets/menu/Kingfisher Ultra.jpg";
import imgKingFisherStorm from "@/assets/menu/Kingfisher storm.jpg";
import imgKingFisherStrong from "@/assets/menu/Kingfisher Strong.png";
import imgKingFisherLight from "@/assets/menu/Kingfisher Light.jpg";
import imgBudwiserMagnumTin from "@/assets/menu/Budweiser Magnum Tin.jpg";
import imgBudwiserPremiumTin from "@/assets/menu/Budweiser Premium Tin.jpg";
import imgHeinekenTin from "@/assets/menu/Heineken Tin.png";
import imgBacardiBrezer from "@/assets/menu/Bacardi Breezer.png";
import imgBrezer from "@/assets/menu/Brezer.jpg";

import imgSTRemyVSOP from "@/assets/menu/ST Remy VSOP.webp";
import imgHobsonsXR from "@/assets/menu/Hobsons XR.webp";
import imgEmperador from "@/assets/menu/Emperador.webp";
import imgMorpheusBlue from "@/assets/menu/Morpheus Blue.jpg";
import imgBols from "@/assets/menu/Bols.webp";
import imgKyron from "@/assets/menu/Kyron.webp";
import imgCourrierNapoleonGreen from "@/assets/menu/Courrier Napoleon Green.jpg";
import imgMorpheus from "@/assets/menu/Morpheus.webp";
import imgCourrierNapoleonRed from "@/assets/menu/Courrier Napoleon Red.webp";
import imgBlackGoldVSOP from "@/assets/menu/LCIN04126Black & Gold VSOP.webp";
import imgMansionHouse from "@/assets/menu/Mansion House.jpg";

import imgTandooriRoti from "@/assets/menu/Tandoori Roti.jpg";
import imgButterNaan from "@/assets/menu/Butter Naan.jpg";
import imgPulka from "@/assets/menu/Pulka.jpg";
import imgButterRoti from "@/assets/menu/Butter Roti.jpg";
import imgPlainNaan from "@/assets/menu/Plain Naan.jpg";
import imgGarlicNaan from "@/assets/menu/Garlic Naan.jpg";

const menuCategories = ["Appetizer", "Main Course", "Soups", "Beverages", "Breads"];

interface MenuItem {
  name: string;
  desc: string;
  imageLabel: string;
  price?: string;
  type?: "veg" | "nonveg";
  variants?: { label: string; price: string }[];
  subCategory?: string;
  img?: string;
}

const menuData: Record<string, MenuItem[]> = {
  "Appetizer": [
    // Veg Appetizer
    { name: "Veg Salad", desc: "Fresh garden vegetables tossed in a light dressing", imageLabel: "Veg Salad", price: "150", type: "veg", img: imgVegSalad },
    { name: "French Fries", desc: "Crispy golden fries seasoned to perfection", imageLabel: "French Fries", price: "180", type: "veg", img: imgFrenchFries },
    { name: "Boiled Corn", desc: "Sweet corn kernels boiled with butter and spices", imageLabel: "Boiled Corn", price: "190", type: "veg", img: imgBoiledCorn },
    { name: "Boiled Palli Masala", desc: "Spiced boiled peanuts with tangy masala", imageLabel: "Palli Masala", price: "180", type: "veg", img: imgBoiledPalliMasala },
    { name: "Boiled Palli", desc: "Classic boiled peanuts with a pinch of salt", imageLabel: "Boiled Palli", price: "160", type: "veg", img: imgBoiledPalli },
    // Non-Veg Appetizer
    { name: "Chilli Egg", desc: "Boiled eggs tossed in spicy chilli sauce", imageLabel: "Chilli Egg", price: "240", type: "nonveg", img: imgChilliEgg },
    { name: "Egg Manchurian", desc: "Crispy egg fritters in tangy Manchurian gravy", imageLabel: "Egg Manchurian", price: "240", type: "nonveg", img: imgEggManchurian },
    { name: "Chicken Mangolian", desc: "Tender chicken in a smoky Mongolian sauce", imageLabel: "Chicken Mongolian", price: "330", type: "nonveg", img: imgChickenMangolian },
    { name: "Chicken 555", desc: "Spicy deep-fried chicken with fiery seasoning", imageLabel: "Chicken 555", price: "330", type: "nonveg", img: imgChicken555 },
    { name: "Chicken Majestic", desc: "Crispy fried chicken strips with curry leaves and spices", imageLabel: "Chicken Majestic", price: "330", type: "nonveg", img: imgChickenMajestic },
    { name: "Chilli Chicken", desc: "Classic Indo-Chinese chilli chicken with bell peppers", imageLabel: "Chilli Chicken", price: "350", type: "nonveg", img: imgChilliChicken },
  ],
  "Main Course": [
    // Biryani Veg
    { name: "Plain Biryani", desc: "Classic vegetable biryani with mild spices and herbs", imageLabel: "Plain Biryani", price: "220", type: "veg", img: imgPlainBiryani },
    { name: "Kaju Paneer Biryani", desc: "Rich biryani with cashews and paneer in aromatic gravy", imageLabel: "Kaju Paneer Biryani", price: "280", type: "veg", img: imgKajuPaneerBiryani },
    { name: "Mushroom Biryani", desc: "Flavorful biryani loaded with fresh mushrooms and spices", imageLabel: "Mushroom Biryani", price: "260", type: "veg", img: imgMushroomBiryani },
    { name: "SP Veg Biryani", desc: "Special house-style veg biryani with premium ingredients", imageLabel: "SP Veg Biryani", price: "280", type: "veg", img: imgSPVegBiryani },
    // Biryani Non-Veg
    { name: "Chicken Dum Biryani", desc: "Slow-cooked dum biryani with tender chicken and saffron rice", imageLabel: "Chicken Dum Biryani", price: "240", type: "nonveg", img: imgChickenDumBiryani },
    { name: "Chicken Dum Biryani BL", desc: "Boneless chicken dum biryani with rich spices", imageLabel: "Chicken BL Biryani", price: "220", type: "nonveg", img: imgChickenDumBiryaniBL },
    { name: "Chicken Fry Biryani Bone", desc: "Biryani topped with crispy fried chicken on the bone", imageLabel: "Chicken Fry Biryani", price: "280", type: "nonveg", img: imgChickenFryBiryani },
    { name: "Chicken Keema Biryani", desc: "Aromatic biryani with spiced minced chicken keema", imageLabel: "Keema Biryani", price: "260", type: "nonveg", img: imgChickenKeemaBiryani },
    { name: "Rambo Biryani", desc: "Extra-loaded signature biryani with bold flavors", imageLabel: "Rambo Biryani", price: "280", type: "nonveg", img: imgRamboBiryani },
    { name: "SP Chicken Biryani", desc: "Special house chicken biryani with premium spice blend", imageLabel: "SP Chicken Biryani", price: "330", type: "nonveg", img: imgSPChickenBiryani },
    { name: "Mutton Dum Biryani", desc: "Traditional slow-cooked mutton dum biryani", imageLabel: "Mutton Biryani", price: "350", type: "nonveg", img: imgMuttonDumBiryani },
    { name: "Mutton Fry Biryani", desc: "Biryani served with crispy fried mutton pieces", imageLabel: "Mutton Fry Biryani", price: "400", type: "nonveg", img: imgMuttonFryBiryani },
    { name: "Prawns Biryani", desc: "Coastal-style biryani with juicy prawns and spices", imageLabel: "Prawns Biryani", price: "420", type: "nonveg", img: imgPrawnsBiryani },
    { name: "SP Prawns Biryani", desc: "Premium special prawns biryani with rich gravy", imageLabel: "SP Prawns Biryani", price: "400", type: "nonveg", img: imgSPPrawnsBiryani },
  ],
  "Soups": [
    // Veg Soups
    { name: "Veg Clear Soup", desc: "Light and refreshing clear vegetable broth with seasonal greens", imageLabel: "Clear Soup", price: "160", type: "veg", img: imgVegClearSoup },
    { name: "Veg Hot & Sour Soup", desc: "Spicy and tangy broth with mixed vegetables, tofu, and chili", imageLabel: "Hot Sour Soup", price: "160", type: "veg", img: imgVegHotSourSoup },
    { name: "Veg Manchow Soup", desc: "Indo-Chinese style thick soup with crispy fried noodles", imageLabel: "Manchow Soup", price: "160", type: "veg", img: imgVegManchowSoup },
    { name: "Veg Sweet Corn Soup", desc: "Creamy sweet corn soup with fresh herbs and pepper", imageLabel: "Corn Soup", price: "160", type: "veg", img: imgVegSweetCornSoup },
    // Non-Veg Soups
    { name: "Chicken Clear Soup", desc: "Classic clear chicken broth with shredded chicken and herbs", imageLabel: "Chicken Soup", price: "200", type: "nonveg", img: imgChickenClearSoup },
    { name: "Chicken Sweet Corn Soup", desc: "Silky sweet corn soup with tender chicken strips", imageLabel: "Chicken Corn Soup", price: "200", type: "nonveg", img: imgChickenSweetCornSoup },
    { name: "Chicken Manchow Soup", desc: "Spiced chicken broth topped with crispy fried noodles", imageLabel: "Chicken Manchow", price: "200", type: "nonveg", img: imgChickenManchowSoup },
    { name: "Chicken Hot & Sour Soup", desc: "Bold and fiery chicken broth with tangy spices and vegetables", imageLabel: "Chicken Hot Sour", price: "200", type: "nonveg", img: imgChickenHotSourSoup },
    { name: "Chicken Dragon Soup", desc: "Fiery dragon-style chicken broth with exotic spices", imageLabel: "Dragon Soup", price: "200", type: "nonveg", img: imgChickenDragonSoup },
    { name: "Chicken Egg Drop Soup", desc: "Delicate chicken broth with silky ribbons of beaten egg", imageLabel: "Egg Drop Soup", price: "210", type: "nonveg", img: imgChickenEggDropSoup },
    { name: "Sea Food Soup", desc: "Rich seafood medley in a savory aromatic broth", imageLabel: "Seafood Soup", price: "210", type: "nonveg", img: imgSeafoodSoup },
  ],
  "Beverages": [
    // Wine
    { name: "Jacob (White & Red)", desc: "Premium imported wine, white and red varieties", imageLabel: "Jacob Wine", subCategory: "wine", variants: [{ label: "90ML", price: "520" }, { label: "750ML", price: "4200" }], img: imgJacobWine },
    { name: "Madera", desc: "Rich and smooth Madera wine", imageLabel: "Madera Wine", subCategory: "wine", variants: [{ label: "90ML", price: "430" }, { label: "750ML", price: "3400" }], img: imgMaderaWine },
    { name: "Kyra", desc: "Light and fruity Kyra wine", imageLabel: "Kyra Wine", subCategory: "wine", variants: [{ label: "90ML", price: "270" }, { label: "750ML", price: "2200" }], img: imgKyraWine },
    { name: "Elite", desc: "Everyday classic wine selection", imageLabel: "Elite Wine", subCategory: "wine", variants: [{ label: "90ML", price: "180" }, { label: "750ML", price: "1400" }], img: imgEliteWine },
    // Beer
    { name: "Budwiser Magnum", desc: "Bold and strong premium lager", imageLabel: "Budweiser Magnum", subCategory: "beer", price: "450", img: imgBudwiserMagnum },
    { name: "Budwiser Premium", desc: "Smooth premium American lager", imageLabel: "Budweiser Premium", subCategory: "beer", price: "420", img: imgBudwiserPremium },
    { name: "Carlsberg Elephant", desc: "Extra strong Danish lager", imageLabel: "Carlsberg", subCategory: "beer", price: "400", img: imgCarlsbergElephant },
    { name: "King Fisher Ultra", desc: "Ultra-smooth wheat beer", imageLabel: "Kingfisher Ultra", subCategory: "beer", price: "400", img: imgKingFisherUltra },
    { name: "King Fisher Storm", desc: "Bold and intense strong beer", imageLabel: "Kingfisher Storm", subCategory: "beer", price: "360", img: imgKingFisherStorm },
    { name: "King Fisher Strong", desc: "India's favourite strong beer", imageLabel: "Kingfisher Strong", subCategory: "beer", price: "350", img: imgKingFisherStrong },
    { name: "King Fisher Light", desc: "Light and refreshing lager", imageLabel: "Kingfisher Light", subCategory: "beer", price: "350", img: imgKingFisherLight },
    { name: "Budwiser Magnum Tin", desc: "Magnum in a convenient tin can", imageLabel: "Budweiser Tin", subCategory: "beer", price: "330", img: imgBudwiserMagnumTin },
    { name: "Budwiser Premium Tin", desc: "Premium lager in a tin can", imageLabel: "Budweiser Tin", subCategory: "beer", price: "320", img: imgBudwiserPremiumTin },
    { name: "Heineken Tin", desc: "Classic Dutch lager in a tin", imageLabel: "Heineken", subCategory: "beer", price: "300", img: imgHeinekenTin },
    { name: "Bacardi Brezer", desc: "Fruity and refreshing Bacardi cooler", imageLabel: "Bacardi Brezer", subCategory: "beer", price: "290", img: imgBacardiBrezer },
    { name: "Brezer", desc: "Light fruity cooler drink", imageLabel: "Brezer", subCategory: "beer", price: "270", img: imgBrezer },
    // Premium Brandys
    { name: "S T Remy VSOP", desc: "Premium French brandy, smooth and refined", imageLabel: "ST Remy", subCategory: "brandy", variants: [{ label: "30ML", price: "300" }, { label: "60ML", price: "590" }, { label: "750ML", price: "5900" }], img: imgSTRemyVSOP },
    { name: "Hobsons XR", desc: "Rich and full-bodied premium brandy", imageLabel: "Hobsons XR", subCategory: "brandy", variants: [{ label: "30ML", price: "230" }, { label: "60ML", price: "440" }, { label: "750ML", price: "4400" }], img: imgHobsonsXR },
    { name: "Emperador", desc: "World's best-selling brandy", imageLabel: "Emperador", subCategory: "brandy", variants: [{ label: "30ML", price: "200" }, { label: "60ML", price: "380" }, { label: "750ML", price: "3800" }], img: imgEmperador },
    { name: "Morpheus Blue", desc: "Smooth Indian premium brandy", imageLabel: "Morpheus Blue", subCategory: "brandy", variants: [{ label: "30ML", price: "130" }, { label: "60ML", price: "260" }, { label: "750ML", price: "2600" }], img: imgMorpheusBlue },
    { name: "Bols", desc: "Dutch legacy brandy with a smooth finish", imageLabel: "Bols", subCategory: "brandy", variants: [{ label: "30ML", price: "120" }, { label: "60ML", price: "230" }, { label: "750ML", price: "2300" }], img: imgBols },
    { name: "Kyron", desc: "Classic brandy with a warm finish", imageLabel: "Kyron", subCategory: "brandy", variants: [{ label: "30ML", price: "110" }, { label: "60ML", price: "220" }, { label: "750ML", price: "2200" }], img: imgKyron },
    { name: "Courrier Napoleon Green", desc: "French-style brandy with herbal notes", imageLabel: "Napoleon Green", subCategory: "brandy", variants: [{ label: "30ML", price: "110" }, { label: "60ML", price: "220" }, { label: "750ML", price: "2200" }], img: imgCourrierNapoleonGreen },
    { name: "Morpheus", desc: "Popular Indian brandy, smooth and mellow", imageLabel: "Morpheus", subCategory: "brandy", variants: [{ label: "30ML", price: "110" }, { label: "60ML", price: "210" }, { label: "750ML", price: "2100" }], img: imgMorpheus },
    { name: "Courrier Napoleon Red", desc: "Bold French-style brandy", imageLabel: "Napoleon Red", subCategory: "brandy", variants: [{ label: "30ML", price: "80" }, { label: "60ML", price: "160" }, { label: "750ML", price: "1600" }], img: imgCourrierNapoleonRed },
    { name: "Black & Gold VSOP", desc: "Aged VSOP brandy with oaky undertones", imageLabel: "Black Gold", subCategory: "brandy", variants: [{ label: "30ML", price: "80" }, { label: "60ML", price: "160" }, { label: "750ML", price: "1600" }], img: imgBlackGoldVSOP },
    { name: "Mansion House", desc: "Classic everyday brandy", imageLabel: "Mansion House", subCategory: "brandy", variants: [{ label: "30ML", price: "80" }, { label: "60ML", price: "150" }, { label: "750ML", price: "1500" }], img: imgMansionHouse },
  ],
  "Breads": [
    { name: "Tandoori Roti", desc: "Traditional Indian flatbread baked in a clay oven", imageLabel: "Tandoori Roti", price: "40", img: imgTandooriRoti },
    { name: "Butter Naan", desc: "Soft leavened bread slathered with rich butter", imageLabel: "Butter Naan", price: "50", img: imgButterNaan },
    { name: "Pulka", desc: "Soft and thin puffed Indian flatbread", imageLabel: "Pulka", price: "20", img: imgPulka },
    { name: "Butter Roti", desc: "Tandoor-baked flatbread glazed with butter", imageLabel: "Butter Roti", price: "45", img: imgButterRoti },
    { name: "Plain Naan", desc: "Classic soft and chewy leavened flatbread", imageLabel: "Plain Naan", price: "40", img: imgPlainNaan },
    { name: "Garlic Naan", desc: "Flavorful naan topped with minced garlic and cilantro", imageLabel: "Garlic Naan", price: "60", img: imgGarlicNaan },
  ]
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const decodedHash = decodeURIComponent(hash);
        const category = menuCategories.find(
          (c) => c.toLowerCase() === decodedHash.toLowerCase()
        );
        if (category) {
          setActiveCategory(category);
          // Optional: scroll slightly down so the menu items are visible
          setTimeout(() => {
            window.scrollTo({
              top: window.innerHeight * 0.4,
              behavior: "smooth"
            });
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const getVariantIndex = (itemName: string) => selectedVariants[itemName] ?? 0;
  const setVariantIndex = (itemName: string, idx: number) =>
    setSelectedVariants((prev) => ({ ...prev, [itemName]: idx }));

  return (
    <div className="min-h-screen bg-background pt-16 pb-32">
      {/* Header */}
      <div className="py-24 text-center relative border-b border-white/5 bg-zinc-950">
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
                onClick={() => {
                  setActiveCategory(cat);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
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
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                                src={item.img}
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
                                  src={item.img}
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
                        src={item.img}
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
