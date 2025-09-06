import { motion } from "framer-motion";
import InteractiveMap from "@/components/InteractiveMap";

const Map = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container-temple">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-sacred">
            Interactive Monastery Map
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the locations of Sikkim's sacred monasteries with our interactive map. 
            Get directions, calculate distances, and plan your spiritual journey.
          </p>
          
          <div className="inline-flex items-center bg-muted rounded-full px-6 py-3">
            <span className="text-2xl mr-3 animate-lotus-bloom">🗺️</span>
            <span className="font-semibold text-primary">Interactive Navigation</span>
            <span className="mx-2">•</span>
            <span className="text-muted-foreground">No API Keys Required</span>
            <span className="mx-2">•</span>
            <span className="text-muted-foreground">Distance Calculator</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <InteractiveMap />
        </motion.div>
      </div>
      
      {/* Bottom spacer for mobile navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Map;