
import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { getCartItems, removeCartItem, updateCartItemQuantity } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BottomNavbar } from "@/components/layout/BottomNavbar";

interface CartItem {
  id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
}

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadCartItems();
    }
  }, [user]);

  const loadCartItems = async () => {
    try {
      const data = await getCartItems(user!.id);
      setItems(data as unknown as CartItem[]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not load cart items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItemQuantity(itemId, newQuantity);
      setItems(items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update quantity",
        variant: "destructive",
      });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeCartItem(itemId);
      setItems(items.filter(item => item.id !== itemId));
      toast({
        description: "Item removed from cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not remove item",
        variant: "destructive",
      });
    }
  };

  const total = items.reduce((sum, item) => sum + item.products.price * item.quantity, 0);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="pb-20">
      <header className="sticky top-0 bg-white z-40 p-4 border-b">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
      </header>

      <main className="p-4">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border rounded-lg p-4">
                <img
                  src={item.products.images[0]}
                  alt={item.products.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.products.name}</h3>
                  <p className="text-primary font-bold mt-1">
                    ${item.products.price}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="ml-auto"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 mt-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          </div>
        )}
      </main>

      <BottomNavbar />
    </div>
  );
};

export default Cart;
