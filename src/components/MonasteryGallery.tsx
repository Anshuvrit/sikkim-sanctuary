import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, MapPin, Calendar, Users, Book, Play, Globe, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useLoadingState from "@/hooks/useLoadingState";
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
  culturalSignificance: string;
  altitude: string;
  currentMonks: number;
  specialFeatures: string[];
  virtualTourAvailable: boolean;
  audioGuideLanguages: string[];
  visitingHours: string;
  images: string[];
}

interface MonasteryGalleryProps {
  monastery: Monastery;
  onVirtualTour: () => void;
  onAudioGuide: () => void;
  onBookVisit: () => void;
}

const MonasteryGallery = ({ monastery, onVirtualTour, onAudioGuide, onBookVisit }: MonasteryGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const { loading: tourLoading, startLoading: startTourLoading } = useLoadingState(2000);
  const { loading: audioLoading, startLoading: startAudioLoading } = useLoadingState(1500);

  // Map images to monastery IDs
  const monasteryImages: { [key: string]: string } = {
    rumtek: rumtekMain,
    pemayangste: peymangsteMain,
    tashiding: tashidingMain,
    enchey: encheyMain,
    dubdi: dubdiMain,
  };

  const getMonasteryImage = () => {
    return monasteryImages[monastery.id] || "/assets/monasteries/default-monastery.jpg";
  };

  const handleVirtualTour = async () => {
    await startTourLoading();
    onVirtualTour();
  };

  const handleAudioGuide = async () => {
    await startAudioLoading();
    onAudioGuide();
  };

  const getSectColor = (sect: string) => {
    const colors: { [key: string]: string } = {
      "Kagyu": "bg-blue-100 text-blue-800",
      "Nyingma": "bg-red-100 text-red-800",
      "Zurmang Kagyu": "bg-purple-100 text-purple-800",
    };
    return colors[sect] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="card-monastery">
      {/* Gallery Header */}
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6 group">
        <img
          src={getMonasteryImage()}
          alt={monastery.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
        
        {/* Monastery Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={getSectColor(monastery.sect)}>
            {monastery.sect}
          </Badge>
        </div>

        {/* Virtual Tour Badge */}
        {monastery.virtualTourAvailable && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary text-primary-foreground animate-pulse">
              360° Available
            </Badge>
          </div>
        )}

        {/* Monastery Title Overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold mb-1">{monastery.name}</h3>
          <p className="text-sm opacity-90">{monastery.tibetanName}</p>
          <div className="flex items-center mt-2 text-xs opacity-80">
            <Calendar className="w-3 h-3 mr-1" />
            Founded {monastery.foundingYear}
          </div>
        </div>

        {/* View Details Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute bottom-4 right-4 text-white bg-white/20 backdrop-blur-sm hover:bg-white/30"
          onClick={() => setShowDetails(!showDetails)}
        >
          <Eye className="w-4 h-4 mr-2" />
          {showDetails ? "Hide" : "Show"} Details
        </Button>
      </div>

      {/* Key Details */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span className="text-muted-foreground">{monastery.district}</span>
            <span className="mx-2">•</span>
            <span className="text-muted-foreground">{monastery.altitude}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span className="text-muted-foreground">{monastery.currentMonks} resident monks</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span className="text-muted-foreground">{monastery.visitingHours}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm text-primary mb-2">Special Features</h4>
            <div className="flex flex-wrap gap-1">
              {monastery.specialFeatures.slice(0, 3).map((feature, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {monastery.specialFeatures.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{monastery.specialFeatures.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-muted-foreground leading-relaxed">
          {monastery.description}
        </p>
      </div>

      {/* Cultural Significance (Extended Details) */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-muted/30 rounded-lg"
        >
          <h4 className="font-bold text-lg text-sacred mb-3">Cultural Significance</h4>
          <p className="text-muted-foreground leading-relaxed">
            {monastery.culturalSignificance}
          </p>
          
          <div className="mt-4">
            <h5 className="font-semibold text-primary mb-2">All Special Features</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {monastery.specialFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm">
                  <Star className="w-3 h-3 mr-2 text-primary" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Language Selection for Audio Guide */}
      {monastery.audioGuideLanguages.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-sm text-primary mb-2">Audio Guide Languages</h4>
          <div className="flex flex-wrap gap-2">
            {monastery.audioGuideLanguages.map((lang) => (
              <Button
                key={lang}
                variant={currentLanguage === lang ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentLanguage(lang)}
                className="text-xs"
              >
                <Globe className="w-3 h-3 mr-1" />
                {lang}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Virtual Tour Button */}
        <Button
          onClick={handleVirtualTour}
          disabled={!monastery.virtualTourAvailable || tourLoading}
          className="flex-1"
          variant={monastery.virtualTourAvailable ? "default" : "secondary"}
        >
          {tourLoading ? (
            <LoadingSpinner size="sm" message="" />
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              {monastery.virtualTourAvailable ? "360° Tour" : "Coming Soon"}
            </>
          )}
        </Button>

        {/* Audio Guide Button */}
        <Button
          onClick={handleAudioGuide}
          variant="outline"
          disabled={audioLoading}
          className="flex-1"
        >
          {audioLoading ? (
            <LoadingSpinner size="sm" message="" />
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Audio Guide ({currentLanguage})
            </>
          )}
        </Button>

        {/* Book Visit Button */}
        <Button
          onClick={onBookVisit}
          variant="default"
          className="flex-1 btn-sacred"
        >
          <Book className="w-4 h-4 mr-2" />
          Plan Your Visit
        </Button>
      </div>

      {/* Demo Ready Badge */}
      <div className="mt-4 text-center">
        <Badge variant="outline" className="text-xs">
          🎭 Demo Ready - Interactive Experience Available
        </Badge>
      </div>
    </div>
  );
};

export default MonasteryGallery;