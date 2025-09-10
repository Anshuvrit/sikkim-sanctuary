import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, Star, Ticket, Camera, Eye, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import festivalsData from "@/data/festivals.json";
import LoadingSpinner from "@/components/LoadingSpinner";
import useLoadingState from "@/hooks/useLoadingState";
import FestivalCalendar from "@/components/FestivalCalendar";

interface Festival {
  id: string;
  name: string;
  tibetanName: string;
  date: string;
  duration: string;
  monasteries: string[];
  type: string;
  significance: string;
  description: string;
  rituals: string[];
  images: string[];
  ticketPrice: string;
  bestViewingSpots: string[];
}

const Festivals = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { loading: actionLoading, startLoading } = useLoadingState(1500);

  const categories = [
    { id: "all", label: "All Festivals" },
    { id: "New Year Celebration", label: "New Year" },
    { id: "Sacred Mask Dance Celebration", label: "Mask Dance" },
    { id: "Sacred Water Prediction Ceremony", label: "Prophecy" },
    { id: "Buddha's Birth, Enlightenment & Parinirvana", label: "Buddha Events" },
    { id: "Saint's Commemoration", label: "Saints" },
    { id: "Divine Feminine Celebration", label: "Dakini" }
  ];

  useEffect(() => {
    // Simulate realistic loading
    setTimeout(() => {
      setFestivals(festivalsData as Festival[]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredFestivals = festivals
    .filter(f => selectedCategory === "all" || f.type === selectedCategory)
    .filter(f => 
      searchQuery === "" || 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.monasteries.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const upcomingFestivals = festivals.filter(f => {
    const festivalDate = new Date(f.date.split(" - ")[0]);
    return festivalDate > new Date();
  });

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query) {
      await startLoading();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading sacred festivals..." size="lg" />
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
            Sacred Buddhist Festivals
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the spiritual celebrations that mark the Buddhist calendar in Sikkim's monasteries, 
            each carrying deep cultural meaning and centuries of tradition.
          </p>
          
          <div className="inline-flex items-center bg-muted rounded-full px-6 py-3">
            <span className="text-2xl mr-3 animate-prayer-wave">🎭</span>
            <span className="font-semibold text-primary">{festivals.length} Festivals</span>
            <span className="mx-2">•</span>
            <span className="text-muted-foreground">{upcomingFestivals.length} Upcoming</span>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search festivals, monasteries, rituals..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
            {actionLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <motion.div
                  className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Featured Upcoming Festival */}
        {upcomingFestivals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-gradient-sunset text-white rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-4xl animate-lotus-bloom">🎊</div>
              <div className="relative z-10">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  Next Festival
                </Badge>
                <h2 className="text-3xl font-bold mb-4">{upcomingFestivals[0].name}</h2>
                <p className="text-xl opacity-90 mb-6">{upcomingFestivals[0].date}</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    {upcomingFestivals[0].duration}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {upcomingFestivals[0].monasteries.length} Monasteries
                  </div>
                </div>
                <Link 
                  to={`/festivals/${upcomingFestivals[0].id}`}
                  className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-gentle"
                >
                  Learn More
                  <Calendar className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-gentle ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Replace existing festivals grid with enhanced calendar */}
        <FestivalCalendar />

        {/* Cultural Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gradient-to-r from-lotus-pink/20 to-accent/20 rounded-xl p-8 text-center"
        >
          <Star className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-4 text-sacred">
            Experience Sacred Traditions
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Each festival is a living expression of Buddhist philosophy, combining ancient rituals 
            with community celebration. These events offer visitors a unique opportunity to witness 
            authentic spiritual practices that have been preserved for centuries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-sacred">
              <Users className="w-4 h-4 mr-2" />
              Join Festival Community
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Subscribe to Updates
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom spacer for mobile navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Festivals;