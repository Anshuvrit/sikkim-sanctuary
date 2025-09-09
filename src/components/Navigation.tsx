import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/AuthModal';
import GlobalSearch from '@/components/GlobalSearch';

import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, MapPin, Calendar, Users, Map } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<{name: string; email: string; avatar: string} | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  // Check for existing authentication on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('monastery360_auth');
    const savedUser = localStorage.getItem('monastery360_user');
    
    if (savedAuth && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (userData: {name: string; email: string; avatar: string}) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('monastery360_auth');
    localStorage.removeItem('monastery360_user');
    setUser(null);
    setShowUserMenu(false);
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

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
                <h1 className="text-xl font-bold text-gradient-sacred">Monastery 360</h1>
                <p className="text-xs text-muted-foreground">Sikkim Buddhist Legacy</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <GlobalSearch />
              
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

              {/* Auth Section */}
              <div className="flex items-center space-x-3">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium">{user.name}</span>
                    </button>
                    
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-sacred z-50"
                        >
                          <div className="p-3 border-b border-border">
                            <p className="font-medium text-primary">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="p-2">
                            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted rounded">
                              <Crown className="w-4 h-4" />
                              <span>Premium Features</span>
                            </button>
                            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted rounded">
                              <Settings className="w-4 h-4" />
                              <span>Settings</span>
                            </button>
                            <button 
                              onClick={handleLogout}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted rounded text-red-600"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openAuthModal('login')}
                    >
                      Sign In
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => openAuthModal('signup')}
                      className="btn-sacred"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
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
            <span className="text-lg font-bold text-gradient-sacred">360</span>
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navigation;