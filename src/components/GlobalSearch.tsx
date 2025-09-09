import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, BookOpen, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import monasteries from '@/data/monasteries.json';
import festivals from '@/data/festivals.json';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'monastery' | 'festival' | 'manuscript' | 'community';
  href: string;
  image?: string;
  metadata?: string;
}

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Prepare search data
  const searchData: SearchResult[] = [
    // Monasteries
    ...monasteries.map(monastery => ({
      id: monastery.id,
      title: monastery.name,
      description: monastery.description,
      type: 'monastery' as const,
      href: `/monasteries/${monastery.id}`,
      image: monastery.images?.[0],
      metadata: `${monastery.district} • ${monastery.sect} • Founded ${monastery.foundingYear}`
    })),
    // Festivals
    ...festivals.map(festival => ({
      id: festival.id,
      title: festival.name,
      description: festival.description,
      type: 'festival' as const,
      href: `/festivals/${festival.id}`,
      image: festival.images?.[0],
      metadata: `${festival.date} • ${festival.monasteries?.[0] || 'Multiple Locations'}`
    })),
    // Sample manuscripts and community content
    {
      id: 'manuscripts',
      title: 'Ancient Manuscripts Collection',
      description: 'Explore digitized Buddhist texts and sacred writings',
      type: 'manuscript',
      href: '/monasteries',
      metadata: 'Digital Archives'
    },
    {
      id: 'community',
      title: 'Community Stories',
      description: 'Share and read inspiring spiritual journeys',
      type: 'community',
      href: '/community',
      metadata: 'Community Platform'
    }
  ];

  // Initialize Fuse.js for fuzzy search
  const fuse = new Fuse(searchData, {
    keys: ['title', 'description', 'metadata'],
    threshold: 0.3,
    includeScore: true
  });

  // AI-powered suggestions
  const aiSuggestions = [
    "ancient monasteries in West Sikkim",
    "Kagyu sect monasteries", 
    "festivals at Rumtek Monastery",
    "Pemayangtse sacred manuscripts",
    "Buddhist festivals in January",
    "highest altitude monastery",
    "Losar celebration traditions",
    "monastery architectural styles",
    "meditation retreat centers",
    "Tibetan Buddhist teachings"
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim() === '') {
      setResults([]);
      setSuggestions([]);
      return;
    }

    // Perform fuzzy search
    const fuseResults = fuse.search(searchQuery);
    const searchResults = fuseResults.slice(0, 8).map(result => result.item);
    setResults(searchResults);

    // Filter AI suggestions
    const filteredSuggestions = aiSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 3);
    setSuggestions(filteredSuggestions);

    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'monastery': return <MapPin className="w-4 h-4" />;
      case 'festival': return <Calendar className="w-4 h-4" />;
      case 'manuscript': return <BookOpen className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'monastery': return 'text-primary bg-primary/10';
      case 'festival': return 'text-secondary bg-secondary/10';
      case 'manuscript': return 'text-accent bg-accent/10';
      case 'community': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-lg">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask about monasteries, festivals, or cultural heritage..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (query.trim() !== '' || suggestions.length > 0 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-sacred z-50 max-h-96 overflow-y-auto"
          >
            {/* AI Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-3 border-b border-border">
                <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                  <span className="mr-2">🤖</span>
                  AI Suggestions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 text-xs bg-muted hover:bg-accent rounded-full transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {results.length > 0 && (
              <div className="py-2">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    to={result.href}
                    onClick={handleResultClick}
                    className="flex items-start space-x-3 px-4 py-3 hover:bg-muted transition-colors group"
                  >
                    <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {result.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {result.description}
                      </p>
                      {result.metadata && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {result.metadata}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            )}

            {/* No Results */}
            {query.trim() !== '' && results.length === 0 && suggestions.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No results found for "{query}"</p>
                <p className="text-xs mt-1">Try searching for monasteries, festivals, or cultural topics</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearch;