import { motion } from "framer-motion";
import { Users, Heart, Share, Plus } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container-temple">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-sacred">
            Community Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share and discover inspiring spiritual journeys from fellow practitioners and monastery visitors.
          </p>
        </motion.div>

        <div className="card-monastery text-center">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-2xl font-bold mb-4 text-sacred">Coming Soon</h3>
          <p className="text-muted-foreground mb-6">
            Our community platform is being prepared with love and care. Soon you'll be able to share stories, connect with fellow spiritual seekers, and contribute to preserving Buddhist heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-sacred">
              <Plus className="w-4 h-4 mr-2" />
              Share Your Story
            </button>
            <button className="btn-temple">
              <Heart className="w-4 h-4 mr-2" />
              Join Community
            </button>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Community;