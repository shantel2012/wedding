import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Guests from "./pages/Guests";
import Timeline from "./pages/Timeline";
import Budget from "./pages/Budget";
import Venues from "./pages/Venues";
import VenueDetails from "./pages/VenueDetails";
import VenueBooking from "./pages/VenueBooking";
import Tasks from "./pages/Tasks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/venues/:id/booking" element={<VenueBooking />} />
          <Route path="/tasks" element={<Tasks />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
