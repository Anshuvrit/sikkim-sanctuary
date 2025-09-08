import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CarouselSlide {
  id: string;
  name: string;
  image: string;
  description: string;
  location: string;
  established: string;
  highlights: string[];
}

const MonasteryCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides: CarouselSlide[] = [
    {
      id: 'rumtek',
      name: 'Rumtek Monastery',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
      description: 'The Dharma Chakra Centre, seat of the 16th Karmapa, showcasing magnificent Tibetan architecture with golden roofs and sacred relics.',
      location: 'East Sikkim, 24km from Gangtok',
      established: '1962',
      highlights: ['Golden Stupa', 'Karmapa Seat', 'Sacred Relics']
    },
    {
      id: 'pemayangtse',
      name: 'Pemayangtse Monastery',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
      description: 'One of the oldest monasteries in Sikkim, famous for its seven-tiered wooden sculpture representing the celestial palace of Guru Rinpoche.',
      location: 'West Sikkim, near Pelling',
      established: '1705',
      highlights: ['Sangdogpalri Model', 'Ancient Murals', 'Mountain Views']
    },
    {
      id: 'tashiding',
      name: 'Tashiding Monastery',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      description: 'Sacred hilltop monastery where three rivers meet, famous for the annual Bumchu festival and its spiritual significance in Sikkimese Buddhism.',
      location: 'West Sikkim, Tashiding',
      established: '1641',
      highlights: ['Bumchu Festival', 'River Confluence', 'Sacred Chortens']
    },
    {
      id: 'ralang',
      name: 'Ralang Monastery',
      image: 'https://images.unsplash.com/photo-1582719371862-d818c4b8e0b3?w=1200&h=800&fit=crop',
      description: 'Hidden gem surrounded by lush forests, known for its peaceful atmosphere and traditional Kagyu lineage teachings.',
      location: 'South Sikkim, Ravangla',
      established: '1768',
      highlights: ['Forest Setting', 'Traditional Architecture', 'Meditation Retreats']
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[70vh] w-full rounded-xl overflow-hidden shadow-sacred">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/20"></div>
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="container-temple">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-sacred">
                    {slides[currentSlide].name}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {slides[currentSlide].description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center space-x-2 bg-background/80 rounded-full px-4 py-2">
                      <span className="text-primary">📍</span>
                      <span className="text-sm font-medium">{slides[currentSlide].location}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-background/80 rounded-full px-4 py-2">
                      <span className="text-secondary">🏛️</span>
                      <span className="text-sm font-medium">Est. {slides[currentSlide].established}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {slides[currentSlide].highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to={`/virtual-tours/${slides[currentSlide].id}`}
                      className="btn-sacred group"
                    >
                      <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Start Virtual Tour
                    </Link>
                    
                    <Link
                      to={`/monasteries/${slides[currentSlide].id}`}
                      className="btn-temple"
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-background/80 hover:bg-background text-foreground shadow-soft"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-background/80 hover:bg-background text-foreground shadow-soft"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary shadow-sacred scale-125'
                  : 'bg-background/60 hover:bg-background/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Play/Pause Button */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-background/80 hover:bg-background text-foreground"
        >
          {isPlaying ? (
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-current"></div>
              <div className="w-1 h-4 bg-current"></div>
            </div>
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Auto-slide Progress Bar */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-background/20">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
            key={currentSlide}
          />
        </div>
      )}
    </div>
  );
};

export default MonasteryCarousel;