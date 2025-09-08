import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🙏 Welcome! I'm here to help you explore Sikkim's sacred monasteries. Ask me about festival dates, directions, booking queries, or Buddhist traditions!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // AI responses simulation - comprehensive FAQ database
  const botResponses: Record<string, string> = {
    'rumtek': "🏛️ Rumtek Monastery is the seat of the 16th Karmapa, founded in 1962. Visit timings: 6 AM - 6 PM. Best reached by taxi from Gangtok (24km). Entry is free, and photography is allowed in outer areas.",
    'festival': "🎭 Major festivals include Losar (Tibetan New Year, Feb-Mar), Saga Dawa (Buddha's enlightenment, May-Jun), and Bumchu (sacred water ceremony, Mar). Each monastery has specific celebration dates.",
    'booking': "📅 Most monasteries welcome visitors without advance booking. However, for festival participation or special ceremonies, contact the monastery directly. I can help you find contact details!",
    'direction': "🗺️ From Gangtok: Rumtek (24km), Enchey (3km), Do-drul Chorten (1km). Public buses, shared jeeps, and taxis are available. Mountain roads may require experienced drivers.",
    'meditation': "🧘‍♂️ Many monasteries offer meditation sessions. Tashiding and Pemayangtse have regular programs. Best times are early morning (5-7 AM) and evening (6-8 PM). Respectful silence is essential.",
    'photography': "📸 Photography rules vary by monastery. Generally allowed in courtyards and outer areas, but prohibited inside prayer halls during ceremonies. Always ask permission and respect sacred spaces.",
    'accommodation': "🏨 Monastery guesthouses available at Rumtek, Pemayangtse. Simple rooms, vegetarian meals. Alternative: Gangtok hotels (30+ options) or homestays in monastery villages.",
    'transport': "🚗 Options: Taxi (₹15-25/km), shared jeep (₹50-100), local bus (₹20-50). For multiple monasteries, hire full-day taxi (₹2500-4000). Mountain roads, carry motion sickness medicine.",
    'dress code': "👔 Modest clothing required. Cover shoulders and legs. Remove shoes before entering prayer halls. Avoid leather items. Scarves available at most monasteries for covering.",
    'donation': "💰 Donations welcome but not mandatory. Monastery maintenance fund boxes available. Typical amounts: ₹20-100. Your contribution helps preserve cultural heritage.",
    'timing': "⏰ Best visiting hours: 6-10 AM (morning prayers), 4-6 PM (evening prayers). Avoid noon-2 PM (rest time). Festival times may have special extended hours.",
    'language': "🗣️ Most monks speak Hindi and English. Tibetan and Nepali also common. Basic phrases: Tashi Delek (hello), Kahdrinche (thank you). Language barriers rarely an issue.",
    'weather': "🌤️ Best months: October-March (clear skies), April-June (mild), July-September (monsoon, limited visibility). Carry warm clothes even in summer - altitude matters!",
    'sect': "☸️ Four main sects in Sikkim: Nyingma (oldest), Kagyu (most monasteries), Sakya, Gelug. Each has unique practices and traditions. All welcome respectful visitors.",
    'history': "📚 Buddhism reached Sikkim in 8th century. First monastery: Dubdi (1701). Peak period: 18th-19th centuries. Sikkim became India's first Buddhist majority state.",
    'default': "🤔 Great question! I can help with monastery information, festival dates, travel directions, booking guidance, meditation sessions, photography rules, and Buddhist traditions. What specifically interests you?"
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (keyword !== 'default' && lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Default response for unmatched queries
    return botResponses.default;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Chat Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-temple hover:shadow-sacred z-50 flex items-center justify-center transition-sacred hover:scale-105"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { scale: 0 } : { scale: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-card border border-border rounded-xl shadow-sacred z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold">Ask About Monasteries</h3>
                  <p className="text-xs opacity-90">AI-powered monastery guide</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about monasteries, festivals, directions..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button type="submit" size="sm" disabled={!input.trim() || isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;