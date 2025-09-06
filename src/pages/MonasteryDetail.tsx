import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, MapPin, Calendar, Users, Clock, 
  Mountain, Star, Heart, BookOpen, Camera, Coins
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import monasteriesData from "@/data/monasteries.json";
import festivalsData from "@/data/festivals.json";

interface Monastery {
  id: string;
  name: string;
  tibetanName: string;
  district: string;
  sect: string;
  subSect: string;
  foundingYear: number;
  founder: string;
  coordinates: { lat: number; lng: number };
  altitude: string;
  description: string;
  culturalSignificance: string;
  architecture: string;
  dailyRoutine: string;
  visitingHours: string;
  nearestTown: string;
  images: string[];
  festivals: string[];
  manuscripts: string[];
  currentMonks: number;
  languages: string[];
  specialFeatures: string[];
  donationNeeds: string[];
}

const MonasteryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [monastery, setMonastery] = useState<Monastery | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Simulate API call with loading
    setTimeout(() => {
      const found = monasteriesData.find((m) => m.id === id) as Monastery;
      setMonastery(found);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading monastery details...</p>
        </div>
      </div>
    );
  }

  if (!monastery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏛️</div>
          <h2 className="text-2xl font-bold mb-4 text-muted-foreground">Monastery not found</h2>
          <Link to="/monasteries" className="btn-temple">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Monasteries
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "🏛️" },
    { id: "history", label: "History", icon: "📜" },
    { id: "visit", label: "Visit Info", icon: "🗺️" },
    { id: "community", label: "Community", icon: "👥" }
  ];

  const relatedFestivals = festivalsData.filter(f => 
    monastery.festivals.some(mf => f.id === mf)
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative h-96 bg-gradient-sunset overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90"></div>
        
        <div className="relative z-10 container-temple h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Link 
              to="/monasteries" 
              className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-gentle"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Monasteries
            </Link>

            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              {monastery.sect} • {monastery.subSect}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-sacred">
              {monastery.name}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 font-medium">
              {monastery.tibetanName}
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                {monastery.district}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mountain className="w-4 h-4 mr-2 text-primary" />
                {monastery.altitude}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                Founded {monastery.foundingYear}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="w-4 h-4 mr-2 text-primary" />
                {monastery.currentMonks} monks
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 right-10 text-4xl animate-meditation-breath">☸️</div>
        <div className="absolute bottom-10 left-10 text-3xl animate-lotus-bloom">🕉️</div>
      </div>

      {/* Content */}
      <div className="container-temple py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg font-medium transition-gentle ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className="card-monastery">
                  <h3 className="text-2xl font-bold mb-4 text-sacred">About This Sacred Place</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {monastery.description}
                  </p>
                  
                  <h4 className="text-lg font-semibold mb-3 text-primary">Cultural Significance</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {monastery.culturalSignificance}
                  </p>
                </div>

                {/* Architecture */}
                <div className="card-monastery">
                  <h3 className="text-2xl font-bold mb-4 text-sacred flex items-center">
                    <Camera className="w-6 h-6 mr-3 text-primary" />
                    Architecture & Design
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {monastery.architecture}
                  </p>
                </div>

                {/* Special Features */}
                <div className="card-monastery">
                  <h3 className="text-2xl font-bold mb-4 text-sacred flex items-center">
                    <Star className="w-6 h-6 mr-3 text-primary" />
                    Special Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {monastery.specialFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-foreground font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Quick Info */}
                <div className="card-monastery">
                  <h4 className="font-bold mb-4 text-sacred">Quick Information</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Founded</span>
                      <span className="font-medium">{monastery.foundingYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Founder</span>
                      <span className="font-medium">{monastery.founder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Monks</span>
                      <span className="font-medium">{monastery.currentMonks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nearest Town</span>
                      <span className="font-medium">{monastery.nearestTown}</span>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="card-monastery">
                  <h4 className="font-bold mb-3 text-sacred">Languages Spoken</h4>
                  <div className="flex flex-wrap gap-2">
                    {monastery.languages.map((lang, index) => (
                      <Badge key={index} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Donation Needs */}
                <div className="card-monastery">
                  <h4 className="font-bold mb-3 text-sacred flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-primary" />
                    Support Needed
                  </h4>
                  <div className="space-y-2">
                    {monastery.donationNeeds.map((need, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Coins className="w-3 h-3 text-secondary" />
                        <span className="text-muted-foreground">{need}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 btn-temple">
                    <Heart className="w-4 h-4 mr-2" />
                    Support This Monastery
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="max-w-4xl mx-auto">
              <div className="card-monastery">
                <h3 className="text-2xl font-bold mb-6 text-sacred">Historical Legacy</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary">Foundation Story</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Founded in {monastery.foundingYear} by {monastery.founder}, {monastery.name} has been a beacon of Buddhist wisdom for over {new Date().getFullYear() - monastery.foundingYear} years.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary">Cultural Impact</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {monastery.culturalSignificance}
                    </p>
                  </div>

                  {monastery.manuscripts.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-primary flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Sacred Manuscripts
                      </h4>
                      <p className="text-muted-foreground mb-4">
                        This monastery houses precious manuscript collections that preserve ancient Buddhist teachings.
                      </p>
                      <Link to="/manuscripts" className="btn-prayer">
                        Explore Manuscripts
                      </Link>
                    </div>
                  )}

                  {relatedFestivals.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-primary">Related Festivals</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {relatedFestivals.map((festival) => (
                          <Link
                            key={festival.id}
                            to={`/festivals/${festival.id}`}
                            className="card-festival hover:scale-105 transition-sacred block"
                          >
                            <h5 className="font-semibold text-foreground mb-2">{festival.name}</h5>
                            <p className="text-sm text-muted-foreground mb-2">{festival.date}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {festival.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "visit" && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="card-monastery">
                  <h3 className="text-2xl font-bold mb-4 text-sacred flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-primary" />
                    Visiting Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Visiting Hours</h4>
                      <p className="text-muted-foreground">{monastery.visitingHours}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Location</h4>
                      <p className="text-muted-foreground">{monastery.district}, Sikkim</p>
                      <p className="text-sm text-muted-foreground">Nearest town: {monastery.nearestTown}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Altitude</h4>
                      <p className="text-muted-foreground">{monastery.altitude} above sea level</p>
                    </div>
                  </div>
                </div>

                <div className="card-monastery">
                  <h4 className="font-bold mb-3 text-sacred">Visitor Guidelines</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>Remove shoes before entering prayer halls</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>Maintain silence during prayer times</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>Photography restrictions may apply in sacred areas</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>Dress modestly and respectfully</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>Follow guidance from monastery staff</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="card-monastery">
                  <h4 className="font-bold mb-3 text-sacred">Daily Routine</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {monastery.dailyRoutine}
                  </p>
                </div>

                <div className="card-monastery">
                  <h4 className="font-bold mb-3 text-sacred">What to Bring</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Warm clothing (high altitude)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Comfortable walking shoes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Small donations for monastery upkeep</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Respectful attitude and open mind</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full btn-sacred">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          )}

          {activeTab === "community" && (
            <div className="max-w-4xl mx-auto">
              <div className="card-monastery">
                <h3 className="text-2xl font-bold mb-6 text-sacred">Monastic Community</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-primary">Community Life</h4>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      The monastery is home to {monastery.currentMonks} dedicated monks who maintain the spiritual traditions and serve the local community. Their daily life revolves around prayer, study, meditation, and service.
                    </p>
                    
                    <h4 className="text-lg font-semibold mb-3 text-primary">Daily Schedule</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {monastery.dailyRoutine}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-primary">Community Services</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium">Spiritual Guidance</h5>
                          <p className="text-sm text-muted-foreground">Providing Buddhist teachings and counseling</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium">Cultural Preservation</h5>
                          <p className="text-sm text-muted-foreground">Maintaining traditional practices and texts</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium">Education</h5>
                          <p className="text-sm text-muted-foreground">Teaching Buddhism and traditional studies</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium">Community Support</h5>
                          <p className="text-sm text-muted-foreground">Helping local families and visitors</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-muted to-accent/20 rounded-lg">
                  <h4 className="font-bold mb-3 text-primary">Support the Community</h4>
                  <p className="text-muted-foreground mb-4">
                    Your support helps maintain this sacred place and supports the monastic community in their spiritual and cultural work.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button className="btn-temple">
                      <Heart className="w-4 h-4 mr-2" />
                      Make a Donation
                    </Button>
                    <Button variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Volunteer Opportunities
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Bottom spacer for mobile navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default MonasteryDetail;