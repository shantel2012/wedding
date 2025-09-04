import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, MapPin, Users, DollarSign } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { format } from "date-fns";
import ballroomImage from "@/assets/ballroom-venue.jpg";
import gardenImage from "@/assets/garden-venue.jpg";
import historicImage from "@/assets/historic-venue.jpg";
import beachImage from "@/assets/beach-venue.jpg";

const VenueBooking = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    contactName: "",
    email: "",
    phone: "",
    guestCount: "",
    eventType: "",
    specialRequests: "",
    catering: false,
    photography: false,
    decoration: false,
    transportation: false
  });

  const venues = {
    "1": {
      name: "The Grand Ballroom",
      location: "Downtown District",
      capacity: "150-200",
      price: "$8,000",
      image: ballroomImage,
      packages: [
        { name: "Essential", price: 8000, features: ["Venue rental", "Basic lighting", "Tables & chairs"] },
        { name: "Premium", price: 12000, features: ["Everything in Essential", "Catering service", "Professional photography"] },
        { name: "Luxury", price: 18000, features: ["Everything in Premium", "Floral arrangements", "Live music", "Transportation"] }
      ]
    },
    "2": {
      name: "Garden Paradise",
      location: "Riverside",
      capacity: "100-150",
      price: "$6,500",
      image: gardenImage,
      packages: [
        { name: "Garden Basic", price: 6500, features: ["Garden venue", "Natural lighting", "Rustic seating"] },
        { name: "Garden Premium", price: 9500, features: ["Everything in Basic", "Outdoor catering", "Photo session"] },
        { name: "Garden Luxury", price: 14000, features: ["Everything in Premium", "Floral archway", "String lights", "Bridal suite"] }
      ]
    },
    "3": {
      name: "Historic Manor",
      location: "Old Town",
      capacity: "80-120",
      price: "$7,200",
      image: historicImage,
      packages: [
        { name: "Historic Classic", price: 7200, features: ["Manor venue", "Vintage decor", "Period furniture"] },
        { name: "Historic Elegant", price: 11000, features: ["Everything in Classic", "Fine dining", "Historic tour"] },
        { name: "Historic Royal", price: 16500, features: ["Everything in Elegant", "Butler service", "Antique carriage", "Royal treatment"] }
      ]
    },
    "4": {
      name: "Beachside Resort",
      location: "Coastal Area",
      capacity: "200-300",
      price: "$12,000",
      image: beachImage,
      packages: [
        { name: "Beach Ceremony", price: 12000, features: ["Beach venue", "Ocean view", "Basic setup"] },
        { name: "Resort Package", price: 18000, features: ["Everything in Ceremony", "Resort amenities", "Seaside dining"] },
        { name: "Ultimate Beach", price: 25000, features: ["Everything in Resort", "Yacht experience", "Sunset cruise", "Beachside spa"] }
      ]
    }
  };

  const venue = venues[id as keyof typeof venues];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Submitted!",
      description: `Your booking request for ${venue?.name} has been submitted. We'll contact you within 24 hours.`,
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to={`/venues/${id}`}>← Back to Venue Details</Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Venue Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-card/50 backdrop-blur border-accent sticky top-24">
                <CardContent className="p-0">
                  <img 
                    src={venue.image} 
                    alt={venue.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h2 className="font-serif text-2xl font-bold mb-2">{venue.name}</h2>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{venue.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{venue.capacity} guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Starting at {venue.price}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50 backdrop-blur border-accent">
                <CardHeader>
                  <CardTitle>Booking Information</CardTitle>
                  <CardDescription>Fill out the details for your event booking</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name</Label>
                        <Input 
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) => handleInputChange('contactName', e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guestCount">Expected Guest Count</Label>
                        <Input 
                          id="guestCount"
                          type="number"
                          value={formData.guestCount}
                          onChange={(e) => handleInputChange('guestCount', e.target.value)}
                          placeholder="100"
                          required
                        />
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Event Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventType">Event Type</Label>
                        <Select onValueChange={(value) => handleInputChange('eventType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="reception">Reception</SelectItem>
                            <SelectItem value="engagement">Engagement Party</SelectItem>
                            <SelectItem value="anniversary">Anniversary</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Additional Services */}
                    <div className="space-y-4">
                      <Label>Additional Services</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="catering"
                            checked={formData.catering}
                            onCheckedChange={(checked) => handleInputChange('catering', !!checked)}
                          />
                          <Label htmlFor="catering">Catering Service</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="photography"
                            checked={formData.photography}
                            onCheckedChange={(checked) => handleInputChange('photography', !!checked)}
                          />
                          <Label htmlFor="photography">Photography</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="decoration"
                            checked={formData.decoration}
                            onCheckedChange={(checked) => handleInputChange('decoration', !!checked)}
                          />
                          <Label htmlFor="decoration">Decoration Service</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="transportation"
                            checked={formData.transportation}
                            onCheckedChange={(checked) => handleInputChange('transportation', !!checked)}
                          />
                          <Label htmlFor="transportation">Transportation</Label>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea 
                        id="specialRequests"
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        placeholder="Any special requirements or requests for your event..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" variant="romantic" className="w-full">
                      Submit Booking Request
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Package Options */}
              <Card className="bg-card/50 backdrop-blur border-accent">
                <CardHeader>
                  <CardTitle>Package Options</CardTitle>
                  <CardDescription>Choose from our curated packages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {venue.packages.map((pkg, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg mb-2">{pkg.name}</h3>
                        <p className="text-2xl font-bold text-primary mb-3">
                          ${pkg.price.toLocaleString()}
                        </p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {pkg.features.map((feature, fIndex) => (
                            <li key={fIndex}>• {feature}</li>
                          ))}
                        </ul>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-4"
                          onClick={() => toast({
                            title: "Package Selected",
                            description: `${pkg.name} package has been added to your booking request.`,
                          })}
                        >
                          Select Package
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueBooking;