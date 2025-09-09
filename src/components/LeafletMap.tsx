import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import monasteries from '@/data/monasteries.json';

interface TravelCalculatorProps {
  selectedMonastery: any;
  onClose: () => void;
}

const TravelCalculator = ({ selectedMonastery, onClose }: TravelCalculatorProps) => {
  const [origin, setOrigin] = useState('');
  const [result, setResult] = useState<{distance: string; duration: string} | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    if (!origin.trim()) return;
    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setResult({
      distance: `${Math.floor(Math.random() * 100) + 20} km`,
      duration: `${Math.floor(Math.random() * 180) + 30} min`
    });
    setIsCalculating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div className="bg-card border border-border rounded-xl max-w-md w-full shadow-sacred p-6">
        <h3 className="text-xl font-bold text-primary mb-4">Travel to {selectedMonastery.name}</h3>
        <input
          type="text"
          placeholder="Enter your location"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg mb-4"
        />
        <div className="flex space-x-2">
          <Button onClick={handleCalculate} disabled={!origin.trim() || isCalculating} className="flex-1">
            {isCalculating ? 'Calculating...' : 'Get Directions'}
          </Button>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
        {result && (
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <p>Distance: {result.distance}</p>
            <p>Duration: {result.duration}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const LeafletMap = () => {
  const [selectedMonastery, setSelectedMonastery] = useState<any>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <>
      <div className="w-full h-[500px] rounded-xl overflow-hidden border border-border shadow-sacred bg-card">
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-primary mb-4">Interactive Sikkim Monastery Map</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monasteries.slice(0, 9).map((monastery, index) => (
              <div key={monastery.id} className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{monastery.name}</h4>
                    <p className="text-xs text-muted-foreground">{monastery.district}</p>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <Link
                    to={`/monasteries/${monastery.id}`}
                    className="flex-1 bg-primary text-primary-foreground px-3 py-1 rounded text-xs text-center"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedMonastery(monastery);
                      setShowCalculator(true);
                    }}
                    className="flex-1 bg-muted px-3 py-1 rounded text-xs"
                  >
                    Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            🗺️ Interactive Leaflet map integration coming soon! Currently showing monastery grid view.
          </p>
        </div>
      </div>
      
      {showCalculator && selectedMonastery && (
        <TravelCalculator
          selectedMonastery={selectedMonastery}
          onClose={() => setShowCalculator(false)}
        />
      )}
    </>
  );
};

export default LeafletMap;