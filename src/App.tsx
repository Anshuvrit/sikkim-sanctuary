import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import Monasteries from "@/pages/Monasteries";
import MonasteryDetail from "@/pages/MonasteryDetail";
import Festivals from "@/pages/Festivals";
import Community from "@/pages/Community";
import Manuscripts from "@/pages/Manuscripts";
import Map from "@/pages/Map";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monasteries" element={<Monasteries />} />
            <Route path="/monasteries/:id" element={<MonasteryDetail />} />
            <Route path="/festivals" element={<Festivals />} />
            <Route path="/community" element={<Community />} />
            <Route path="/manuscripts" element={<Manuscripts />} />
            <Route path="/map" element={<Map />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;