
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { BottomNavbar } from "@/components/layout/BottomNavbar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Temporary mock data - will be replaced with Supabase query
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-white z-40 p-4 border-b">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            className="pl-10"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <main className="p-4">
        {searchQuery && (
          <p className="mb-4 text-gray-600">
            {filteredProducts.length} results for "{searchQuery}"
          </p>
        )}
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default Search;
