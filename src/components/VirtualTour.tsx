import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, RotateCcw, ZoomIn, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TourStop {
  id: string;
  title: string;
  description: string;
  image: string;
  hotspots: Array<{
    x: string;
    y: string;
    label: string;
    info: string;
  }>;
  audioGuide?: {
    duration: string;
    transcript: string;
  };
}

interface VirtualTourProps {
  monasteryId: string;
  monasteryName: string;
}

const VirtualTour = ({ monasteryId, monasteryName }: VirtualTourProps) => {
  const [currentStop, setCurrentStop] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  // Mock tour data - in a real app this would come from an API
  const tourStops: TourStop[] = [
    {
      id: 'entrance',
      title: 'Main Entrance Gate',
      description: 'Welcome to the sacred grounds. The entrance gate features traditional Tibetan architecture with prayer wheels and colorful prayer flags.',
      image: '/assets/tours/entrance-placeholder.jpg',
      hotspots: [
        { x: '25%', y: '60%', label: 'Prayer Wheels', info: 'Spin clockwise while reciting mantras for merit' },
        { x: '75%', y: '30%', label: 'Prayer Flags', info: 'Five colors representing the five elements' },
        { x: '50%', y: '80%', label: 'Guardian Lions', info: 'Protective deities guarding the entrance' }
      ],
      audioGuide: {
        duration: '2:30',
        transcript: 'Welcome to this sacred monastery. As you enter through this traditional gate, notice the prayer wheels on your right...'
      }
    },
    {
      id: 'courtyard',
      title: 'Main Courtyard',
      description: 'The central courtyard where monks gather for ceremonies and festivals. This space has witnessed centuries of spiritual practice.',
      image: '/assets/tours/courtyard-placeholder.jpg',
      hotspots: [
        { x: '40%', y: '50%', label: 'Central Stupa', info: 'Contains sacred relics and represents the Buddha mind' },
        { x: '80%', y: '40%', label: 'Assembly Hall', info: 'Where monks gather for prayers and teachings' },
        { x: '20%', y: '70%', label: 'Incense Burner', info: 'Offerings create merit and purify the space' }
      ],
      audioGuide: {
        duration: '3:15',
        transcript: 'This courtyard is the heart of monastery life. The central stupa contains precious relics...'
      }
    },
    {
      id: 'prayer-hall',
      title: 'Main Prayer Hall',
      description: 'The most sacred space where daily prayers are conducted. Golden Buddha statues and ancient murals create an atmosphere of deep reverence.',
      image: '/assets/tours/prayer-hall-placeholder.jpg',
      hotspots: [
        { x: '50%', y: '30%', label: 'Buddha Statue', info: 'Main Buddha figure representing enlightenment' },
        { x: '30%', y: '40%', label: 'Thangka Paintings', info: 'Sacred Buddhist artwork for meditation' },
        { x: '70%', y: '60%', label: 'Offering Tables', info: 'Where devotees place their offerings' }
      ],
      audioGuide: {
        duration: '4:00',
        transcript: 'Step into the most sacred hall where the golden Buddha radiates compassion...'
      }
    }
  ];

  const nextStop = () => {
    if (currentStop < tourStops.length - 1) {
      setCurrentStop(currentStop + 1);
      setSelectedHotspot(null);
    }
  };

  const prevStop = () => {
    if (currentStop > 0) {
      setCurrentStop(currentStop - 1);
      setSelectedHotspot(null);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual audio playback
  };

  const resetView = () => {
    setZoom(1);
    setSelectedHotspot(null);
  };

  const currentTourStop = tourStops[currentStop];

  return (
    <div className="bg-card rounded-xl shadow-soft overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-sunset text-white p-4">
        <h3 className="text-xl font-bold mb-2">Virtual Tour: {monasteryName}</h3>
        <p className="text-white/90 text-sm">
          Immersive 360° experience • {tourStops.length} locations
        </p>
      </div>

      {/* Tour Viewer */}
      <div className="relative">
        {/* Tour Image/360 View */}
        <div className="relative h-80 bg-gradient-mountain overflow-hidden">
          <motion.div
            className="w-full h-full bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900/20 dark:to-orange-900/20 flex items-center justify-center relative"
            style={{ transform: `scale(${zoom})` }}
            transition={{ duration: 0.3 }}
          >
            {/* Placeholder for 360° image */}
            <div className="text-6xl opacity-50">🏛️</div>
            
            {/* Tour Information Overlay */}
            <div className="absolute top-4 left-4 bg-background/90 rounded-lg p-3 max-w-xs">
              <h4 className="font-bold text-sm text-foreground mb-1">{currentTourStop.title}</h4>
              <p className="text-xs text-muted-foreground">{currentTourStop.description}</p>
            </div>

            {/* Hotspots */}
            {currentTourStop.hotspots.map((hotspot, index) => (
              <motion.button
                key={index}
                className={`absolute w-6 h-6 rounded-full ${
                  selectedHotspot === hotspot.label 
                    ? 'bg-primary scale-125' 
                    : 'bg-white/80 hover:bg-primary'
                } border-2 border-white shadow-lg transition-all duration-200`}
                style={{ left: hotspot.x, top: hotspot.y }}
                onClick={() => setSelectedHotspot(
                  selectedHotspot === hotspot.label ? null : hotspot.label
                )}
                initial={{ scale: 0 }}
                animate={{ scale: selectedHotspot === hotspot.label ? 1.25 : 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-full h-full rounded-full bg-primary/20 animate-ping absolute"></div>
                <Info className="w-3 h-3 text-primary m-auto" />
                
                {/* Hotspot Info */}
                {selectedHotspot === hotspot.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-background border border-border rounded-lg p-3 shadow-lg min-w-48 z-10"
                  >
                    <h5 className="font-semibold text-sm text-foreground mb-1">{hotspot.label}</h5>
                    <p className="text-xs text-muted-foreground">{hotspot.info}</p>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-background/90"
              onClick={() => setZoom(Math.min(2, zoom + 0.25))}
              disabled={zoom >= 2}
            >
              <ZoomIn className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="outline" 
              className="bg-background/90"
              onClick={resetView}
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2 mb-2">
              {tourStops.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index === currentStop ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="p-4 bg-muted/50">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              Stop {currentStop + 1} of {tourStops.length}
            </div>
            <Badge variant="outline">
              360° Interactive View
            </Badge>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="sm"
              variant="outline"
              onClick={prevStop}
              disabled={currentStop === 0}
            >
              <SkipBack className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              onClick={togglePlay}
              className="btn-sacred"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={nextStop}
              disabled={currentStop === tourStops.length - 1}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Audio Guide */}
        {currentTourStop.audioGuide && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border-t border-border"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Audio Guide</span>
                <Badge variant="secondary" className="text-xs">
                  {currentTourStop.audioGuide.duration}
                </Badge>
              </div>
              <Button size="sm" variant="ghost">
                {isPlaying ? 'Pause' : 'Play'} Audio
              </Button>
            </div>
            
            <div className="bg-accent/10 rounded-lg p-3">
              <p className="text-sm text-muted-foreground italic">
                "{currentTourStop.audioGuide.transcript}"
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Coming Soon Features */}
      <div className="p-4 border-t border-border bg-gradient-to-r from-muted/30 to-accent/10">
        <h4 className="font-semibold text-sm mb-2 text-foreground">Coming Soon</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>VR Headset Support</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <span>Live Ceremonies</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span>Monk Interactions</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Guided Meditation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;