import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, MapPin, Calendar, Users, BookOpen, Map } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/monasteries", label: "Monasteries", icon: MapPin },
    { href: "/festivals", label: "Festivals", icon: Calendar },
    { href: "/community", label: "Community", icon: Users },
    { href: "/map", label: "Map", icon: Map },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container-temple">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-sunset rounded-full flex items-center justify-center animate-lotus-bloom">
                <span className="text-white text-sm font-bold">🏛️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient-sacred">Monastery Heritage</h1>
                <p className="text-xs text-muted-foreground">Sikkim Buddhist Legacy</p>
              </div>
            </Link>

            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-sacred ${
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-sunset rounded-full flex items-center justify-center animate-lotus-bloom">
              <span className="text-white text-sm">🏛️</span>
            </div>
            <span className="text-lg font-bold text-gradient-sacred">Heritage</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-accent text-accent-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-background border-b border-border"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-gentle ${
                          isActive(item.href)
                            ? "bg-primary text-primary-foreground shadow-soft"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur-sm border-t border-border z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-gentle ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;