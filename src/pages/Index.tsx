
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CategoryChip } from "@/components/CategoryChip";
import { ProductCard } from "@/components/ProductCard";
import { BottomNavbar } from "@/components/layout/BottomNavbar";
import { getProducts } from "@/lib/supabase";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";

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

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const user = useUser();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="pb-20">
      <header className="px-4 py-6 bg-white sticky top-0 z-40 border-b">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gemmines</h1>
          {!user && (
            <Button variant="outline" asChild>
              <Link to="/auth">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
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
        {isLoading ? (
          <div className="text-center">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500">
            No products found in this category
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <BottomNavbar />
    </div>
  );
};

export default Index;
