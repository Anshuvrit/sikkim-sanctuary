import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Languages, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Hotspot {
  id: string;
  x: string;
  y: string;
  title: string;
  description: string;
  type: 'info' | 'navigation' | 'artifact';
}

interface TourView {
  id: string;
  title: string;
  description: string;
  image: string;
  hotspots: Hotspot[];
}

const VirtualTours = () => {
  const { monasteryId } = useParams();
  const [currentView, setCurrentView] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'nepali'>('english');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Virtual tour data for different monasteries
  const tourData: Record<string, TourView[]> = {
    rumtek: [
      {
        id: 'entrance',
        title: 'Main Entrance Gate',
        description: 'The grand entrance to Rumtek Monastery, adorned with traditional Tibetan architectural elements and prayer flags.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
        hotspots: [
          {
            id: 'prayer-wheels',
            x: '25%',
            y: '65%',
            title: 'Prayer Wheels',
            description: 'Sacred prayer wheels containing mantras that are spun clockwise to accumulate merit and purify negative karma.',
            type: 'artifact'
          },
          {
            id: 'entrance-door',
            x: '50%',
            y: '60%',
            title: 'Main Door',
            description: 'The ornate main entrance door with traditional Tibetan carvings and symbolic motifs.',
            type: 'navigation'
          }
        ]
      },
      {
        id: 'main-hall',
        title: 'Main Prayer Hall',
        description: 'The central prayer hall where monks gather for daily prayers and ceremonies, featuring magnificent Buddhist statues.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
        hotspots: [
          {
            id: 'buddha-statue',
            x: '50%',
            y: '40%',
            title: 'Golden Buddha',
            description: 'The main Buddha statue, beautifully crafted and adorned with gold, serving as the focal point for meditation.',
            type: 'artifact'
          },
          {
            id: 'thangkas',
            x: '75%',
            y: '30%',
            title: 'Sacred Thangkas',
            description: 'Traditional Tibetan paintings depicting Buddhist deities, mandalas, and spiritual teachings.',
            type: 'info'
          }
        ]
      },
      {
        id: 'courtyard',
        title: 'Central Courtyard',
        description: 'The open courtyard where festivals and ceremonies take place, surrounded by monastic quarters.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        hotspots: [
          {
            id: 'stupa',
            x: '60%',
            y: '55%',
            title: 'Sacred Stupa',
            description: 'A traditional Buddhist stupa containing sacred relics and serving as a focus for meditation and prayer.',
            type: 'artifact'
          }
        ]
      }
    ],
    pemayangtse: [
      {
        id: 'exterior',
        title: 'Monastery Exterior',
        description: 'The beautiful exterior of Pemayangtse Monastery with stunning mountain views.',
        image: 'https://images.unsplash.com/photo-1582719371862-d818c4b8e0b3?w=1200&h=800&fit=crop',
        hotspots: [
          {
            id: 'architecture',
            x: '45%',
            y: '50%',
            title: 'Traditional Architecture',
            description: 'Notice the distinctive Tibetan architectural style with its sloping roofs and wooden structures.',
            type: 'info'
          }
        ]
      }
    ],
    // Default tour for unspecified monasteries
    default: [
      {
        id: 'coming-soon',
        title: 'Virtual Tour Coming Soon',
        description: 'We are working on creating an immersive 360° virtual tour for this monastery.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        hotspots: []
      }
    ]
  };

  const currentTour = tourData[monasteryId || 'default'] || tourData.default;
  const currentTourView = currentTour[currentView];

  const nextView = () => {
    setCurrentView((prev) => (prev + 1) % currentTour.length);
    setSelectedHotspot(null);
  };

  const prevView = () => {
    setCurrentView((prev) => (prev - 1 + currentTour.length) % currentTour.length);
    setSelectedHotspot(null);
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot === selectedHotspot ? null : hotspot);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const rotateView = () => {
    setRotation(prev => prev + 90);
  };

  const resetView = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  // Multi-language content
  const translations = {
    english: {
      title: 'Virtual Tour',
      controls: 'Tour Controls',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      rotate: 'Rotate',
      reset: 'Reset View',
      bookVisit: 'Book Real Visit',
      nextStop: 'Next Stop',
      prevStop: 'Previous Stop'
    },
    hindi: {
      title: 'वर्चुअल टूर',
      controls: 'टूर नियंत्रण',
      zoomIn: 'ज़ूम इन',
      zoomOut: 'ज़ूम आउट',
      rotate: 'घुमाएं',
      reset: 'रीसेट व्यू',
      bookVisit: 'वास्तविक यात्रा बुक करें',
      nextStop: 'अगला स्टॉप',
      prevStop: 'पिछला स्टॉप'
    },
    nepali: {
      title: 'भर्चुअल टुर',
      controls: 'टुर नियन्त्रण',
      zoomIn: 'जुम इन',
      zoomOut: 'जुम आउट',
      rotate: 'घुमाउने',
      reset: 'रिसेट भ्यु',
      bookVisit: 'वास्तविक भ्रमण बुक गर्नुहोस्',
      nextStop: 'अर्को रोक',
      prevStop: 'अघिल्लो रोक'
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="container-temple">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/monasteries" className="btn-prayer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Monasteries
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gradient-sacred">{t.title}</h1>
                <p className="text-muted-foreground">
                  {monasteryId ? `${monasteryId.charAt(0).toUpperCase() + monasteryId.slice(1)} Monastery` : 'Sacred Monastery'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'english' | 'hindi' | 'nepali')}
                className="px-3 py-2 border border-border rounded-lg bg-background text-sm"
              >
                <option value="english">🇺🇸 English</option>
                <option value="hindi">🇮🇳 हिंदी</option>
                <option value="nepali">🇳🇵 नेपाली</option>
              </select>

              <Button
                onClick={() => setShowBookingModal(true)}
                className="btn-sacred"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {t.bookVisit}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Tour Viewer */}
      <div className="flex-1 flex">
        {/* Main Viewer */}
        <div className="flex-1 relative overflow-hidden">
          <div className="relative w-full h-[calc(100vh-120px)]">
            {/* 360° Image Viewer */}
            <motion.div
              className="w-full h-full bg-cover bg-center cursor-grab active:cursor-grabbing"
              style={{
                backgroundImage: `url(${currentTourView.image})`,
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Hotspots */}
              {currentTourView.hotspots.map((hotspot) => (
                <motion.button
                  key={hotspot.id}
                  className="absolute w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center text-white font-bold shadow-sacred hover:bg-primary hover:scale-110 transition-all"
                  style={{
                    left: hotspot.x,
                    top: hotspot.y,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleHotspotClick(hotspot)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {hotspot.type === 'info' ? 'ℹ️' : hotspot.type === 'navigation' ? '→' : '⭐'}
                </motion.button>
              ))}

              {/* Hotspot Info Popup */}
              {selectedHotspot && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bg-card border border-border rounded-lg p-4 shadow-sacred max-w-sm z-10"
                  style={{
                    left: selectedHotspot.x,
                    top: `calc(${selectedHotspot.y} + 40px)`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <h4 className="font-bold text-primary mb-2">{selectedHotspot.title}</h4>
                  <p className="text-sm text-muted-foreground">{selectedHotspot.description}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedHotspot(null)}
                    className="mt-2 w-full"
                  >
                    Close
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Tour Controls Overlay */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
              <h3 className="font-semibold text-sm text-primary">{t.controls}</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={zoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={zoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={rotateView}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={resetView}>
                  Reset
                </Button>
              </div>
            </div>

            {/* Navigation Controls */}
            {currentTour.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-card/90 backdrop-blur-sm rounded-full px-6 py-3">
                <Button variant="outline" size="sm" onClick={prevView}>
                  ← {t.prevStop}
                </Button>
                <div className="flex space-x-2">
                  {currentTour.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentView(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentView
                          ? 'bg-primary scale-125'
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
                      }`}
                    />
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={nextView}>
                  {t.nextStop} →
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 bg-card border-l border-border p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Current View Info */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-2">
                {currentTourView.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {currentTourView.description}
              </p>
            </div>

            {/* Tour Progress */}
            <div>
              <h3 className="font-semibold mb-3">Tour Progress</h3>
              <div className="space-y-2">
                {currentTour.map((view, index) => (
                  <button
                    key={view.id}
                    onClick={() => setCurrentView(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      index === currentView
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    <div className="font-medium text-sm">{view.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Stop {index + 1} of {currentTour.length}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hotspots List */}
            {currentTourView.hotspots.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Points of Interest</h3>
                <div className="space-y-2">
                  {currentTourView.hotspots.map((hotspot) => (
                    <button
                      key={hotspot.id}
                      onClick={() => handleHotspotClick(hotspot)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedHotspot?.id === hotspot.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {hotspot.type === 'info' ? 'ℹ️' : hotspot.type === 'navigation' ? '→' : '⭐'}
                        </span>
                        <div>
                          <div className="font-medium text-sm">{hotspot.title}</div>
                          <div className="text-xs text-muted-foreground">{hotspot.type}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Coming Soon Features */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-3 text-muted-foreground">Coming Soon</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span>🎵</span>
                  <span>Multi-language audio narration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📱</span>
                  <span>VR headset compatibility</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🤝</span>
                  <span>Live guided tours with monks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📊</span>
                  <span>Interactive 3D monastery models</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal Simulation */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4 shadow-sacred"
          >
            <h3 className="text-xl font-bold text-primary mb-4">Book Real Visit</h3>
            <p className="text-muted-foreground mb-6">
              Experience this monastery in person! Book a guided visit with transportation and cultural insights.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Guided Tour</span>
                <span className="font-semibold">₹500</span>
              </div>
              <div className="flex justify-between">
                <span>Transportation</span>
                <span className="font-semibold">₹800</span>
              </div>
              <div className="flex justify-between">
                <span>Cultural Experience</span>
                <span className="font-semibold">₹300</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>₹1,600</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowBookingModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowBookingModal(false);
                  alert('Booking confirmed! You will receive details via email.');
                }}
                className="flex-1 btn-sacred"
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VirtualTours;