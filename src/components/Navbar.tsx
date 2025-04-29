
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth(); // Use the auth context

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-18"
                src="https://pay.fragnel.edu.in/images/BlueLogo.png" // Replace with your logo path
                alt="CampusConnect Logo"
              />
              <span className="text-2xl font-bold text-campus-purple">CampusConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/events" className="text-gray-700 hover:text-campus-purple px-3 py-2 rounded-md">
              Events
            </Link>
            <Link to="/councils" className="text-gray-700 hover:text-campus-purple px-3 py-2 rounded-md">
              Councils
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-campus-purple px-3 py-2 rounded-md">
              Gallery
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-campus-purple px-3 py-2 rounded-md">
              About
            </Link>
            
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <User size={16} />
                    <span>{user.name}</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-campus-purple hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-campus-purple"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/events"
              className="text-gray-700 hover:bg-gray-100 hover:text-campus-purple block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              to="/councils"
              className="text-gray-700 hover:bg-gray-100 hover:text-campus-purple block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Councils
            </Link>
            <Link 
              to="/gallery"
              className="text-gray-700 hover:bg-gray-100 hover:text-campus-purple block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              to="/about"
              className="text-gray-700 hover:bg-gray-100 hover:text-campus-purple block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {isAuthenticated && user ? (
              <>
                <Link 
                  to="/dashboard"
                  className="text-gray-700 hover:bg-gray-100 hover:text-campus-purple block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  className="text-gray-700 hover:bg-gray-100 hover:text-campus-purple block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-gray-700 hover:bg-gray-100 hover:text-campus-purple block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/register"
                  className="text-gray-700 hover:bg-gray-100 hover:text-campus-purple block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
