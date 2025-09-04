import { Heart, CalendarDays, Users, MapPin, DollarSign, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const navItems = [
    { icon: Heart, label: "Dashboard", href: "/" },
    { icon: CalendarDays, label: "Timeline", href: "/timeline" },
    { icon: MapPin, label: "Venues", href: "/venues" },
    { icon: Users, label: "Guests", href: "/guests" },
    { icon: DollarSign, label: "Budget", href: "/budget" },
    { icon: CheckSquare, label: "Tasks", href: "/tasks" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="font-serif text-2xl font-bold text-foreground">DreamDay</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-2 hover:bg-accent/50 transition-colors ${
                  location.pathname === item.href ? 'bg-accent/50 text-primary' : ''
                }`}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
          
          <Button 
            variant="romantic" 
            size="sm"
            onClick={() => toast({
              title: "Progress Saved!",
              description: "Your wedding planning progress has been saved successfully.",
            })}
          >
            Save Progress
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;