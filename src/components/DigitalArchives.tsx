import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ZoomIn, ZoomOut, RotateCcw, Download, BookOpen, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Fuse from 'fuse.js';

interface Manuscript {
  id: string;
  title: string;
  description: string;
  language: string;
  era: string;
  type: 'religious' | 'historical' | 'philosophical' | 'cultural';
  monastery: string;
  image: string;
  pages: number;
  digitalQuality: 'high' | 'medium' | 'pending';
  keywords: string[];
}

const manuscriptsData: Manuscript[] = [
  {
    id: 'ms-001',
    title: 'Golden Manuscript of Karmapa',
    description: 'Sacred teachings of the 16th Karmapa, written in gold ink on handmade paper. Contains fundamental Buddhist philosophy and meditation practices.',
    language: 'Tibetan',
    era: '16th Century',
    type: 'religious',
    monastery: 'Rumtek Monastery',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    pages: 108,
    digitalQuality: 'high',
    keywords: ['karmapa', 'meditation', 'buddhist philosophy', 'gold ink', 'tibetan']
  },
  {
    id: 'ms-002',
    title: 'Prayer Collection of Pemayangtse',
    description: 'Daily prayers and ritual instructions used by monks at Pemayangtse Monastery for over 300 years.',
    language: 'Sanskrit/Tibetan',
    era: '18th Century',
    type: 'religious',
    monastery: 'Pemayangtse Monastery',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    pages: 156,
    digitalQuality: 'high',
    keywords: ['prayers', 'ritual', 'pemayangtse', 'daily practice', 'monks']
  },
  {
    id: 'ms-003',
    title: 'Sangdogpalri Architectural Guide',
    description: 'Detailed instructions for building the celestial palace model, including sacred geometries and symbolic meanings.',
    language: 'Tibetan',
    era: '1705',
    type: 'cultural',
    monastery: 'Pemayangtse Monastery',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    pages: 89,
    digitalQuality: 'medium',
    keywords: ['architecture', 'celestial palace', 'sacred geometry', 'construction']
  },
  {
    id: 'ms-004',
    title: 'History of Sikkim Buddhism',
    description: 'Comprehensive chronicle of Buddhism\'s arrival and development in Sikkim, written by Lama Lhatsun Chenpo.',
    language: 'Tibetan',
    era: '17th Century',
    type: 'historical',
    monastery: 'Dubdi Monastery',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    pages: 234,
    digitalQuality: 'high',
    keywords: ['sikkim history', 'buddhism arrival', 'lama lhatsun', 'chronicle']
  },
  {
    id: 'ms-005',
    title: 'Medicinal Plants of the Himalayas',
    description: 'Traditional Buddhist medical knowledge documenting healing properties of Himalayan flora.',
    language: 'Tibetan/Sanskrit',
    era: '19th Century',
    type: 'philosophical',
    monastery: 'Tashiding Monastery',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    pages: 167,
    digitalQuality: 'pending',
    keywords: ['medicine', 'plants', 'healing', 'himalayan', 'traditional knowledge']
  },
  {
    id: 'ms-006',
    title: 'Festival Celebration Guidelines',
    description: 'Instructions for conducting traditional Buddhist festivals including Losar, Bumchu, and Saga Dawa.',
    language: 'Tibetan',
    era: '18th Century',
    type: 'cultural',
    monastery: 'Enchey Monastery',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    pages: 78,
    digitalQuality: 'high',
    keywords: ['festivals', 'losar', 'bumchu', 'saga dawa', 'celebration']
  }
];

const DigitalArchives = () => {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>(manuscriptsData);
  const [filteredManuscripts, setFilteredManuscripts] = useState<Manuscript[]>(manuscriptsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | null>(null);
  const [viewerZoom, setViewerZoom] = useState(1);
  const [viewerRotation, setViewerRotation] = useState(0);

  // Initialize Fuse.js for search
  const fuse = new Fuse(manuscripts, {
    keys: ['title', 'description', 'keywords', 'monastery', 'language', 'era'],
    threshold: 0.3
  });

  useEffect(() => {
    let results = manuscripts;

    // Apply search filter
    if (searchQuery.trim()) {
      const fuseResults = fuse.search(searchQuery);
      results = fuseResults.map(result => result.item);
    }

    // Apply type filter
    if (selectedType !== 'all') {
      results = results.filter(ms => ms.type === selectedType);
    }

    // Apply language filter
    if (selectedLanguage !== 'all') {
      results = results.filter(ms => ms.language.toLowerCase().includes(selectedLanguage.toLowerCase()));
    }

    setFilteredManuscripts(results);
  }, [searchQuery, selectedType, selectedLanguage, manuscripts]);

  const handleManuscriptClick = (manuscript: Manuscript) => {
    if (manuscript.digitalQuality === 'pending') {
      return; // Don't open viewer for pending manuscripts
    }
    setSelectedManuscript(manuscript);
    setViewerZoom(1);
    setViewerRotation(0);
  };

  const closeViewer = () => {
    setSelectedManuscript(null);
  };

  const zoomIn = () => {
    setViewerZoom(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setViewerZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const rotate = () => {
    setViewerRotation(prev => prev + 90);
  };

  const resetView = () => {
    setViewerZoom(1);
    setViewerRotation(0);
  };

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case 'high':
        return <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">High Quality</span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs bg-secondary/20 text-secondary rounded-full">Medium Quality</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">Digitization Pending</span>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'religious': return '🙏';
      case 'historical': return '📜';
      case 'philosophical': return '🧠';
      case 'cultural': return '🎭';
      default: return '📖';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gradient-sacred mb-4">Digital Manuscript Archives</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore high-resolution scans of sacred Buddhist manuscripts, preserving centuries of wisdom for future generations.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search manuscripts, topics, or monasteries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="all">All Types</option>
            <option value="religious">Religious Texts</option>
            <option value="historical">Historical Records</option>
            <option value="philosophical">Philosophical Works</option>
            <option value="cultural">Cultural Guides</option>
          </select>

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="all">All Languages</option>
            <option value="tibetan">Tibetan</option>
            <option value="sanskrit">Sanskrit</option>
            <option value="nepali">Nepali</option>
          </select>
        </div>
      </div>

      {/* Manuscripts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredManuscripts.map((manuscript) => (
          <motion.div
            key={manuscript.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`card-monastery group ${
              manuscript.digitalQuality === 'pending' ? 'opacity-75' : 'cursor-pointer hover:scale-105'
            }`}
            onClick={() => handleManuscriptClick(manuscript)}
          >
            <div className="relative">
              <img
                src={manuscript.image}
                alt={manuscript.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="absolute top-3 left-3">
                <span className="text-2xl">{getTypeIcon(manuscript.type)}</span>
              </div>
              <div className="absolute top-3 right-3">
                {getQualityBadge(manuscript.digitalQuality)}
              </div>
              {manuscript.digitalQuality === 'pending' && (
                <div className="absolute inset-0 bg-black/50 rounded-t-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl mb-2">🔄</div>
                    <div className="text-sm font-medium">Digitization<br />in Progress</div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-bold text-primary mb-2 group-hover:text-gradient-sunset">
                {manuscript.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {manuscript.description}
              </p>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Language:</span>
                  <span className="font-medium">{manuscript.language}</span>
                </div>
                <div className="flex justify-between">
                  <span>Era:</span>
                  <span className="font-medium">{manuscript.era}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pages:</span>
                  <span className="font-medium">{manuscript.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monastery:</span>
                  <span className="font-medium">{manuscript.monastery}</span>
                </div>
              </div>

              {manuscript.digitalQuality !== 'pending' && (
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="flex items-center text-primary text-sm font-medium">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Manuscript
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredManuscripts.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">No manuscripts found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Manuscript Viewer Modal */}
      <AnimatePresence>
        {selectedManuscript && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex"
          >
            {/* Viewer */}
            <div className="flex-1 relative">
              <div className="absolute inset-4">
                <div className="w-full h-full bg-card border border-border rounded-xl overflow-hidden">
                  <motion.img
                    src={selectedManuscript.image}
                    alt={selectedManuscript.title}
                    className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
                    style={{
                      transform: `scale(${viewerZoom}) rotate(${viewerRotation}deg)`,
                      transition: 'transform 0.3s ease'
                    }}
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                  />
                </div>
              </div>

              {/* Viewer Controls */}
              <div className="absolute top-8 left-8 bg-card/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
                <h3 className="font-semibold text-sm text-primary">Viewer Controls</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={zoomIn}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={zoomOut}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={rotate}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetView}>
                    Reset
                  </Button>
                </div>
              </div>

              {/* Close Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={closeViewer}
                className="absolute top-8 right-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Side Panel */}
            <div className="w-80 bg-card border-l border-border p-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-primary mb-2">
                    {selectedManuscript.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedManuscript.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="font-medium">{selectedManuscript.language}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Era:</span>
                    <span className="font-medium">{selectedManuscript.era}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium capitalize">{selectedManuscript.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pages:</span>
                    <span className="font-medium">{selectedManuscript.pages}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monastery:</span>
                    <span className="font-medium">{selectedManuscript.monastery}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedManuscript.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 text-xs bg-muted rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <Button className="w-full btn-sacred">
                  <Download className="w-4 h-4 mr-2" />
                  Request Full Download
                </Button>

                <div className="text-xs text-muted-foreground border-t border-border pt-4">
                  <p className="mb-2">
                    📖 This manuscript is part of our digital preservation initiative to safeguard Sikkim's Buddhist heritage.
                  </p>
                  <p>
                    🔍 Use zoom and rotation controls to examine details. Drag to pan around the image.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DigitalArchives;