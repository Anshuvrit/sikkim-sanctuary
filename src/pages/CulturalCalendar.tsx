import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, MapPin, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarEvent {
  id: string;
  title: string;
  monastery: string;
  date: string;
  endDate?: string;
  type: 'festival' | 'ritual' | 'ceremony' | 'teaching';
  status: 'upcoming' | 'live' | 'archived';
  description: string;
  significance: string;
  image: string;
  participants: number;
  duration: string;
  ticketPrice?: string;
  highlights: string[];
}

const CulturalCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const events: CalendarEvent[] = [
    {
      id: 'losar-2024',
      title: 'Losar - Tibetan New Year',
      monastery: 'Rumtek Monastery',
      date: '2024-02-10',
      endDate: '2024-02-12',
      type: 'festival',
      status: 'upcoming',
      description: 'The most important festival in the Tibetan calendar, marking the beginning of spring and spiritual renewal.',
      significance: 'Celebrates new beginnings, spiritual purification, and community unity. The festival includes traditional Cham dances, butter sculptures, and prayer ceremonies.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      participants: 2000,
      duration: '3 days',
      ticketPrice: 'Free',
      highlights: ['Cham Dance', 'Butter Sculptures', 'Community Feast', 'Prayer Ceremonies']
    },
    {
      id: 'bumchu-2024',
      title: 'Bumchu - Sacred Water Ceremony',
      monastery: 'Tashiding Monastery',
      date: '2024-03-15',
      type: 'ritual',
      status: 'upcoming',
      description: 'Ancient water divination ceremony revealing the sacred water from the previous year to predict fortune.',
      significance: 'The water level in the holy pot predicts the year ahead for Sikkim - drought, floods, or prosperity.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      participants: 1000,
      duration: '1 day',
      ticketPrice: '₹300',
      highlights: ['Water Revelation', 'Fortune Prediction', 'Community Prayers', 'Sacred Blessings']
    },
    {
      id: 'saga-dawa-2024',
      title: 'Saga Dawa - Buddha\'s Enlightenment',
      monastery: 'Multiple Monasteries',
      date: '2024-05-23',
      endDate: '2024-06-21',
      type: 'festival',
      status: 'upcoming',
      description: 'Month-long celebration of Buddha\'s birth, enlightenment, and parinirvana.',
      significance: 'Most sacred month in Buddhism when merit from good deeds is multiplied 100,000 times.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
      participants: 5000,
      duration: '1 month',
      ticketPrice: 'Free',
      highlights: ['Daily Prayers', 'Merit Accumulation', 'Pilgrimage Walks', 'Community Service']
    },
    {
      id: 'drukpa-teshi-2024',
      title: 'Drukpa Teshi - First Sermon',
      monastery: 'Hemis Monastery',
      date: '2024-07-20',
      type: 'ceremony',
      status: 'upcoming',
      description: 'Commemorates Buddha\'s first sermon after achieving enlightenment.',
      significance: 'Celebrates the turning of the wheel of dharma and the beginning of Buddhist teachings.',
      image: 'https://images.unsplash.com/photo-1582719371862-d818c4b8e0b3?w=600&h=400&fit=crop',
      participants: 800,
      duration: '2 days',
      ticketPrice: '₹200',
      highlights: ['Dharma Teachings', 'Monk Debates', 'Scripture Recitation', 'Community Discussions']
    }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const matchesMonth = eventDate.getMonth() === selectedMonth;
    const matchesYear = eventDate.getFullYear() === selectedYear;
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    
    return matchesMonth && matchesYear && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      upcoming: { text: 'Coming Soon', color: 'bg-accent text-accent-foreground' },
      live: { text: 'Live Now', color: 'bg-primary text-primary-foreground animate-pulse' },
      archived: { text: 'Archived', color: 'bg-muted text-muted-foreground' }
    };
    return badges[status as keyof typeof badges] || badges.upcoming;
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      festival: { text: '🎭 Festival', color: 'bg-secondary/20 text-secondary-foreground' },
      ritual: { text: '🕯️ Ritual', color: 'bg-primary/20 text-primary' },
      ceremony: { text: '🙏 Ceremony', color: 'bg-accent/20 text-accent-foreground' },
      teaching: { text: '📚 Teaching', color: 'bg-muted text-muted-foreground' }
    };
    return badges[type as keyof typeof badges] || badges.festival;
  };

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
            Cultural Calendar
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the rich tapestry of Buddhist festivals, rituals, and ceremonies throughout the year. 
            Join sacred celebrations that have connected communities for centuries.
          </p>
          
          <div className="inline-flex items-center bg-muted rounded-full px-6 py-3">
            <Calendar className="w-5 h-5 mr-3 text-primary" />
            <span className="font-semibold text-primary">Sacred Events</span>
            <span className="mx-2">•</span>
            <span className="text-muted-foreground">Year-round Celebrations</span>
            <span className="mx-2">•</span>
            <span className="text-muted-foreground">Cultural Immersion</span>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl shadow-soft p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {/* Month/Year Selector */}
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="px-4 py-2 border border-border rounded-lg bg-background"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>
              
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="px-4 py-2 border border-border rounded-lg bg-background"
              >
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background"
              >
                <option value="all">All Types</option>
                <option value="festival">Festivals</option>
                <option value="ritual">Rituals</option>
                <option value="ceremony">Ceremonies</option>
                <option value="teaching">Teachings</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="live">Live Now</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>{filteredEvents.length} events in {months[selectedMonth]} {selectedYear}</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span>Upcoming</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-muted rounded-full"></div>
                <span>Archived</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => {
            const statusBadge = getStatusBadge(event.status);
            const typeBadge = getTypeBadge(event.type);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-monastery group cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge.color}`}>
                      {statusBadge.text}
                    </span>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeBadge.color}`}>
                      {typeBadge.text}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-white">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        {event.endDate && (
                          <>
                            <span>-</span>
                            <span>{new Date(event.endDate).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-gradient-sacred group-hover:text-gradient-sunset">
                  {event.title}
                </h3>

                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  {event.monastery}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.participants.toLocaleString()} expected</span>
                  </div>
                  <div className="font-semibold text-primary">
                    {event.ticketPrice}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {event.highlights.slice(0, 2).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="bg-accent/20 text-accent-foreground px-2 py-1 rounded text-xs"
                    >
                      {highlight}
                    </span>
                  ))}
                  {event.highlights.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{event.highlights.length - 2} more
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold mb-4 text-muted-foreground">No events found</h3>
            <p className="text-muted-foreground mb-6">
              Try selecting a different month or adjusting your filters
            </p>
            <Button 
              onClick={() => {
                setFilterType('all');
                setFilterStatus('all');
                setSelectedMonth(new Date().getMonth());
              }}
              className="btn-temple"
            >
              <Filter className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-sacred"
          >
            <div className="relative">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-t-xl"></div>
              
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedEvent.status).color}`}>
                    {getStatusBadge(selectedEvent.status).text}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeBadge(selectedEvent.type).color}`}>
                    {getTypeBadge(selectedEvent.type).text}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEvent(null)}
                  className="bg-background/80 hover:bg-background"
                >
                  ✕
                </Button>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gradient-sacred mb-4">
                {selectedEvent.title}
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{selectedEvent.monastery}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{selectedEvent.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{selectedEvent.participants.toLocaleString()} participants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{selectedEvent.ticketPrice}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-primary mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-primary mb-2">Cultural Significance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedEvent.significance}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-primary mb-2">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <Button className="btn-sacred flex-1">
                  Join Event 🎭
                </Button>
                <Button variant="outline" className="flex-1">
                  Share Event
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Bottom spacer for mobile navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default CulturalCalendar;