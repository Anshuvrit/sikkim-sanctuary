import { motion } from "framer-motion";
import { BookOpen, Search, Download } from "lucide-react";

const Manuscripts = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container-temple">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-sacred">
            Sacred Manuscripts Archive
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore precious Buddhist texts and ancient manuscripts preserved in Sikkim's monasteries.
          </p>
        </motion.div>

        <div className="card-monastery text-center">
          <div className="text-6xl mb-4">📜</div>
          <h3 className="text-2xl font-bold mb-4 text-sacred">Digital Archive Coming Soon</h3>
          <p className="text-muted-foreground mb-6">
            We're carefully digitizing ancient manuscripts and sacred texts to make them accessible while preserving their sanctity. This collection will include rare Buddhist texts, prayer collections, and historical chronicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-sacred">
              <Search className="w-4 h-4 mr-2" />
              Explore Collection
            </button>
            <button className="btn-temple">
              <Download className="w-4 h-4 mr-2" />
              Request Access
            </button>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Manuscripts;