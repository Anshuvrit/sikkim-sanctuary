import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Clock, Users, Ticket, Camera, Star, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
  culturalSignificance: string;
  rituals: string[];
  traditionalFoods: string[];
  images: string[];
  ticketPrice: string;
  bestViewingSpots: string[];
  culturalEtiquette: string[];
  whatToBring: string[];
}

const FestivalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [festival, setFestival] = useState<Festival | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    name: '',
    email: '',
    phone: '',
    participants: 1,
    monastery: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    // Simulate loading with realistic delay
    const timer = setTimeout(() => {
      const foundFestival = festivalsData.find(f => f.id === id) as Festival;
      if (foundFestival) {
        setFestival(foundFestival);
        setBooking(prev => ({ ...prev, monastery: foundFestival.monasteries[0] || '' }));
      }
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking.name || !booking.email) {
      setBookingError('Please fill in all required fields');
      return;
    }

    setIsBooking(true);
    setBookingError('');

    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('festivalBookings') || '[]');
    const newBooking = {
      id: `booking-${Date.now()}`,
      festivalId: id,
      festivalName: festival?.name,
      ...booking,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      confirmationCode: `FT${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    };
    
    bookings.push(newBooking);
    localStorage.setItem('festivalBookings', JSON.stringify(bookings));
    
    setIsBooking(false);
    setBookingComplete(true);
  };

  const shareFestival = () => {
    if (navigator.share) {
      navigator.share({
        title: festival?.name,
        text: `Experience ${festival?.name} at Sikkim's Buddhist monasteries`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Festival link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mb-4 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h3 className="text-xl font-semibold mb-2 text-sacred">Loading Festival Details</h3>
          <p className="text-muted-foreground">Gathering sacred knowledge...</p>
        </div>
      </div>
    );
  }

  if (!festival) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-2xl font-bold mb-4">Festival Not Found</h3>
          <p className="text-muted-foreground mb-6">The festival you're looking for doesn't exist.</p>
          <Link to="/festivals">
            <Button className="btn-temple">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Festivals
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-sunset overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-6xl text-white/90"
          >
            🎭
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-0 right-0">
          <div className="container-temple text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/festivals" className="inline-flex items-center text-white/80 hover:text-white mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Festivals
              </Link>
              
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                {festival.type}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{festival.name}</h1>
              <p className="text-xl opacity-90 mb-4">{festival.tibetanName}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {festival.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {festival.duration}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {festival.monasteries.length} Monasteries
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Button
          onClick={shareFestival}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
          size="sm"
        >
          <Share className="w-4 h-4" />
        </Button>
      </div>

      <div className="container-temple py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-sacred">About the Festival</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {festival.description}
                </p>
                
                <div className="bg-accent/20 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-primary">Cultural Significance</h3>
                  <p className="text-muted-foreground">{festival.culturalSignificance}</p>
                </div>
              </Card>
            </motion.div>

            {/* Rituals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-sacred">Sacred Rituals</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {festival.rituals.map((ritual, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">{ritual}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Traditional Foods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-sacred">Traditional Festival Foods</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {festival.traditionalFoods.map((food, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg">
                      <span className="text-2xl">🍜</span>
                      <span className="text-muted-foreground">{food}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Cultural Etiquette */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-sacred">Cultural Etiquette</h2>
                <div className="space-y-3">
                  {festival.culturalEtiquette.map((etiquette, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border-l-4 border-primary/30 bg-primary/5">
                      <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{etiquette}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-sacred">Festival Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{festival.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Entry Fee:</span>
                    <span className="font-medium">{festival.ticketPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monasteries:</span>
                    <span className="font-medium">{festival.monasteries.length}</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Best Viewing Spots */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-sacred">Best Viewing Spots</h3>
                <div className="space-y-3">
                  {festival.bestViewingSpots.map((spot, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{spot}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* What to Bring */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-sacred">What to Bring</h3>
                <div className="space-y-2">
                  {festival.whatToBring.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6">
                {!bookingComplete ? (
                  <>
                    <h3 className="text-lg font-semibold mb-4 text-sacred">Book Your Visit</h3>
                    <form onSubmit={handleBooking} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={booking.name}
                          onChange={(e) => setBooking({...booking, name: e.target.value})}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          value={booking.email}
                          onChange={(e) => setBooking({...booking, email: e.target.value})}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={booking.phone}
                          onChange={(e) => setBooking({...booking, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Participants</label>
                        <select
                          value={booking.participants}
                          onChange={(e) => setBooking({...booking, participants: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Monastery</label>
                        <select
                          value={booking.monastery}
                          onChange={(e) => setBooking({...booking, monastery: e.target.value})}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          {festival.monasteries.map(monastery => (
                            <option key={monastery} value={monastery}>
                              {monastery.charAt(0).toUpperCase() + monastery.slice(1)} Monastery
                            </option>
                          ))}
                        </select>
                      </div>

                      {bookingError && (
                        <div className="text-red-500 text-sm">{bookingError}</div>
                      )}

                      <Button 
                        type="submit" 
                        disabled={isBooking} 
                        className="w-full btn-sacred"
                      >
                        {isBooking ? (
                          <span className="flex items-center">
                            <motion.div
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Processing Booking...
                          </span>
                        ) : (
                          <>
                            <Ticket className="w-4 h-4 mr-2" />
                            Book Festival Visit
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <span className="text-2xl">✅</span>
                    </motion.div>
                    
                    <h3 className="text-lg font-semibold mb-2 text-green-600">Booking Confirmed!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You will receive confirmation details via email shortly.
                    </p>
                    
                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium">Confirmation Code:</p>
                      <p className="text-lg font-bold text-primary">
                        FT{Math.random().toString(36).substr(2, 8).toUpperCase()}
                      </p>
                    </div>
                    
                    <Button 
                      onClick={() => setBookingComplete(false)}
                      variant="outline" 
                      size="sm"
                    >
                      Book Another Visit
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Bottom spacer for mobile navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default FestivalDetail;