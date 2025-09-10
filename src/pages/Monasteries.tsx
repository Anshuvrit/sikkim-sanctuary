import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, MapPin, Calendar, Users, Filter, X, Eye, Play, BookOpen, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import monasteriesData from "@/data/monasteries.json";
import MonasteryGallery from "@/components/MonasteryGallery";
import LoadingSpinner from "@/components/LoadingSpinner";

// Import monastery images
import rumtekMain from "@/assets/monasteries/rumtek-main.jpg";
import peymangsteMain from "@/assets/monasteries/pemayangste-main.jpg";
import tashidingMain from "@/assets/monasteries/tashiding-main.jpg";
import encheyMain from "@/assets/monasteries/enchey-main.jpg";
import dubdiMain from "@/assets/monasteries/dubdi-main.jpg";

interface Monastery {
  id: string;
  name: string;
  tibetanName: string;
  district: string;
  sect: string;
  foundingYear: number;
  description: string;
  culturalSignificance?: string;
  altitude: string;
  currentMonks: number;
  images: string[];
  specialFeatures: string[];
  virtualTourAvailable?: boolean;
  audioGuideLanguages?: string[];
  visitingHours?: string;
}

const Monasteries = () => {
  const [monasteries, setMonasteries] = useState<Monastery[]>([]);
  const [filteredMonasteries, setFilteredMonasteries] = useState<Monastery[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSect, setSelectedSect] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);
  const [virtualTourModal, setVirtualTourModal] = useState(false);
  const [audioGuideModal, setAudioGuideModal] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);

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

        {/* Enhanced Monasteries Grid with Gallery */}
        <div className="grid-monastery">
          {filteredMonasteries.map((monastery, index) => (
            <motion.div
              key={monastery.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MonasteryGallery
                monastery={monastery}
                onVirtualTour={() => {
                  setSelectedMonastery(monastery);
                  setVirtualTourModal(true);
                }}
                onAudioGuide={() => {
                  setSelectedMonastery(monastery);
                  setAudioGuideModal(true);
                }}
                onBookVisit={() => {
                  setSelectedMonastery(monastery);
                  setBookingModal(true);
                }}
              />
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

        {/* Virtual Tour Modal */}
        {virtualTourModal && selectedMonastery && (
          <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-sacred"
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-bold text-sacred">
                  360° Virtual Tour - {selectedMonastery.name}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setVirtualTourModal(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="p-6 space-y-4">
                {selectedMonastery.virtualTourAvailable ? (
                  <div className="aspect-video bg-gradient-mountain rounded-lg flex items-center justify-center relative overflow-hidden">
                    <img
                      src={rumtekMain}
                      alt="Virtual Tour Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Eye className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                        <h4 className="text-xl font-bold mb-2">360° Virtual Experience</h4>
                        <p className="opacity-90">Immersive monastery exploration</p>
                        <Button className="mt-4 bg-white/20 hover:bg-white/30">
                          <Play className="w-4 h-4 mr-2" />
                          Start Tour
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h4 className="text-xl font-bold mb-2">Coming Soon</h4>
                      <p className="text-muted-foreground">Virtual tour in development</p>
                    </div>
                  </div>
                )}
                
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h5 className="font-semibold">Interactive Hotspots</h5>
                    <p className="text-sm text-muted-foreground">Click to learn more</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h5 className="font-semibold">Multi-language Support</h5>
                    <p className="text-sm text-muted-foreground">Available in 4 languages</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h5 className="font-semibold">HD Quality</h5>
                    <p className="text-sm text-muted-foreground">Crisp 4K resolution</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Audio Guide Modal */}
        {audioGuideModal && selectedMonastery && (
          <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-xl max-w-2xl w-full shadow-sacred p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-sacred">
                  Audio Guide - {selectedMonastery.name}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAudioGuideModal(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-sunset rounded-lg p-6 text-white text-center">
                  <Play className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <h4 className="text-lg font-bold mb-2">Immersive Audio Experience</h4>
                  <p className="opacity-90">Professional narration with ambient monastery sounds</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Available Languages</h5>
                    <div className="space-y-2">
                      {selectedMonastery.audioGuideLanguages.map((lang) => (
                        <Button key={lang} variant="outline" size="sm" className="w-full justify-start">
                          <Play className="w-3 h-3 mr-2" />
                          {lang}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2">Features</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Historical narratives</li>
                      <li>• Cultural significance</li>
                      <li>• Ritual explanations</li>
                      <li>• Architectural details</li>
                    </ul>
                  </div>
                </div>
                
                <Button className="w-full btn-sacred">
                  <Play className="w-4 h-4 mr-2" />
                  Start Audio Guide
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Booking Modal */}
        {bookingModal && selectedMonastery && (
          <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-xl max-w-md w-full shadow-sacred p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-sacred">Plan Your Visit</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setBookingModal(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold text-lg">{selectedMonastery.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedMonastery.district}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    {selectedMonastery.visitingHours}
                  </div>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Visit Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Visitors</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg">
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} visitor{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Experience Type</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg">
                      <option>General Visit</option>
                      <option>Photography Tour</option>
                      <option>Meditation Session</option>
                      <option>Cultural Learning</option>
                    </select>
                  </div>
                  
                  <Button type="submit" className="w-full btn-sacred">
                    <Calendar className="w-4 h-4 mr-2" />
                    Confirm Visit Plan
                  </Button>
                </form>
                
                <div className="text-xs text-muted-foreground text-center">
                  Demo simulation - No real booking required
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      
      {/* Bottom spacer for mobile navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Monasteries;