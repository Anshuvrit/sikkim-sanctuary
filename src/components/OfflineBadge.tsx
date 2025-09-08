import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OfflineBadge = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const simulateOfflineDownload = async () => {
    setIsDownloading(true);
    
    // Simulate download progress
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsDownloading(false);
    setDownloadComplete(true);
    
    // Reset after showing success
    setTimeout(() => {
      setDownloadComplete(false);
      setShowModal(false);
    }, 2000);
  };

  return (
    <>
      {/* Offline Ready Badge */}
      <motion.button
        onClick={() => setShowModal(true)}
        className="fixed top-20 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-temple hover:shadow-sacred transition-all text-sm font-medium z-40 flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Wifi className="w-4 h-4" />
        <span>Offline Ready!</span>
      </motion.button>

      {/* Offline Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-card border border-border rounded-xl p-8 max-w-md w-full shadow-sacred"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {downloadComplete ? (
                    <Check className="w-8 h-8 text-primary" />
                  ) : (
                    <WifiOff className="w-8 h-8 text-primary" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-primary mb-4">
                  {downloadComplete ? 'Ready for Offline Use!' : 'Works Offline!'}
                </h3>

                {!downloadComplete ? (
                  <>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      This platform works even in remote monastery locations without internet. 
                      Download essential content for your spiritual journey!
                    </p>

                    <div className="space-y-3 mb-6 text-left">
                      <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Monastery locations & details</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Festival dates & information</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Audio guides & translations</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Cultural stories & manuscripts</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowModal(false)}
                        className="flex-1"
                        disabled={isDownloading}
                      >
                        Maybe Later
                      </Button>
                      <Button
                        onClick={simulateOfflineDownload}
                        disabled={isDownloading}
                        className="flex-1 btn-sacred"
                      >
                        {isDownloading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            <span>Downloading...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Download className="w-4 h-4" />
                            <span>Download (2.3 MB)</span>
                          </div>
                        )}
                      </Button>
                    </div>

                    {isDownloading && (
                      <div className="mt-4">
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className="bg-primary h-2 rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3, ease: 'easeOut' }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Preparing offline content for remote areas...
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground mb-6">
                      🎉 Perfect! You can now explore monasteries even without internet connection. 
                      All essential features are available offline.
                    </p>

                    <div className="space-y-2 mb-6 text-left">
                      <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded-lg">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Monastery locations cached</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded-lg">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Festival calendar downloaded</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded-lg">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Audio guides available</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded-lg">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Cultural content ready</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      The app will automatically sync new content when you're back online.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OfflineBadge;