
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNavbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex items-center justify-around">
        <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link to="/search" className={`nav-item ${location.pathname === "/search" ? "active" : ""}`}>
          <Search size={20} />
          <span>Search</span>
        </Link>
        <Link to="/cart" className={`nav-item ${location.pathname === "/cart" ? "active" : ""}`}>
          <ShoppingBag size={20} />
          <span>Cart</span>
        </Link>
        <Link to="/profile" className={`nav-item ${location.pathname === "/profile" ? "active" : ""}`}>
          <User size={20} />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
};
