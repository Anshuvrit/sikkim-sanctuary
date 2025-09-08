import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Users, BookOpen, Star, Heart } from "lucide-react";
import heroImage from "@/assets/hero-monastery.jpg";
import prayerFlags from "@/assets/prayer-flags.jpg";
import lotusSacred from "@/assets/lotus-sacred.jpg";
import MonasteryCarousel from "@/components/MonasteryCarousel";
import AIChatBot from "@/components/AIChatBot";
import SmartAudioGuide from "@/components/SmartAudioGuide";
import OfflineBadge from "@/components/OfflineBadge";

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: "Sacred Monasteries",
      description: "Discover 10+ ancient Buddhist monasteries across Sikkim",
      href: "/monasteries",
      color: "from-primary to-secondary"
    },
    {
      icon: Calendar,
      title: "Buddhist Festivals",
      description: "Experience the spiritual celebrations throughout the year",
      href: "/festivals",
      color: "from-secondary to-accent"
    },
    {
      icon: Users,
      title: "Community Stories",
      description: "Share and read inspiring spiritual journeys",
      href: "/community",
      color: "from-accent to-primary"
    },
    {
      icon: BookOpen,
      title: "Ancient Manuscripts",
      description: "Explore precious Buddhist texts and sacred writings",
      href: "/manuscripts",
      color: "from-primary to-accent"
    }
  ];

  const stats = [
    { number: "10+", label: "Historic Monasteries", icon: "🏛️" },
    { number: "7", label: "Sacred Festivals", icon: "🎭" },
    { number: "500+", label: "Years of Heritage", icon: "📿" },
    { number: "1000+", label: "Community Members", icon: "👥" }
  ];

  return (
    <div className="min-h-screen">
      {/* Floating Platform Badge */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full shadow-sacred text-sm font-medium z-50 animate-meditation-breath">
        🏛️ One-stop platform for monastery exploration, booking & preservation!
      </div>

      {/* Hero Section with Carousel */}
      <section className="relative pt-16 pb-8">
        <div className="container-temple">
          <MonasteryCarousel />
        </div>
      </section>

      {/* Original Hero Content */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-sacred leading-tight">
              Sikkim's Sacred
              <br />
              <span className="text-gradient-sunset">Buddhist Heritage</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Journey through centuries of spiritual wisdom preserved in the monasteries of Sikkim, 
              where ancient Buddhist traditions continue to inspire and guide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/monasteries" className="btn-sacred group">
                Explore Monasteries
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link to="/festivals" className="btn-temple">
                Sacred Festivals
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Prayer Wheels */}
        <motion.div
          className="absolute top-20 right-10 w-12 h-12 text-4xl animate-meditation-breath"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ☸️
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-10 w-12 h-12 text-4xl animate-lotus-bloom"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          🕉️
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-mountain">
        <div className="container-temple">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group hover:scale-105 transition-sacred"
              >
                <div className="text-4xl mb-2 animate-meditation-breath">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-temple">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-sacred">
              Discover Sacred Wisdom
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Immerse yourself in the rich Buddhist heritage of Sikkim through our comprehensive digital platform
            </p>
          </motion.div>

          <div className="grid-monastery">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={feature.href}
                    className="card-monastery group hover:scale-105 block"
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:animate-lotus-bloom`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-sacred group-hover:text-gradient-sunset">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="py-20 bg-gradient-to-r from-muted to-accent/20">
        <div className="container-temple">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-4xl font-bold mb-6 text-sacred">
                Preserving Sacred Traditions
              </h3>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                For over 400 years, Sikkim's monasteries have been guardians of ancient Buddhist wisdom, 
                preserving sacred texts, maintaining cultural practices, and providing spiritual guidance 
                to communities across the Himalayas.
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our digital platform ensures these precious traditions remain accessible to future 
                generations while honoring their sacred nature and cultural significance.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-background/80 rounded-full px-4 py-2">
                  <Star className="w-5 h-5 text-secondary" />
                  <span className="font-medium">Authentic Content</span>
                </div>
                <div className="flex items-center space-x-2 bg-background/80 rounded-full px-4 py-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="font-medium">Cultural Respect</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src={prayerFlags}
                    alt="Prayer flags in the Himalayas"
                    className="rounded-xl shadow-temple w-full hover:scale-105 transition-sacred"
                  />
                  <div className="card-festival p-4">
                    <h4 className="font-bold text-sacred mb-2">Prayer Flags</h4>
                    <p className="text-sm text-muted-foreground">
                      Sacred mantras carried by mountain winds
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mt-8">
                  <div className="card-festival p-4">
                    <h4 className="font-bold text-sacred mb-2">Sacred Lotus</h4>
                    <p className="text-sm text-muted-foreground">
                      Symbol of purity and enlightenment
                    </p>
                  </div>
                  <img
                    src={lotusSacred}
                    alt="Sacred lotus flower"
                    className="rounded-xl shadow-temple w-full hover:scale-105 transition-sacred"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-sunset text-white text-center">
        <div className="container-temple">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-4xl font-bold mb-6">
              Begin Your Spiritual Journey
            </h3>
            
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of spiritual seekers exploring Sikkim's Buddhist heritage. 
              Start your journey of discovery today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/monasteries"
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-gentle shadow-temple hover:shadow-sacred"
              >
                Explore Monasteries
              </Link>
              
              <Link
                to="/community"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-gentle"
              >
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Components */}
      <AIChatBot />
      <SmartAudioGuide />
      <OfflineBadge />

      {/* Bottom Spacer for Mobile Navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Home;