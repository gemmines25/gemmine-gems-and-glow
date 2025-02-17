
import { useState } from "react";
import { CategoryChip } from "@/components/CategoryChip";
import { ProductCard } from "@/components/ProductCard";
import { BottomNavbar } from "@/components/layout/BottomNavbar";

const categories = [
  "Lava",
  "Lapis Lazuli",
  "Coral",
  "Seven Chakra",
  "Rose Quartz",
  "Tourmaline",
  "Tiger Eye",
  "Sulemani Haqiq",
  "Pearl",
  "Amethyst",
  "Lebrolite",
  "Rudraksha",
];

// Temporary mock data
const products = [
  {
    id: "1",
    name: "Lava Bracelet",
    category: "Lava",
    price: 29.99,
    description: "Natural lava stone bracelet with healing properties",
    images: ["/placeholder.svg"],
    rating: 4.8,
    reviews: 124,
  },
  // Add more products...
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  return (
    <div className="pb-20">
      <header className="px-4 py-6 bg-white sticky top-0 z-40 border-b">
        <h1 className="text-2xl font-bold text-center mb-6">Gemmines</h1>
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-3 min-w-max px-4">
            <CategoryChip
              name="All"
              isActive={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
            />
            {categories.map((category) => (
              <CategoryChip
                key={category}
                name={category}
                isActive={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default Index;
