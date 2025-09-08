import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioTrack {
  id: string;
  title: string;
  duration: string;
  transcript: string;
  monastery: string;
  language: 'english' | 'hindi' | 'nepali';
}

const SmartAudioGuide = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'nepali'>('english');
  const [showTranscript, setShowTranscript] = useState(false);
  const [simulatedLocation, setSimulatedLocation] = useState('Gangtok City Center');
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioTracks: Record<string, AudioTrack[]> = {
    english: [
      {
        id: 'intro-sikkim',
        title: 'Welcome to Sikkim\'s Buddhist Heritage',
        duration: '2:45',
        transcript: 'Welcome to the sacred land of Sikkim, where ancient Buddhist traditions flourish among the world\'s highest peaks. You are about to embark on a spiritual journey through monasteries that have preserved centuries of wisdom...',
        monastery: 'General Introduction',
        language: 'english'
      },
      {
        id: 'rumtek-history',
        title: 'Rumtek Monastery - Seat of the Karmapa',
        duration: '4:20',
        transcript: 'Rumtek Monastery, also known as the Dharma Chakra Centre, was established in 1962 by His Holiness the 16th Karmapa. This magnificent structure serves as the seat of the Karmapa lineage outside Tibet...',
        monastery: 'Rumtek Monastery',
        language: 'english'
      },
      {
        id: 'pemayangtse-architecture',
        title: 'Pemayangtse - Architectural Marvel',
        duration: '3:55',
        transcript: 'Founded in 1705, Pemayangtse Monastery represents the perfect monastery of the Nyingma tradition. The name means "perfect sublime lotus" and houses the famous seven-tiered wooden sculpture...',
        monastery: 'Pemayangtse Monastery',
        language: 'english'
      }
    ],
    hindi: [
      {
        id: 'intro-sikkim-hi',
        title: 'सिक्किम की बौद्ध विरासत में आपका स्वागत है',
        duration: '2:50',
        transcript: 'सिक्किम की पवित्र भूमि में आपका स्वागत है, जहाँ प्राचीन बौद्ध परंपराएँ दुनिया की सबसे ऊँची चोटियों के बीच फलती-फूलती हैं...',
        monastery: 'सामान्य परिचय',
        language: 'hindi'
      }
    ],
    nepali: [
      {
        id: 'intro-sikkim-ne',
        title: 'सिक्किमको बौद्ध सम्पदामा स्वागत छ',
        duration: '2:55',
        transcript: 'सिक्किमको पवित्र भूमिमा तपाईंलाई स्वागत छ, जहाँ पुरातन बौद्ध परम्पराहरू संसारका सबैभन्दा अग्लो शिखरहरूका बीचमा फस्टाउँछन्...',
        monastery: 'सामान्य परिचय',
        language: 'nepali'
      }
    ]
  };

  // Simulate GPS location detection
  useEffect(() => {
    const locations = [
      'Near Rumtek Monastery',
      'Gangtok City Center', 
      'Approaching Enchey Monastery',
      'Pelling Town - Near Pemayangtse',
      'Tashiding Village'
    ];
    
    const interval = setInterval(() => {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      setSimulatedLocation(randomLocation);
    }, 10000); // Change location every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-suggest content based on location
  useEffect(() => {
    if (simulatedLocation.includes('Rumtek')) {
      setCurrentTrack(audioTracks[language].find(track => track.monastery.includes('Rumtek')) || audioTracks[language][0]);
    } else if (simulatedLocation.includes('Pemayangtse') || simulatedLocation.includes('Pelling')) {
      setCurrentTrack(audioTracks[language].find(track => track.monastery.includes('Pemayangtse')) || audioTracks[language][0]);
    } else {
      setCurrentTrack(audioTracks[language][0]);
    }
  }, [simulatedLocation, language]);

  // Simulate audio progress
  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5; // Increment progress
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const skipBack = () => {
    setProgress(Math.max(0, progress - 15));
  };

  const skipForward = () => {
    setProgress(Math.min(100, progress + 15));
  };

  const changeLanguage = (newLanguage: 'english' | 'hindi' | 'nepali') => {
    setLanguage(newLanguage);
    setIsPlaying(false);
    setProgress(0);
  };

  const formatTime = (percentage: number, duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    const currentSeconds = Math.floor((percentage / 100) * totalSeconds);
    const currentMinutes = Math.floor(currentSeconds / 60);
    const remainingSeconds = currentSeconds % 60;
    return `${currentMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* GPS Location Trigger */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card border border-border rounded-lg shadow-temple p-3 z-40"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">GPS Location Detected</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            className="text-primary hover:text-primary/80"
          >
            {isVisible ? 'Hide' : 'Start'} Audio Guide
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{simulatedLocation}</p>
        {currentTrack && (
          <p className="text-xs text-primary font-medium mt-1">
            📻 {currentTrack.title} available
          </p>
        )}
      </motion.div>

      {/* Audio Guide Player */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-card border border-border rounded-xl shadow-sacred p-6 z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-primary">🎧 Smart Audio Guide</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
              >
                ✕
              </Button>
            </div>

            {/* Language Selection */}
            <div className="flex space-x-2 mb-4">
              {(['english', 'hindi', 'nepali'] as const).map((lang) => (
                <Button
                  key={lang}
                  variant={language === lang ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => changeLanguage(lang)}
                  className="text-xs"
                >
                  {lang === 'english' ? 'EN' : lang === 'hindi' ? 'हिं' : 'ने'}
                </Button>
              ))}
            </div>

            {currentTrack && (
              <>
                {/* Current Track Info */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-1">{currentTrack.title}</h4>
                  <p className="text-xs text-muted-foreground">{currentTrack.monastery}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>{formatTime(progress, currentTrack.duration)}</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Button variant="ghost" size="sm" onClick={skipBack}>
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </Button>
                  
                  <Button variant="ghost" size="sm" onClick={skipForward}>
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" onClick={toggleMute}>
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Transcript Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="w-full mb-3"
                >
                  {showTranscript ? 'Hide' : 'Show'} Transcript
                </Button>

                {/* Transcript */}
                <AnimatePresence>
                  {showTranscript && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-muted rounded-lg p-3 overflow-hidden"
                    >
                      <h5 className="text-xs font-semibold mb-2 text-primary">Transcript:</h5>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {currentTrack.transcript}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {/* Available Tracks */}
            <div className="mt-4 pt-4 border-t border-border">
              <h5 className="text-xs font-semibold mb-2 text-muted-foreground">Available Tracks:</h5>
              <div className="space-y-1">
                {audioTracks[language].slice(0, 3).map((track) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      setCurrentTrack(track);
                      setProgress(0);
                      setIsPlaying(false);
                    }}
                    className={`w-full text-left p-2 rounded text-xs transition-colors ${
                      currentTrack?.id === track.id
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    <div className="font-medium">{track.title}</div>
                    <div className="text-xs opacity-70">{track.duration}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmartAudioGuide;