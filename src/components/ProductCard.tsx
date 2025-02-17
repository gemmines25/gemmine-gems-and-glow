
import { Product } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden card-hover">
        <CardContent className="p-0">
          <div className="aspect-square relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-primary font-bold">${product.price}</span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
