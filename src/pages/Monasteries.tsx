import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, MapPin, Calendar, Users, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import monasteriesData from "@/data/monasteries.json";

interface Monastery {
  id: string;
  name: string;
  tibetanName: string;
  district: string;
  sect: string;
  foundingYear: number;
  description: string;
  altitude: string;
  currentMonks: number;
  images: string[];
  specialFeatures: string[];
}

const Monasteries = () => {
  const [monasteries, setMonasteries] = useState<Monastery[]>([]);
  const [filteredMonasteries, setFilteredMonasteries] = useState<Monastery[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSect, setSelectedSect] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [loading, setLoading] = useState(true);

  const sects = ["all", "Kagyu", "Nyingma", "Zurmang Kagyu"];
  const districts = ["all", "East Sikkim", "West Sikkim", "North Sikkim", "South Sikkim"];

  useEffect(() => {
    // Simulate loading for realistic experience
    setTimeout(() => {
      setMonasteries(monasteriesData as Monastery[]);
      setFilteredMonasteries(monasteriesData as Monastery[]);
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    let filtered = monasteries;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (monastery) =>
          monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          monastery.sect.toLowerCase().includes(searchQuery.toLowerCase()) ||
          monastery.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          monastery.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sect filter
    if (selectedSect !== "all") {
      filtered = filtered.filter((monastery) => monastery.sect === selectedSect);
    }

    // District filter
    if (selectedDistrict !== "all") {
      filtered = filtered.filter((monastery) => monastery.district === selectedDistrict);
    }

    setFilteredMonasteries(filtered);
  }, [searchQuery, selectedSect, selectedDistrict, monasteries]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSect("all");
    setSelectedDistrict("all");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading sacred monasteries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-temple">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-sacred">
            Sacred Monasteries of Sikkim
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the spiritual heart of Sikkim through its ancient monasteries, 
            each preserving centuries of Buddhist wisdom and cultural heritage.
          </p>
          
          <div className="inline-flex items-center bg-muted rounded-full px-6 py-3">
            <span className="text-2xl mr-3 animate-lotus-bloom">🏛️</span>
            <span className="font-semibold text-primary">{monasteries.length} Monasteries</span>
            <span className="mx-2">•</span>
            <span className="text-muted-foreground">4 Sects</span>
            <span className="mx-2">•</span>
            <span className="text-muted-foreground">4 Districts</span>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl shadow-soft p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search monasteries, sects, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedSect}
              onChange={(e) => setSelectedSect(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background"
            >
              {sects.map((sect) => (
                <option key={sect} value={sect}>
                  {sect === "all" ? "All Sects" : sect}
                </option>
              ))}
            </select>
            
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background"
            >
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district === "all" ? "All Districts" : district}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery || selectedSect !== "all" || selectedDistrict !== "all") && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {filteredMonasteries.length} monasteries found
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-primary hover:text-primary/80"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>

        {/* Monasteries Grid */}
        <div className="grid-monastery">
          {filteredMonasteries.map((monastery, index) => (
            <motion.div
              key={monastery.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/monasteries/${monastery.id}`}
                className="card-monastery group hover:scale-[1.02] block overflow-hidden"
              >
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-gradient-mountain">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {monastery.sect}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-background/90 text-foreground px-2 py-1 rounded text-xs">
                      {monastery.foundingYear}
                    </span>
                  </div>
                  
                  {/* Placeholder for monastery image */}
                  <div className="w-full h-full bg-gradient-sunset flex items-center justify-center">
                    <span className="text-4xl text-white/80">🏛️</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-sacred group-hover:text-gradient-sunset">
                  {monastery.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 font-medium">
                  {monastery.tibetanName}
                </p>

                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {monastery.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {monastery.district} • {monastery.altitude}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    {monastery.currentMonks} monks
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    Founded {monastery.foundingYear}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {monastery.specialFeatures?.slice(0, 2).map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-accent/20 text-accent-foreground px-2 py-1 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                  {monastery.specialFeatures?.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{monastery.specialFeatures.length - 2} more
                    </span>
                  )}
                </div>

                <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredMonasteries.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-4 text-muted-foreground">No monasteries found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or clearing the filters
            </p>
            <Button onClick={clearFilters} className="btn-temple">
              <Filter className="w-4 h-4 mr-2" />
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
      
      {/* Bottom spacer for mobile navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Monasteries;