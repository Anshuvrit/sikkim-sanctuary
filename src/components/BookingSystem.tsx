import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Car, MapPin, Clock, CreditCard, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface BookingData {
  date: string;
  visitors: number;
  guide: boolean;
  transport: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface BookingSystemProps {
  monasteryId: string;
  monasteryName: string;
  nearestTown: string;
}

const BookingSystem = ({ monasteryId, monasteryName, nearestTown }: BookingSystemProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    date: '',
    visitors: 1,
    guide: false,
    transport: '',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [bookingId, setBookingId] = useState<string | null>(null);

  const transportOptions = [
    { id: 'taxi', name: 'Private Taxi', price: 2500, description: 'Direct pickup and drop' },
    { id: 'shared', name: 'Shared Jeep', price: 500, description: 'Shared with other travelers' },
    { id: 'bus', name: 'Public Bus', price: 150, description: 'Most economical option' },
    { id: 'own', name: 'Own Vehicle', price: 0, description: 'Self-drive or own transport' }
  ];

  const guidePackages = [
    { id: 'basic', name: 'Basic Guide', price: 800, description: 'English/Hindi speaking guide' },
    { id: 'premium', name: 'Cultural Expert', price: 1500, description: 'Specialized Buddhist culture guide' },
    { id: 'none', name: 'Self-Guided', price: 0, description: 'Explore at your own pace' }
  ];

  const calculateTotal = () => {
    let total = 0;
    
    // Transport cost
    const transport = transportOptions.find(t => t.id === bookingData.transport);
    if (transport) total += transport.price;
    
    // Guide cost
    if (bookingData.guide) {
      total += 800; // Basic guide price
    }
    
    // Group size multiplier for guide
    if (bookingData.guide && bookingData.visitors > 1) {
      total += (bookingData.visitors - 1) * 200;
    }
    
    return total;
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const submitBooking = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate booking ID
    const newBookingId = `BK${Date.now().toString().slice(-6)}`;
    setBookingId(newBookingId);
    
    // Store in localStorage for demo persistence
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      id: newBookingId,
      monasteryId,
      monasteryName,
      ...bookingData,
      total: calculateTotal(),
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    setLoading(false);
    setStep(5); // Confirmation step
  };

  const steps = [
    { id: 1, title: 'Visit Details', icon: Calendar },
    { id: 2, title: 'Transport & Guide', icon: Car },
    { id: 3, title: 'Personal Info', icon: Users },
    { id: 4, title: 'Review & Pay', icon: CreditCard },
    { id: 5, title: 'Confirmation', icon: Check }
  ];

  if (step === 5) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-xl shadow-soft p-8 text-center"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-sacred mb-4">Booking Confirmed!</h3>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <p className="text-lg font-semibold text-primary mb-2">Booking ID: {bookingId}</p>
          <p className="text-muted-foreground">
            Your visit to {monasteryName} is confirmed for {bookingData.date}
          </p>
        </div>

        <div className="space-y-3 text-sm text-left max-w-md mx-auto mb-6">
          <div className="flex justify-between">
            <span>Visitors:</span>
            <span className="font-medium">{bookingData.visitors}</span>
          </div>
          <div className="flex justify-between">
            <span>Transport:</span>
            <span className="font-medium">
              {transportOptions.find(t => t.id === bookingData.transport)?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Guide:</span>
            <span className="font-medium">{bookingData.guide ? 'Yes' : 'No'}</span>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between font-bold text-primary">
            <span>Total:</span>
            <span>₹{calculateTotal()}</span>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-2 flex items-center text-blue-600 dark:text-blue-400">
            <AlertCircle className="w-4 h-4 mr-2" />
            What's Next?
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Confirmation email sent to {bookingData.email}</li>
            <li>• Guide will contact you 24 hours before visit</li>
            <li>• Carry valid ID for monastery entry</li>
            <li>• Arrive 15 minutes before scheduled time</li>
          </ul>
        </div>

        <Button 
          onClick={() => {
            setStep(1);
            setBookingId(null);
            setBookingData({
              date: '', visitors: 1, guide: false, transport: '',
              name: '', email: '', phone: '', specialRequests: ''
            });
          }}
          className="btn-temple"
        >
          Book Another Visit
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-soft overflow-hidden">
      {/* Progress Header */}
      <div className="bg-gradient-sunset text-white p-6">
        <h3 className="text-xl font-bold mb-4">Book Your Visit</h3>
        <div className="flex items-center justify-between">
          {steps.slice(0, 4).map((s) => {
            const StepIcon = s.icon;
            return (
              <div key={s.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= s.id ? 'bg-white text-primary' : 'bg-white/30 text-white/70'
                }`}>
                  <StepIcon className="w-4 h-4" />
                </div>
                {s.id < 4 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    step > s.id ? 'bg-white' : 'bg-white/30'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Visit Details */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-lg font-semibold mb-4 text-sacred">Visit Details</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Visit Date</label>
                  <Input
                    type="date"
                    value={bookingData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Visitors</label>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setBookingData({
                        ...bookingData, 
                        visitors: Math.max(1, bookingData.visitors - 1)
                      })}
                      disabled={bookingData.visitors <= 1}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{bookingData.visitors}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setBookingData({
                        ...bookingData, 
                        visitors: Math.min(10, bookingData.visitors + 1)
                      })}
                      disabled={bookingData.visitors >= 10}
                    >
                      +
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Maximum 10 visitors per booking</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium">{monasteryName}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nearest town: {nearestTown}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={nextStep} 
                disabled={!bookingData.date || bookingData.visitors < 1}
                className="btn-sacred"
              >
                Next Step
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Transport & Guide */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-lg font-semibold mb-4 text-sacred">Transport & Guide Options</h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">Transportation</label>
                  <div className="grid gap-3">
                    {transportOptions.map((transport) => (
                      <label
                        key={transport.id}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                          bookingData.transport === transport.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="transport"
                            value={transport.id}
                            checked={bookingData.transport === transport.id}
                            onChange={(e) => setBookingData({...bookingData, transport: e.target.value})}
                            className="text-primary"
                          />
                          <div>
                            <div className="font-medium">{transport.name}</div>
                            <div className="text-sm text-muted-foreground">{transport.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-primary">
                            {transport.price === 0 ? 'Free' : `₹${transport.price}`}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Guide Service</label>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={bookingData.guide}
                          onChange={(e) => setBookingData({...bookingData, guide: e.target.checked})}
                          className="text-primary"
                        />
                        <div>
                          <div className="font-medium">Local Guide Service</div>
                          <div className="text-sm text-muted-foreground">
                            English/Hindi speaking cultural guide
                          </div>
                        </div>
                      </div>
                      <div className="text-primary font-semibold">₹800</div>
                    </label>
                    {bookingData.guide && bookingData.visitors > 1 && (
                      <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                        Additional ₹200 per extra visitor for group guide service
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button onClick={prevStep} variant="outline">
                Previous
              </Button>
              <Button 
                onClick={nextStep}
                disabled={!bookingData.transport}
                className="btn-sacred"
              >
                Next Step
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Personal Information */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-lg font-semibold mb-4 text-sacred">Contact Information</h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <Input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests</label>
                  <Input
                    type="text"
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                    placeholder="Any special requirements"
                  />
                </div>
              </div>

              <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Guidelines</h5>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Carry valid photo ID for monastery entry</li>
                  <li>• Dress modestly (full sleeves and pants recommended)</li>
                  <li>• Photography may be restricted in prayer halls</li>
                  <li>• Remove shoes before entering sacred areas</li>
                  <li>• Maintain silence during prayer sessions</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between">
              <Button onClick={prevStep} variant="outline">
                Previous
              </Button>
              <Button 
                onClick={nextStep}
                disabled={!bookingData.name || !bookingData.email || !bookingData.phone}
                className="btn-sacred"
              >
                Review Booking
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Review & Payment */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-lg font-semibold mb-4 text-sacred">Review Your Booking</h4>

              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <h5 className="font-semibold mb-3">Visit Summary</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monastery:</span>
                    <span className="font-medium">{monasteryName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Visitors:</span>
                    <span className="font-medium">{bookingData.visitors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact:</span>
                    <span className="font-medium">{bookingData.name}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h5 className="font-semibold mb-3">Cost Breakdown</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Transportation ({transportOptions.find(t => t.id === bookingData.transport)?.name}):</span>
                    <span>₹{transportOptions.find(t => t.id === bookingData.transport)?.price || 0}</span>
                  </div>
                  {bookingData.guide && (
                    <>
                      <div className="flex justify-between">
                        <span>Guide Service:</span>
                        <span>₹800</span>
                      </div>
                      {bookingData.visitors > 1 && (
                        <div className="flex justify-between">
                          <span>Additional visitors ({bookingData.visitors - 1}):</span>
                          <span>₹{(bookingData.visitors - 1) * 200}</span>
                        </div>
                      )}
                    </>
                  )}
                  <hr className="border-border" />
                  <div className="flex justify-between font-bold text-lg text-primary">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              {/* Simulated Payment Options */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4">
                <h5 className="font-semibold mb-3 text-foreground">Payment Method</h5>
                <div className="flex gap-3">
                  <Badge variant="outline" className="bg-white">UPI</Badge>
                  <Badge variant="outline" className="bg-white">Card</Badge>
                  <Badge variant="outline" className="bg-white">Net Banking</Badge>
                  <Badge variant="outline" className="bg-white">Pay at Venue</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Demo mode: No actual payment will be processed
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button onClick={prevStep} variant="outline">
                Previous
              </Button>
              <Button 
                onClick={submitBooking}
                disabled={loading}
                className="btn-sacred"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookingSystem;