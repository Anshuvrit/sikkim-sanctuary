import { motion } from "framer-motion";
import { MapPin, Navigation, Compass } from "lucide-react";

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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the locations of Sikkim's sacred monasteries on our interactive map.
          </p>
        </motion.div>

        <div className="card-monastery text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-2xl font-bold mb-4 text-sacred">Interactive Map Loading</h3>
          <p className="text-muted-foreground mb-6">
            Our detailed monastery map is being prepared to help you navigate Sikkim's spiritual landscape. Soon you'll be able to explore locations, get directions, and plan your monastery visits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-sacred">
              <Compass className="w-4 h-4 mr-2" />
              Explore Map
            </button>
            <button className="btn-temple">
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </button>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Map;