import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Clock, Mountain, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import monasteriesData from '@/data/monasteries.json';
import { Link } from 'react-router-dom';

interface MapMonastery {
  id: string;
  name: string;
  district: string;
  sect: string;
  mapPosition: { x: number; y: number };
  altitude: string;
  currentMonks: number;
}

const InteractiveMap = () => {
  const [selectedMonastery, setSelectedMonastery] = useState<MapMonastery | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [fromLocation, setFromLocation] = useState('gangtok');

  const monasteries = monasteriesData as MapMonastery[];
  
  const filteredMonasteries = selectedDistrict === 'all' 
    ? monasteries 
    : monasteries.filter(m => m.district === selectedDistrict);

  const districts = ['all', 'East Sikkim', 'West Sikkim', 'North Sikkim', 'South Sikkim'];
  const locations = {
    gangtok: 'Gangtok',
    pelling: 'Pelling', 
    yuksom: 'Yuksom',
    mangan: 'Mangan',
    namchi: 'Namchi'
  };

  // Pre-calculated distances for demo (in km)
  const distances: Record<string, Record<string, number>> = {
    gangtok: {
      rumtek: 24,
      enchey: 3,
      lingdum: 17,
      phodong: 28,
      pemayangste: 116,
      tashiding: 119,
      dubdi: 125,
      ralang: 65,
      phensang: 78,
      'sanga-choeling': 118
    },
    pelling: {
      pemayangste: 2,
      'sanga-choeling': 4,
      tashiding: 16,
      dubdi: 5,
      rumtek: 116,
      enchey: 118,
      lingdum: 125,
      phodong: 140,
      ralang: 55,
      phensang: 90
    }
    // Add more locations as needed
  };

  const getDistance = (monasteryId: string) => {
    return distances[fromLocation]?.[monasteryId] || 0;
  };

  const getSectColor = (sect: string) => {
    switch (sect) {
      case 'Kagyu': return 'bg-primary';
      case 'Nyingma': return 'bg-secondary';
      case 'Zurmang Kagyu': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-card rounded-xl shadow-soft p-6">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Filter by District</label>
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            >
              {districts.map(district => (
                <option key={district} value={district}>
                  {district === 'all' ? 'All Districts' : district}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Calculate Distance From</label>
            <select 
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            >
              {Object.entries(locations).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button 
              onClick={() => setSelectedMonastery(null)}
              variant="outline" 
              className="w-full"
            >
              <Compass className="w-4 h-4 mr-2" />
              Reset View
            </Button>
          </div>
        </div>

        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Kagyu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span>Nyingma</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span>Zurmang Kagyu</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="relative bg-gradient-mountain rounded-xl overflow-hidden shadow-temple border border-border">
            {/* Static Sikkim Map Background */}
            <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
              {/* Mountain ranges representation */}
              <div className="absolute top-4 left-4 right-4 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full opacity-60"></div>
              <div className="absolute top-8 left-8 right-8 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full opacity-40"></div>
              
              {/* Rivers */}
              <div className="absolute top-20 left-0 w-full h-2 bg-blue-300 rounded-full rotate-12 opacity-60"></div>
              <div className="absolute bottom-20 left-0 w-full h-2 bg-blue-300 rounded-full -rotate-12 opacity-60"></div>
              
              {/* District Labels */}
              <div className="absolute top-16 right-8 text-xs font-medium text-muted-foreground bg-background/80 px-2 py-1 rounded">North Sikkim</div>
              <div className="absolute top-32 right-16 text-xs font-medium text-muted-foreground bg-background/80 px-2 py-1 rounded">East Sikkim</div>
              <div className="absolute bottom-32 left-8 text-xs font-medium text-muted-foreground bg-background/80 px-2 py-1 rounded">West Sikkim</div>
              <div className="absolute bottom-16 right-20 text-xs font-medium text-muted-foreground bg-background/80 px-2 py-1 rounded">South Sikkim</div>

              {/* Monastery Markers */}
              {filteredMonasteries.map((monastery) => (
                <motion.button
                  key={monastery.id}
                  onClick={() => setSelectedMonastery(monastery)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getSectColor(monastery.sect)} text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 border-2 border-white`}
                  style={{
                    top: `${monastery.mapPosition.y}%`,
                    left: `${monastery.mapPosition.x}%`
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: Math.random() * 0.5 }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                >
                  <span className="text-xs">🏛️</span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-background border border-border rounded px-2 py-1 text-xs font-medium text-foreground shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20">
                    {monastery.name}
                  </div>
                </motion.button>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-background/90 rounded-lg p-3 border border-border">
                <h4 className="font-medium text-sm mb-2">Legend</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏛️</span>
                    <span>Monastery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-blue-300"></div>
                    <span>Rivers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-2 bg-gray-400 rounded"></div>
                    <span>Mountains</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monastery Details Panel */}
        <div className="space-y-4">
          {selectedMonastery ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-monastery"
            >
              <div className="mb-4">
                <Badge className={`mb-2 ${getSectColor(selectedMonastery.sect)} text-white`}>
                  {selectedMonastery.sect}
                </Badge>
                <h3 className="text-xl font-bold text-sacred mb-2">
                  {selectedMonastery.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {selectedMonastery.district}
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mountain className="w-4 h-4 text-primary" />
                  <span>Altitude: {selectedMonastery.altitude}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{selectedMonastery.currentMonks} monks</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Navigation className="w-4 h-4 text-primary" />
                  <span>{getDistance(selectedMonastery.id)} km from {locations[fromLocation as keyof typeof locations]}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link 
                  to={`/monasteries/${selectedMonastery.id}`}
                  className="btn-temple flex-1 text-center text-sm"
                >
                  View Details
                </Link>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => alert('Directions feature coming soon!')}
                >
                  <Navigation className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="card-monastery text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="font-bold mb-2">Explore the Map</h3>
              <p className="text-sm text-muted-foreground">
                Click on any monastery marker to view details and get directions.
              </p>
            </div>
          )}

          {/* Distance Calculator */}
          <div className="card-monastery">
            <h4 className="font-bold mb-3 text-sacred flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              Travel Times
            </h4>
            
            <div className="text-sm text-muted-foreground mb-3">
              From {locations[fromLocation as keyof typeof locations]}:
            </div>
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {filteredMonasteries
                .sort((a, b) => getDistance(a.id) - getDistance(b.id))
                .slice(0, 5)
                .map((monastery) => (
                  <div key={monastery.id} className="flex justify-between items-center text-xs">
                    <span className="truncate">{monastery.name}</span>
                    <span className="text-primary font-medium ml-2">
                      {getDistance(monastery.id)}km
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-primary">{filteredMonasteries.length}</div>
              <div className="text-xs text-muted-foreground">Monasteries</div>
            </div>
            <div className="bg-secondary/10 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-secondary">4</div>
              <div className="text-xs text-muted-foreground">Districts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;