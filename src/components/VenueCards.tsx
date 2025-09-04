import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const VenueCards = () => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<{[key: number]: boolean}>({
    1: true,
    2: false,
    3: false
  });

  const handleFavoriteToggle = (venueId: number, venueName: string) => {
    setFavorites(prev => ({...prev, [venueId]: !prev[venueId]}));
    toast({
      title: favorites[venueId] ? "Removed from favorites" : "Added to favorites",
      description: `${venueName} has been ${favorites[venueId] ? 'removed from' : 'added to'} your favorites.`,
    });
  };
  const venues = [
    {
      id: 1,
      name: "Garden Rose Manor",
      location: "Napa Valley, CA",
      price: "$8,000",
      rating: 4.9,
      capacity: "150 guests",
      image: "photo-1473177104440-ffee2f376098",
      features: ["Garden Ceremony", "Reception Hall", "Bridal Suite"],
      favorite: true
    },
    {
      id: 2,
      name: "Oceanside Pavilion",
      location: "Monterey Bay, CA",
      price: "$6,500",
      rating: 4.7,
      capacity: "120 guests", 
      image: "photo-1649972904349-6e44c42644a7",
      features: ["Ocean Views", "Beach Access", "Catering Kitchen"],
      favorite: false
    },
    {
      id: 3,
      name: "Historic Estate",
      location: "Sonoma, CA",
      price: "$9,200",
      rating: 4.8,
      capacity: "200 guests",
      image: "photo-1721322800607-8c38375eef04",
      features: ["Vintage Charm", "Wine Cellar", "Grand Ballroom"],
      favorite: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-foreground">Dream Venues</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/venues">View All</Link>
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <Card key={venue.id} className="group hover:shadow-romantic transition-all duration-300 border-border/50 overflow-hidden">
            <div className="relative">
              <img 
                src={`https://images.unsplash.com/${venue.image}?w=400&h=250&fit=crop`}
                alt={venue.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleFavoriteToggle(venue.id, venue.name)}
                className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 ${favorites[venue.id] ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <Heart className={`h-4 w-4 ${favorites[venue.id] ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {venue.name}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {venue.location}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium ml-1">{venue.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-3 w-3 mr-1" />
                      {venue.capacity}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-primary">{venue.price}</div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {venue.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <Button variant="romantic" className="w-full" asChild>
                  <Link to={`/venues/${venue.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VenueCards;