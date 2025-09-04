import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Clock, MapPin, Plus, CheckCircle, Circle, Edit } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface TimelineEvent {
  id: string;
  date: Date;
  time: string;
  title: string;
  location: string;
  type: string;
  status: 'completed' | 'upcoming' | 'in-progress';
  description?: string;
}

const Timeline = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: "1",
      date: new Date("2024-02-15"),
      time: "10:00 AM",
      title: "Venue Site Visit",
      location: "The Grand Ballroom",
      type: "venue",
      status: "completed",
      description: "Final walkthrough of the ceremony and reception spaces"
    },
    {
      id: "2", 
      date: new Date("2024-03-01"),
      time: "2:00 PM",
      title: "Cake Tasting",
      location: "Sweet Dreams Bakery",
      type: "catering",
      status: "upcoming",
      description: "Tasting different cake flavors and discussing design options"
    },
    {
      id: "3",
      date: new Date("2024-03-15"),
      time: "11:00 AM", 
      title: "Dress Fitting",
      location: "Elegant Bridal",
      type: "attire",
      status: "upcoming",
      description: "Final dress fitting and alterations"
    },
    {
      id: "4",
      date: new Date("2024-04-01"),
      time: "3:00 PM",
      title: "Photographer Meeting",
      location: "Studio Downtown", 
      type: "photography",
      status: "upcoming",
      description: "Engagement shoot and wedding day timeline discussion"
    },
    {
      id: "5",
      date: new Date("2024-06-15"),
      time: "4:00 PM",
      title: "Wedding Day",
      location: "The Grand Ballroom",
      type: "wedding",
      status: "upcoming",
      description: "The big day! Ceremony at 4 PM, reception to follow"
    }
  ]);

  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<TimelineEvent>>({
    title: "",
    location: "",
    type: "planning",
    status: "upcoming",
    time: "",
    description: ""
  });
  const [selectedDate, setSelectedDate] = useState<Date>();

  const eventTypes = [
    { value: "venue", label: "Venue", color: "bg-blue-100 text-blue-800" },
    { value: "catering", label: "Catering", color: "bg-green-100 text-green-800" },
    { value: "attire", label: "Attire", color: "bg-purple-100 text-purple-800" },
    { value: "photography", label: "Photography", color: "bg-orange-100 text-orange-800" },
    { value: "flowers", label: "Flowers", color: "bg-pink-100 text-pink-800" },
    { value: "music", label: "Music", color: "bg-indigo-100 text-indigo-800" },
    { value: "planning", label: "Planning", color: "bg-gray-100 text-gray-800" },
    { value: "wedding", label: "Wedding Day", color: "bg-rose-100 text-rose-800" }
  ];

  const getTypeColor = (type: string) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType?.color || "bg-gray-100 text-gray-800";
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.location || !selectedDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const event: TimelineEvent = {
      id: Date.now().toString(),
      date: selectedDate,
      time: newEvent.time || "12:00 PM",
      title: newEvent.title,
      location: newEvent.location,
      type: newEvent.type || "planning",
      status: newEvent.status as 'completed' | 'upcoming' | 'in-progress',
      description: newEvent.description
    };

    setEvents([...events, event].sort((a, b) => a.date.getTime() - b.date.getTime()));
    setIsAddingEvent(false);
    setNewEvent({
      title: "",
      location: "",
      type: "planning",
      status: "upcoming",
      time: "",
      description: ""
    });
    setSelectedDate(undefined);

    toast({
      title: "Event Added",
      description: `${event.title} has been added to your timeline.`
    });
  };

  const toggleEventStatus = (eventId: string) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const newStatus = event.status === 'completed' ? 'upcoming' : 'completed';
        return { ...event, status: newStatus };
      }
      return event;
    }));

    const event = events.find(e => e.id === eventId);
    if (event) {
      toast({
        title: event.status === 'completed' ? "Marked as Pending" : "Marked as Complete",
        description: `${event.title} status updated.`
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Wedding Timeline
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Track all your important wedding planning milestones
            </p>
            
            <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
              <DialogTrigger asChild>
                <Button variant="romantic" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Timeline Event</DialogTitle>
                  <DialogDescription>
                    Create a new milestone for your wedding planning timeline.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      placeholder="e.g., Final dress fitting"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        placeholder="e.g., 2:00 PM"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Category</Label>
                      <Select value={newEvent.type} onValueChange={(value) => setNewEvent({...newEvent, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      placeholder="e.g., Bridal shop downtown"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      placeholder="Additional details about this event..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddEvent} className="flex-1">
                      Add Event
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-6">
            {events.map((event, index) => (
              <Card key={event.id} className={`bg-card/50 backdrop-blur border-accent relative transition-all hover:shadow-elegant ${
                event.status === 'completed' ? 'opacity-75' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{format(event.date, "PPP")}</span>
                        {event.time && (
                          <>
                            <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                            <span className="text-sm text-muted-foreground">{event.time}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleEventStatus(event.id)}
                          className="p-0 h-auto hover:bg-transparent"
                        >
                          {event.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </Button>
                        <CardTitle className={`text-xl ${event.status === 'completed' ? 'line-through' : ''}`}>
                          {event.title}
                        </CardTitle>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{event.location}</span>
                      </div>
                      
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getTypeColor(event.type)}>
                        {eventTypes.find(t => t.value === event.type)?.label || event.type}
                      </Badge>
                      <Badge variant={event.status === 'completed' ? 'default' : 'secondary'}>
                        {event.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                {index < events.length - 1 && (
                  <div className="absolute left-8 bottom-0 w-0.5 h-6 bg-accent translate-y-full" />
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;