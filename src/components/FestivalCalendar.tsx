import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, Star, Camera, Eye, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/LoadingSpinner";
import useLoadingState from "@/hooks/useLoadingState";
import festivalsData from "@/data/festivals.json";

// Import festival images
import losarChamDance from "@/assets/festivals/losar-cham-dance.jpg";
import losarButterSculptures from "@/assets/festivals/losar-butter-sculptures.jpg";
import losarPrayerFlags from "@/assets/festivals/losar-prayer-flags.jpg";
import sagaDawaPilgrimage from "@/assets/festivals/saga-dawa-pilgrimage.jpg";
import bumchuCeremony from "@/assets/festivals/bumchu-ceremony.jpg";

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
  culturalSignificance: string;
  rituals: string[];
  images: string[];
  ticketPrice: string;
  bestViewingSpots: string[];
}

const FestivalCalendar = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    experience: ""
  });
  const [viewMode, setViewMode] = useState<"calendar" | "grid">("calendar");
  const { loading, startLoading } = useLoadingState(1500);
  const [submittedBooking, setSubmittedBooking] = useState(false);

  // Map image imports to festival IDs
  const festivalImages: { [key: string]: string[] } = {
    losar: [losarChamDance, losarButterSculptures, losarPrayerFlags],
    "saga-dawa": [sagaDawaPilgrimage],
    bumchu: [bumchuCeremony],
  };

  useEffect(() => {
    setTimeout(() => {
      setFestivals(festivalsData as Festival[]);
    }, 800);
  }, []);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    await startLoading();
    
    // Simulate booking storage
    const bookings = JSON.parse(localStorage.getItem("festivalBookings") || "[]");
    const newBooking = {
      id: Date.now(),
      festivalId: selectedFestival?.id,
      festivalName: selectedFestival?.name,
      ...bookingData,
      bookingDate: new Date().toISOString(),
      status: "confirmed"
    };
    bookings.push(newBooking);
    localStorage.setItem("festivalBookings", JSON.stringify(bookings));
    
    setSubmittedBooking(true);
    setTimeout(() => {
      setBookingModal(false);
      setSubmittedBooking(false);
      setBookingData({ name: "", email: "", phone: "", guests: 1, experience: "" });
    }, 3000);
  };

  const getFestivalImage = (festival: Festival, index = 0) => {
    const images = festivalImages[festival.id];
    return images?.[index] || "/assets/festivals/default-festival.jpg";
  };

  const upcomingFestivals = festivals.filter(f => {
    const festivalDate = new Date(f.date.split(" - ")[0]);
    return festivalDate > new Date();
  });

  const CalendarView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {festivals.map((festival, index) => {
        const isUpcoming = upcomingFestivals.includes(festival);
        return (
          <motion.div
            key={festival.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-festival group cursor-pointer"
            onClick={() => setSelectedFestival(festival)}
          >
            {/* Festival Image Gallery */}
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <img
                src={getFestivalImage(festival)}
                alt={festival.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {isUpcoming && (
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground animate-pulse">
                  Upcoming
                </Badge>
              )}
              
              <div className="absolute bottom-3 left-3 text-white">
                <h4 className="font-bold text-lg">{festival.name}</h4>
                <p className="text-sm opacity-90">{festival.tibetanName}</p>
              </div>
              
              <div className="absolute top-3 right-3">
                <Camera className="w-5 h-5 text-white/80" />
              </div>
            </div>

            {/* Festival Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{festival.type}</Badge>
                <span className="text-sm text-muted-foreground">{festival.duration}</span>
              </div>
              
              <p className="text-muted-foreground text-sm line-clamp-2">
                {festival.description}
              </p>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                {festival.date}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                {festival.monasteries.length} Monasteries
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-primary">
                  {festival.ticketPrice}
                </span>
                {isUpcoming && (
                  <Button 
                    size="sm" 
                    className="animate-pulse"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBookingModal(true);
                    }}
                  >
                    Book Experience
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const GridView = () => (
    <div className="space-y-4">
      {festivals.map((festival, index) => (
        <motion.div
          key={festival.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="card-monastery flex flex-col md:flex-row gap-4 cursor-pointer group"
          onClick={() => setSelectedFestival(festival)}
        >
          <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden">
            <img
              src={getFestivalImage(festival)}
              alt={festival.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-lg text-sacred">{festival.name}</h4>
              {upcomingFestivals.includes(festival) && (
                <Badge className="bg-primary text-primary-foreground">Upcoming</Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">{festival.tibetanName}</p>
            <p className="text-muted-foreground line-clamp-2">{festival.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {festival.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {festival.duration}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {festival.monasteries.length} venues
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gradient-sacred mb-2">
            Festival Calendar 2024
          </h2>
          <p className="text-muted-foreground">
            Experience the sacred celebrations of Sikkim's Buddhist heritage
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex gap-2 bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("calendar")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Festival Views */}
      {viewMode === "calendar" ? <CalendarView /> : <GridView />}

      {/* Festival Detail Modal */}
      {selectedFestival && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-sacred"
          >
            {/* Festival Header */}
            <div className="relative h-64">
              <img
                src={getFestivalImage(selectedFestival)}
                alt={selectedFestival.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">{selectedFestival.name}</h3>
                <p className="opacity-90">{selectedFestival.tibetanName}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setSelectedFestival(null)}
              >
                ✕
              </Button>
            </div>

            {/* Festival Content */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-bold text-lg text-sacred mb-2">Cultural Significance</h4>
                <p className="text-muted-foreground">{selectedFestival.culturalSignificance}</p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg text-sacred mb-2">Sacred Rituals</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedFestival.rituals.slice(0, 6).map((ritual, idx) => (
                    <div key={idx} className="flex items-center bg-muted/50 rounded-lg px-3 py-2">
                      <Star className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                      <span className="text-sm">{ritual}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg text-sacred mb-2">Event Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {selectedFestival.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      {selectedFestival.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      {selectedFestival.ticketPrice}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg text-sacred mb-2">Best Viewing</h4>
                  <div className="space-y-1">
                    {selectedFestival.bestViewingSpots.slice(0, 3).map((spot, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground flex items-start">
                        <Eye className="w-4 h-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        {spot}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {upcomingFestivals.includes(selectedFestival) && (
                <Button 
                  className="w-full btn-sacred animate-pulse"
                  onClick={() => setBookingModal(true)}
                >
                  Book Your Festival Experience
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl max-w-md w-full shadow-sacred p-6"
          >
            {submittedBooking ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Booking Confirmed!</h3>
                <p className="text-muted-foreground">
                  Your festival experience has been reserved. Confirmation details sent to your email.
                </p>
                <p className="text-sm text-muted-foreground">
                  Booking ID: #{Date.now()}
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-sacred">Book Festival Experience</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setBookingModal(false)}
                  >
                    ✕
                  </Button>
                </div>
                
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Guests</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({...bookingData, guests: Number(e.target.value)})}
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Experience Preference</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      value={bookingData.experience}
                      onChange={(e) => setBookingData({...bookingData, experience: e.target.value})}
                    >
                      <option value="">Select preference</option>
                      <option value="photography">Photography Tour</option>
                      <option value="meditation">Meditation Session</option>
                      <option value="cultural">Cultural Immersion</option>
                      <option value="family">Family Experience</option>
                    </select>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-sacred"
                    disabled={loading}
                  >
                    {loading ? <LoadingSpinner size="sm" message="" /> : "Confirm Booking"}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FestivalCalendar;