import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Heart, Share, Plus, Send, MapPin, Calendar, Star, Camera, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import monasteriesData from "@/data/monasteries.json";

interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
  monastery: string;
  type: 'experience' | 'history' | 'photo' | 'cultural';
  createdAt: string;
  likes: number;
  views: number;
  verified: boolean;
  images?: string[];
}

const Community = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
    author: '',
    monastery: '',
    type: 'experience' as const
  });

  // Sample pre-loaded stories
  const sampleStories: Story[] = [
    {
      id: 'story-1',
      title: 'My First Visit to Rumtek Monastery',
      content: 'Growing up in Gangtok, I remember my grandmother taking me to Rumtek for the first time during Losar. The sound of the horns echoing across the valley, the colorful prayer flags dancing in the mountain breeze, and the peaceful faces of the monks left an indelible mark on my young heart. That visit changed my understanding of spirituality and connected me deeply to our Sikkimese heritage.',
      author: 'Pemba Sherpa',
      monastery: 'Rumtek Monastery',
      type: 'experience',
      createdAt: '2024-01-15T10:30:00Z',
      likes: 23,
      views: 156,
      verified: true,
      images: ['/assets/stories/rumtek-first-visit.jpg']
    },
    {
      id: 'story-2',
      title: 'The Legend of Tashiding\'s Sacred Water',
      content: 'Local elders tell the story of how Guru Rinpoche blessed the waters of Tashiding, making it one of the holiest sites in Sikkim. During the Bumchu festival, when the sacred pot is opened, the water level predicts our state\'s fortune. I\'ve witnessed this ceremony for over 40 years, and the accuracy of these predictions never ceases to amaze me.',
      author: 'Tenzin Lama',
      monastery: 'Tashiding Monastery', 
      type: 'history',
      createdAt: '2024-01-10T15:45:00Z',
      likes: 18,
      views: 94,
      verified: true
    },
    {
      id: 'story-3',
      title: 'Sunrise Meditation at Pemayangtse',
      content: 'Waking up at 4 AM for morning prayers at Pemayangtse, I experienced the most profound sunrise of my life. The monastery, perched on a hilltop, offers an unobstructed view of Kanchenjunga. As the first rays of sunlight touched the snow-capped peaks, the monks began their morning chants. It felt like heaven on earth.',
      author: 'Sarah Mitchell',
      monastery: 'Pemayangtse Monastery',
      type: 'experience',
      createdAt: '2024-01-08T08:20:00Z',
      likes: 31,
      views: 203,
      verified: false
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const savedStories = JSON.parse(localStorage.getItem('communityStories') || '[]');
      setStories([...sampleStories, ...savedStories]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.title || !newStory.content || !newStory.monastery) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const story: Story = {
      id: `story-${Date.now()}`,
      ...newStory,
      createdAt: new Date().toISOString(),
      likes: 0,
      views: 0,
      verified: false
    };
    
    const updatedStories = [story, ...stories];
    setStories(updatedStories);
    
    // Save to localStorage
    const userStories = updatedStories.filter(s => !sampleStories.find(ss => ss.id === s.id));
    localStorage.setItem('communityStories', JSON.stringify(userStories));
    
    // Reset form
    setNewStory({ title: '', content: '', author: '', monastery: '', type: 'experience' });
    setShowForm(false);
    setSubmitting(false);
    
    // Success message
    alert('Story shared successfully! 🎉 Thank you for contributing to our community.');
  };

  const handleLike = (storyId: string) => {
    setStories(prevStories => 
      prevStories.map(story => 
        story.id === storyId 
          ? { ...story, likes: story.likes + 1 }
          : story
      )
    );
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
          <p className="text-muted-foreground">Loading community stories...</p>
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
            Community Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Share and discover inspiring spiritual journeys from fellow practitioners and monastery visitors.
          </p>
          
          <div className="inline-flex items-center bg-muted rounded-full px-6 py-3 mb-8">
            <Users className="w-5 h-5 mr-3 text-primary" />
            <span className="font-semibold text-primary">{stories.length} Stories</span>
            <span className="mx-2">•</span>
            <span className="text-muted-foreground">{stories.filter(s => s.verified).length} Verified</span>
          </div>

          <Button 
            onClick={() => setShowForm(!showForm)}
            className="btn-sacred"
          >
            <Plus className="w-4 h-4 mr-2" />
            Share Your Story
          </Button>
        </motion.div>

        {/* Story Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12"
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-sacred">Share Your Experience</h2>
              
              <form onSubmit={handleSubmitStory} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Story Title *</label>
                    <input
                      type="text"
                      value={newStory.title}
                      onChange={(e) => setNewStory({...newStory, title: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Give your story a meaningful title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name (optional)</label>
                    <input
                      type="text"
                      value={newStory.author}
                      onChange={(e) => setNewStory({...newStory, author: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="How should we credit you?"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Monastery *</label>
                    <select
                      value={newStory.monastery}
                      onChange={(e) => setNewStory({...newStory, monastery: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select Monastery</option>
                      {monasteriesData.map((monastery: any) => (
                        <option key={monastery.id} value={monastery.name}>
                          {monastery.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Story Type</label>
                    <select
                      value={newStory.type}
                      onChange={(e) => setNewStory({...newStory, type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="experience">Personal Experience</option>
                      <option value="history">Historical Account</option>
                      <option value="photo">Photo Story</option>
                      <option value="cultural">Cultural Insight</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Story *</label>
                  <textarea
                    value={newStory.content}
                    onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Share your experience, cultural insight, or historical knowledge about the monastery..."
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="btn-sacred"
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sharing Story...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Share Story
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant={story.type === 'experience' ? 'default' : 'secondary'}>
                    {story.type}
                  </Badge>
                  {story.verified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      ✓ Verified Local
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-2 text-sacred">{story.title}</h3>
                
                <p className="text-sm text-muted-foreground mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {story.monastery}
                </p>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-4">
                  {story.content}
                </p>

                <div className="border-t border-border pt-4 mt-auto">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <span className="font-medium">{story.author || 'Anonymous'}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {story.views}
                      </span>
                      <button 
                        onClick={() => handleLike(story.id)}
                        className="flex items-center hover:text-primary transition-colors"
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        {story.likes}
                      </button>
                    </div>
                    
                    <Button size="sm" variant="ghost">
                      Read More
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {stories.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-2xl font-bold mb-4 text-muted-foreground">No stories yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to share your monastery experience with the community
            </p>
            <Button onClick={() => setShowForm(true)} className="btn-temple">
              <Plus className="w-4 h-4 mr-2" />
              Share First Story
            </Button>
          </motion.div>
        )}
      </div>
      
      {/* Bottom spacer for mobile navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Community;