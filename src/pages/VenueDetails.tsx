import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, DollarSign, Heart, Camera, Car, Coffee, Music, Wifi, Camera as CameraIcon } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ballroomImage from "@/assets/ballroom-venue.jpg";
import gardenImage from "@/assets/garden-venue.jpg";
import historicImage from "@/assets/historic-venue.jpg";
import beachImage from "@/assets/beach-venue.jpg";

const VenueDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const venues = {
    "1": {
      name: "The Grand Ballroom",
      location: "Downtown District",
      capacity: "150-200",
      price: "$8,000",
      rating: 4.8,
      image: ballroomImage,
      availability: "Available",
      description: "Elegant ballroom with crystal chandeliers and marble floors. Perfect for luxurious wedding celebrations with a classic, timeless atmosphere.",
      features: ["Catering", "Parking", "Bar", "Dance Floor"],
      amenities: [
        { icon: Coffee, name: "Catering Kitchen" },
        { icon: Car, name: "Valet Parking" },
        { icon: Music, name: "Sound System" },
        { icon: Wifi, name: "Free WiFi" },
        { icon: CameraIcon, name: "Photo Spots" }
      ],
      gallery: [ballroomImage, ballroomImage, ballroomImage],
      contact: {
        phone: "(555) 123-4567",
        email: "info@grandballroom.com",
        manager: "Sarah Johnson"
      }
    },
    "2": {
      name: "Garden Paradise",
      location: "Riverside",
      capacity: "100-150",
      price: "$6,500",
      rating: 4.6,
      image: gardenImage,
      availability: "Limited",
      description: "Beautiful outdoor garden venue with scenic river views and natural landscaping.",
      features: ["Garden", "Outdoor", "Photography", "Bridal Suite"],
      amenities: [
        { icon: Coffee, name: "Outdoor Catering" },
        { icon: Car, name: "Guest Parking" },
        { icon: Music, name: "Acoustic Stage" },
        { icon: CameraIcon, name: "Natural Lighting" }
      ],
      gallery: [gardenImage, gardenImage, gardenImage],
      contact: {
        phone: "(555) 234-5678",
        email: "events@gardenparadise.com",
        manager: "Mike Wilson"
      }
    },
    "3": {
      name: "Historic Manor",
      location: "Old Town",
      capacity: "80-120",
      price: "$7,200",
      rating: 4.9,
      image: historicImage,
      availability: "Available",
      description: "Charming historic venue with vintage architecture and timeless elegance.",
      features: ["Historic", "Elegant", "Photography", "Catering"],
      amenities: [
        { icon: Coffee, name: "Full Catering" },
        { icon: Car, name: "Historic Parking" },
        { icon: Music, name: "Grand Piano" },
        { icon: CameraIcon, name: "Period Details" }
      ],
      gallery: [historicImage, historicImage, historicImage],
      contact: {
        phone: "(555) 345-6789",
        email: "bookings@historicmanor.com",
        manager: "Emma Davis"
      }
    },
    "4": {
      name: "Beachside Resort",
      location: "Coastal Area",
      capacity: "200-300",
      price: "$12,000",
      rating: 4.7,
      image: beachImage,
      availability: "Booked",
      description: "Luxury beachfront resort with stunning ocean views and all-inclusive packages.",
      features: ["Beach", "Resort", "All-Inclusive", "Ocean View"],
      amenities: [
        { icon: Coffee, name: "Resort Dining" },
        { icon: Car, name: "Resort Parking" },
        { icon: Music, name: "Beach Sound" },
        { icon: CameraIcon, name: "Ocean Views" }
      ],
      gallery: [beachImage, beachImage, beachImage],
      contact: {
        phone: "(555) 456-7890",
        email: "weddings@beachresort.com",
        manager: "John Smith"
      }
    }
  };

  const venue = venues[id as keyof typeof venues];

  if (!venue) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Venue not found</h1>
            <Button asChild className="mt-4">
              <Link to="/venues">Back to Venues</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          {/* Back button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/venues">← Back to Venues</Link>
          </Button>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <img 
                src={venue.image} 
                alt={venue.name}
                className="w-full h-96 object-cover rounded-2xl shadow-elegant"
              />
              <div className="grid grid-cols-3 gap-2">
                {venue.gallery.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`${venue.name} gallery ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
                      {venue.name}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{venue.location}</span>
                    </div>
                  </div>
                  <Badge className={getAvailabilityColor(venue.availability)}>
                    {venue.availability}
                  </Badge>
                </div>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {venue.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{venue.capacity} guests</div>
                      <div className="text-sm text-muted-foreground">Capacity</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{venue.price}</div>
                      <div className="text-sm text-muted-foreground">Starting price</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <div>
                      <div className="font-semibold">{venue.rating} rating</div>
                      <div className="text-sm text-muted-foreground">Guest reviews</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{venue.availability}</div>
                      <div className="text-sm text-muted-foreground">Availability</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="romantic" 
                    className="flex-1"
                    disabled={venue.availability === 'Booked'}
                    asChild
                  >
                    {venue.availability === 'Booked' ? (
                      <span>Unavailable</span>
                    ) : (
                      <Link to={`/venues/${id}/booking`}>Book This Venue</Link>
                    )}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => toast({
                      title: "Added to Favorites",
                      description: `${venue.name} has been added to your favorites.`,
                    })}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features and Amenities */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-card/50 backdrop-blur border-accent">
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>What's included with this venue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {venue.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-accent">
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
                <CardDescription>Additional services and facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {venue.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <amenity.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="bg-card/50 backdrop-blur border-accent">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Get in touch to learn more or schedule a visit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Venue Manager</h4>
                  <p className="text-muted-foreground">{venue.contact.manager}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Phone</h4>
                  <p className="text-muted-foreground">{venue.contact.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-muted-foreground">{venue.contact.email}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button 
                  onClick={() => {
                    window.open(`tel:${venue.contact.phone}`, '_self');
                    toast({
                      title: "Opening dialer...",
                      description: `Calling ${venue.contact.manager} at ${venue.contact.phone}`,
                    });
                  }}
                >
                  Call Now
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast({
                    title: "Email sent!",
                    description: "Your inquiry has been sent to the venue.",
                  })}
                >
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;