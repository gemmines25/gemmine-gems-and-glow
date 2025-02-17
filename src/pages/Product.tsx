
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { BottomNavbar } from "@/components/layout/BottomNavbar";
import { useQuery } from "@tanstack/react-query";
import { getProduct, addToCart } from "@/lib/supabase";
import { useUser } from "@supabase/auth-helpers-react";

const Product = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = useUser();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
  });

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to your cart",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    try {
      await addToCart(user.id, product!.id);
      toast({
        title: "Added to cart",
        description: `${product!.name} has been added to your cart`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Could not add item to cart",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!product) {
    return <div className="p-4">Product not found</div>;
  }

  return (
    <div className="pb-20">
      <div className="relative">
        <img
          src={product.images[selectedImage]}
          alt={product.name}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                selectedImage === index ? "bg-primary" : "bg-white/50"
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <p className="text-2xl font-bold text-primary">${product.price}</p>

        <div className="space-y-2">
          <h2 className="font-semibold">Description</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>

        <Button
          className="w-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Product;
