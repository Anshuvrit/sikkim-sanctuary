import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, Star, Ticket, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import festivalsData from "@/data/festivals.json";

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
    // Simulate loading
    setTimeout(() => {
      setFestivals(festivalsData as Festival[]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredFestivals = selectedCategory === "all" 
    ? festivals 
    : festivals.filter(f => f.type === selectedCategory);

  const upcomingFestivals = festivals.filter(f => {
    const festivalDate = new Date(f.date.split(" - ")[0]);
    return festivalDate > new Date();
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading sacred festivals...</p>
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

        {/* Festivals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFestivals.map((festival, index) => (
            <motion.div
              key={festival.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card-festival group hover:scale-[1.02] h-full flex flex-col">
                {/* Header */}
                <div className="relative mb-6">
                  <div className="h-40 bg-gradient-prayer-flags rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
                    <span className="text-4xl text-white/90 relative z-10">🎭</span>
                  </div>
                  
                  <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
                    {festival.type}
                  </Badge>
                  
                  <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {festival.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-sacred group-hover:text-gradient-sunset">
                    {festival.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3 font-medium">
                    {festival.tibetanName}
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                    {festival.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {festival.date}
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      {festival.monasteries.length} Monasteries
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Ticket className="w-4 h-4 mr-2 text-primary" />
                      {festival.ticketPrice}
                    </div>
                  </div>

                  {/* Rituals Preview */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-sm text-primary">Key Rituals:</h4>
                    <div className="flex flex-wrap gap-1">
                      {festival.rituals.slice(0, 2).map((ritual, idx) => (
                        <span
                          key={idx}
                          className="bg-accent/20 text-accent-foreground px-2 py-1 rounded text-xs"
                        >
                          {ritual}
                        </span>
                      ))}
                      {festival.rituals.length > 2 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{festival.rituals.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <Link
                    to={`/festivals/${festival.id}`}
                    className="flex items-center justify-center bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-primary/90 transition-gentle group-hover:shadow-temple"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    View Festival Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFestivals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-bold mb-4 text-muted-foreground">No festivals found</h3>
            <p className="text-muted-foreground mb-6">
              Try selecting a different category to see more festivals
            </p>
            <Button onClick={() => setSelectedCategory("all")} className="btn-temple">
              View All Festivals
            </Button>
          </motion.div>
        )}

        {/* Festival Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 card-monastery"
        >
          <h3 className="text-2xl font-bold mb-6 text-sacred text-center">
            Annual Festival Calendar
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {festivals.map((festival) => (
              <div
                key={festival.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-accent/20 transition-gentle"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-foreground">{festival.name}</h4>
                    <p className="text-sm text-muted-foreground">{festival.date}</p>
                  </div>
                </div>
                <Link
                  to={`/festivals/${festival.id}`}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Details
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

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