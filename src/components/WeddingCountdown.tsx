import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const WeddingCountdown = () => {
  // Mock wedding date - 6 months from now
  const weddingDate = new Date();
  weddingDate.setMonth(weddingDate.getMonth() + 6);
  
  const today = new Date();
  const timeDiff = weddingDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <Card className="bg-gradient-elegant border-none shadow-soft animate-fade-in">
      <CardContent className="p-8 text-center">
        <div className="mb-4">
          <Heart className="h-12 w-12 text-primary mx-auto mb-2 animate-gentle-float" />
          <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
            Sarah & Michael
          </h2>
          <p className="text-muted-foreground font-medium">
            {weddingDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="text-6xl font-bold text-primary font-serif">
            {daysRemaining}
          </div>
          <p className="text-xl text-muted-foreground font-medium">
            days until "I do"
          </p>
        </div>
        
        <div className="mt-6 w-full bg-muted rounded-full h-2">
          <div 
            className="h-2 bg-gradient-romantic rounded-full transition-all duration-700"
            style={{ width: `${Math.max(20, 100 - (daysRemaining / 365) * 100)}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Planning Progress</p>
      </CardContent>
    </Card>
  );
};

export default WeddingCountdown;