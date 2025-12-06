import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import grillIcon from "@/assets/grill-icon.png";

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Header = ({ isAuthenticated = false, onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-primary">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={grillIcon} alt="Grill" className="h-8 w-8 invert" />
          <span className="font-chewy text-xl text-primary-foreground">
            Pimp your grill
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button
                  variant={isActive("/profile") ? "outline" : "ghost"}
                  className={cn(
                    "text-primary-foreground hover:bg-primary-light hover:text-primary-foreground",
                    isActive("/profile") && "border-primary-foreground"
                  )}
                >
                  Profil
                </Button>
              </Link>
              <Link to="/best-grills">
                <Button
                  variant={isActive("/best-grills") ? "outline" : "ghost"}
                  className={cn(
                    "text-primary-foreground hover:bg-primary-light hover:text-primary-foreground",
                    isActive("/best-grills") && "border-primary-foreground"
                  )}
                >
                  Best grills
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={onLogout}
                className="text-primary-foreground hover:bg-primary-light hover:text-primary-foreground"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/best-grills">
                <Button
                  variant="ghost"
                  className={cn(
                    "text-primary-foreground hover:bg-primary-light hover:text-primary-foreground",
                    isActive("/best-grills") && "bg-primary-light"
                  )}
                >
                  Best grills
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className={cn(
                    "text-primary-foreground hover:bg-primary-light hover:text-primary-foreground",
                    isActive("/login") && "bg-primary-light"
                  )}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="ghost"
                  className={cn(
                    "text-primary-foreground hover:bg-primary-light hover:text-primary-foreground",
                    isActive("/register") && "bg-primary-light"
                  )}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-primary-foreground hover:bg-primary-light"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-primary-light bg-primary animate-fade-in">
          <div className="container py-4 flex flex-col gap-2">
            <Link to="/best-grills" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-primary-foreground hover:bg-primary-light",
                  isActive("/best-grills") && "bg-primary-light"
                )}
              >
                Best grills
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-primary-foreground hover:bg-primary-light"
                  >
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onLogout?.();
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start text-primary-foreground hover:bg-primary-light"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-primary-foreground hover:bg-primary-light"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-primary-foreground hover:bg-primary-light"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
