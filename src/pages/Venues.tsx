import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Users, Star, Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ballroomImage from "@/assets/ballroom-venue.jpg";
import gardenImage from "@/assets/garden-venue.jpg";
import historicImage from "@/assets/historic-venue.jpg";
import beachImage from "@/assets/beach-venue.jpg";

const Venues = () => {
  const { toast } = useToast();
  const venues = [
    {
      name: "The Grand Ballroom",
      location: "Downtown District",
      capacity: "150-200",
      price: "$8,000",
      rating: 4.8,
      image: ballroomImage,
      features: ["Catering", "Parking", "Bar", "Dance Floor"],
      availability: "Available",
      description: "Elegant ballroom with crystal chandeliers and marble floors"
    },
    {
      name: "Garden Paradise",
      location: "Riverside",
      capacity: "100-150",
      price: "$6,500",
      rating: 4.6,
      image: gardenImage,
      features: ["Garden", "Outdoor", "Photography", "Bridal Suite"],
      availability: "Limited",
      description: "Beautiful outdoor garden venue with scenic river views"
    },
    {
      name: "Historic Manor",
      location: "Old Town",
      capacity: "80-120",
      price: "$7,200",
      rating: 4.9,
      image: historicImage,
      features: ["Historic", "Elegant", "Photography", "Catering"],
      availability: "Available",
      description: "Charming historic venue with vintage architecture"
    },
    {
      name: "Beachside Resort",
      location: "Coastal Area",
      capacity: "200-300",
      price: "$12,000",
      rating: 4.7,
      image: beachImage,
      features: ["Beach", "Resort", "All-Inclusive", "Ocean View"],
      availability: "Booked",
      description: "Luxury beachfront resort with stunning ocean views"
    }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Limited': return 'bg-yellow-100 text-yellow-800';
      case 'Booked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Wedding Venues
            </h1>
            <p className="text-xl text-muted-foreground">
              Find the perfect venue for your special day
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {venues.map((venue, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur border-accent overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={venue.image} 
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{venue.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{venue.location}</span>
                      </div>
                    </div>
                    <Badge className={getAvailabilityColor(venue.availability)}>
                      {venue.availability}
                    </Badge>
                  </div>
                  <CardDescription>{venue.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{venue.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>{venue.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{venue.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Book now</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {venue.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          Quick View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{venue.name}</DialogTitle>
                          <DialogDescription>{venue.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <img 
                            src={venue.image} 
                            alt={venue.name}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Venue Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{venue.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span>{venue.capacity} guests</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                                  <span>{venue.price}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  <span>{venue.rating} rating</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Features</h4>
                              <div className="flex flex-wrap gap-2">
                                {venue.features.map((feature, featureIndex) => (
                                  <Badge key={featureIndex} variant="secondary" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" asChild className="flex-1">
                            <Link to={`/venues/${index + 1}`}>Full Details</Link>
                          </Button>
                          <Button 
                            variant="romantic" 
                            asChild
                            className="flex-1"
                            disabled={venue.availability === 'Booked'}
                          >
                            {venue.availability === 'Booked' ? (
                              <span>Unavailable</span>
                            ) : (
                              <Link to={`/venues/${index + 1}/booking`}>Book Now</Link>
                            )}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="romantic" 
                      className="flex-1"
                      disabled={venue.availability === 'Booked'}
                      asChild
                    >
                      {venue.availability === 'Booked' ? (
                        <span>Unavailable</span>
                      ) : (
                        <Link to={`/venues/${index + 1}/booking`}>Book Tour</Link>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venues;