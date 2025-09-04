import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Users, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import guestsImage from "@/assets/wedding-guests.jpg";

const Guests = () => {
  const { toast } = useToast();
  const [newGuest, setNewGuest] = useState({ name: "", email: "", phone: "" });

  const handleAddGuest = () => {
    if (newGuest.name && newGuest.email) {
      toast({
        title: "Guest Added!",
        description: `${newGuest.name} has been added to your guest list.`,
      });
      setNewGuest({ name: "", email: "", phone: "" });
    } else {
      toast({
        title: "Missing Information",
        description: "Please enter at least name and email for the guest.",
        variant: "destructive",
      });
    }
  };
  const guests = [
    { name: "Sarah Johnson", email: "sarah@email.com", phone: "+1 234-567-8901", status: "Confirmed" },
    { name: "Mike Smith", email: "mike@email.com", phone: "+1 234-567-8902", status: "Pending" },
    { name: "Emma Davis", email: "emma@email.com", phone: "+1 234-567-8903", status: "Confirmed" },
    { name: "John Wilson", email: "john@email.com", phone: "+1 234-567-8904", status: "Declined" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="relative mb-8">
              <img 
                src={guestsImage} 
                alt="Wedding guests celebration" 
                className="w-full h-64 object-cover rounded-2xl shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Guest List
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your wedding guest list and RSVPs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Guest Stats */}
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur border-accent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Guest Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Invited:</span>
                    <span className="font-semibold">150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confirmed:</span>
                    <span className="font-semibold text-green-600">85</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending:</span>
                    <span className="font-semibold text-yellow-600">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Declined:</span>
                    <span className="font-semibold text-red-600">20</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-accent">
                <CardHeader>
                  <CardTitle>Add New Guest</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input 
                    placeholder="Full Name" 
                    value={newGuest.name}
                    onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                  />
                  <Input 
                    placeholder="Email Address" 
                    value={newGuest.email}
                    onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
                  />
                  <Input 
                    placeholder="Phone Number" 
                    value={newGuest.phone}
                    onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
                  />
                  <Button className="w-full" variant="romantic" onClick={handleAddGuest}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Guest
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Guest List */}
            <div className="lg:col-span-2">
              <Card className="bg-card/50 backdrop-blur border-accent">
                <CardHeader>
                  <CardTitle>Recent Guests</CardTitle>
                  <CardDescription>Manage your wedding guest list</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {guests.map((guest, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-accent/20 border border-accent/30">
                        <div className="space-y-1">
                          <h3 className="font-medium">{guest.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {guest.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {guest.phone}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            guest.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                            guest.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {guest.status}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toast({
                              title: "Edit Guest",
                              description: `Editing details for ${guest.name}`,
                            })}
                          >
                            Edit
                          </Button>
                        </div>
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

export default Guests;