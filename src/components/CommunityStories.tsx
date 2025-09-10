import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart, Eye, Upload, Camera, MapPin, Calendar, User, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/LoadingSpinner";
import useLoadingState from "@/hooks/useLoadingState";

interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
  monastery: string;
  type: "experience" | "history" | "photo" | "ritual";
  createdAt: string;
  likes: number;
  views: number;
  status: "approved" | "pending" | "featured";
  verified: boolean;
  tags: string[];
  image?: string;
}

const CommunityStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [newStory, setNewStory] = useState({
    title: "",
    content: "",
    author: "",
    monastery: "",
    type: "experience" as const,
    tags: "",
  });
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [filter, setFilter] = useState<"all" | "featured" | "recent">("all");
  const { loading, startLoading } = useLoadingState(2000);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Demo stories data
  const demoStories: Story[] = [
    {
      id: "story1",
      title: "My Sunrise Meditation at Rumtek",
      content: "Waking up at 4 AM to join the morning prayers at Rumtek Monastery was a transformative experience. The sound of horns echoing through the valleys, the golden sunlight streaming through ancient windows, and the peaceful chanting of monks created a moment of pure spiritual connection. I felt the weight of centuries of tradition and found inner peace I hadn't experienced before.",
      author: "Sarah Chen",
      monastery: "Rumtek Monastery",
      type: "experience",
      createdAt: "2024-01-15",
      likes: 24,
      views: 156,
      status: "featured",
      verified: true,
      tags: ["meditation", "sunrise", "spiritual"],
    },
    {
      id: "story2", 
      title: "The Legend of Flying Lama at Enchey",
      content: "Local elders tell fascinating stories about Lama Druptob Karpo who could fly through the mountains. They say he would meditate in impossible locations and appear at multiple monasteries in the same day. While visiting Enchey Monastery, I heard these stories from a 90-year-old monk who claimed his grandfather witnessed these miracles.",
      author: "Pemba Sherpa",
      monastery: "Enchey Monastery", 
      type: "history",
      createdAt: "2024-01-10",
      likes: 18,
      views: 89,
      status: "approved",
      verified: true,
      tags: ["legend", "history", "miracles"],
    },
    {
      id: "story3",
      title: "Festival Photography Tips at Losar",
      content: "Capturing the vibrant colors and sacred moments during Losar celebrations requires patience and respect. I learned to photograph the Cham dances from the side, never blocking other devotees, and always asking permission for close-ups of ceremonial objects. The key is to become part of the celebration while documenting it.",
      author: "David Kim",
      monastery: "Multiple Monasteries",
      type: "photo", 
      createdAt: "2024-01-08",
      likes: 31,
      views: 203,
      status: "featured",
      verified: false,
      tags: ["photography", "festival", "losar"],
    },
    {
      id: "story4",
      title: "The Sacred Water Mystery of Bumchu",
      content: "Witnessing the Bumchu ceremony at Tashiding was mystical. The ancient pot that predicts Sikkim's future was opened with such reverence, and locals explained how the water levels have accurately predicted events for generations. The atmosphere was electric with anticipation and faith.",
      author: "Tenzin Norbu",
      monastery: "Tashiding Monastery",
      type: "ritual",
      createdAt: "2024-01-05",
      likes: 42,
      views: 298,
      status: "featured",
      verified: true,
      tags: ["prophecy", "ritual", "mystery"],
    },
  ];

  const monasteryOptions = [
    "Rumtek Monastery",
    "Pemayangste Monastery", 
    "Tashiding Monastery",
    "Enchey Monastery",
    "Dubdi Monastery",
    "Ralang Monastery",
  ];

  useEffect(() => {
    // Load existing stories from localStorage or use demo data
    const savedStories = localStorage.getItem("communityStories");
    if (savedStories) {
      setStories([...JSON.parse(savedStories), ...demoStories]);
    } else {
      setStories(demoStories);
    }
  }, []);

  const handleSubmitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    await startLoading();

    const story: Story = {
      id: `story-${Date.now()}`,
      ...newStory,
      tags: newStory.tags.split(",").map(tag => tag.trim()),
      createdAt: new Date().toISOString().split("T")[0],
      likes: 0,
      views: 0,
      status: "pending",
      verified: false,
    };

    const updatedStories = [story, ...stories];
    setStories(updatedStories);
    
    // Save to localStorage (excluding demo stories to avoid duplication)
    const userStories = updatedStories.filter(s => !demoStories.find(ds => ds.id === s.id));
    localStorage.setItem("communityStories", JSON.stringify(userStories));
    
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setShowSubmissionForm(false);
      setNewStory({ title: "", content: "", author: "", monastery: "", type: "experience", tags: "" });
    }, 3000);
  };

  const handleLikeStory = (storyId: string) => {
    setStories(stories.map(story => 
      story.id === storyId 
        ? { ...story, likes: story.likes + 1 }
        : story
    ));
  };

  const filteredStories = stories.filter(story => {
    if (filter === "featured") return story.status === "featured";
    if (filter === "recent") return new Date(story.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return true;
  });

  const getTypeIcon = (type: string) => {
    const icons = {
      experience: "🧘",
      history: "📚",
      photo: "📸", 
      ritual: "🕯️",
    };
    return icons[type as keyof typeof icons] || "📝";
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      featured: <Badge className="bg-yellow-100 text-yellow-800">⭐ Featured</Badge>,
      approved: <Badge className="bg-green-100 text-green-800">✓ Approved</Badge>,
      pending: <Badge className="bg-orange-100 text-orange-800">⏳ Pending Review</Badge>,
    };
    return badges[status as keyof typeof badges];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gradient-sacred">
          Community Stories 📖
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Share your monastery experiences, cultural insights, and sacred moments with fellow spiritual seekers
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            onClick={() => setShowSubmissionForm(true)}
            className="btn-sacred"
          >
            <Upload className="w-4 h-4 mr-2" />
            Share Your Story
          </Button>
          
          <div className="flex gap-2 bg-muted rounded-lg p-1">
            {[
              { id: "all", label: "All Stories" },
              { id: "featured", label: "Featured" },
              { id: "recent", label: "Recent" },
            ].map((filterOption) => (
              <Button
                key={filterOption.id}
                variant={filter === filterOption.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(filterOption.id as any)}
              >
                {filterOption.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-monastery cursor-pointer group"
            onClick={() => setSelectedStory(story)}
          >
            {/* Story Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getTypeIcon(story.type)}</span>
                <div>
                  <h4 className="font-bold text-lg text-sacred group-hover:text-primary transition-colors">
                    {story.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span>{story.author}</span>
                    {story.verified && (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    )}
                  </div>
                </div>
              </div>
              {getStatusBadge(story.status)}
            </div>

            {/* Story Content Preview */}
            <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
              {story.content}
            </p>

            {/* Story Meta */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                {story.monastery}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(story.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {story.views}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeStory(story.id);
                  }}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Heart className="w-4 h-4 mr-1" />
                  {story.likes}
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {story.tags.slice(0, 3).map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Story Submission Modal */}
      {showSubmissionForm && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-sacred p-6"
          >
            {submissionSuccess ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Story Submitted!</h3>
                <p className="text-muted-foreground">
                  Thank you for sharing your experience! Your story is under review and will be published soon.
                </p>
                <Badge className="bg-orange-100 text-orange-800">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending Moderation
                </Badge>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-sacred">Share Your Story</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSubmissionForm(false)}
                  >
                    ✕
                  </Button>
                </div>

                <form onSubmit={handleSubmitStory} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Story Title</label>
                    <Input
                      required
                      placeholder="Give your story a compelling title..."
                      value={newStory.title}
                      onChange={(e) => setNewStory({...newStory, title: e.target.value})}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name</label>
                      <Input
                        required
                        placeholder="Your name (or pen name)"
                        value={newStory.author}
                        onChange={(e) => setNewStory({...newStory, author: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Monastery</label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg"
                        value={newStory.monastery}
                        onChange={(e) => setNewStory({...newStory, monastery: e.target.value})}
                      >
                        <option value="">Select monastery...</option>
                        {monasteryOptions.map(monastery => (
                          <option key={monastery} value={monastery}>{monastery}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Story Type</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      value={newStory.type}
                      onChange={(e) => setNewStory({...newStory, type: e.target.value as any})}
                    >
                      <option value="experience">Personal Experience 🧘</option>
                      <option value="history">Historical Account 📚</option>
                      <option value="photo">Photo Story 📸</option>
                      <option value="ritual">Ritual Description 🕯️</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Story</label>
                    <Textarea
                      required
                      placeholder="Share your monastery experience, cultural insight, or sacred moment..."
                      value={newStory.content}
                      onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                      rows={6}
                      className="resize-none"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {newStory.content.length}/500 characters recommended
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (optional)</label>
                    <Input
                      placeholder="meditation, history, festival... (comma separated)"
                      value={newStory.tags}
                      onChange={(e) => setNewStory({...newStory, tags: e.target.value})}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-sacred"
                    disabled={loading}
                  >
                    {loading ? (
                      <LoadingSpinner size="sm" message="Submitting story..." />
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Submit Story
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-sacred p-6"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getTypeIcon(selectedStory.type)}</span>
                <div>
                  <h3 className="text-2xl font-bold text-sacred">{selectedStory.title}</h3>
                  <div className="flex items-center space-x-3 text-muted-foreground mt-1">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {selectedStory.author}
                      {selectedStory.verified && (
                        <CheckCircle className="w-4 h-4 ml-1 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedStory.monastery}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedStory(null)}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              {getStatusBadge(selectedStory.status)}
              
              <div className="prose max-w-none">
                <p className="text-foreground leading-relaxed text-lg">
                  {selectedStory.content}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedStory.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(selectedStory.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {selectedStory.views} views
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => handleLikeStory(selectedStory.id)}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Like ({selectedStory.likes})
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CommunityStories;