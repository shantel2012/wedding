import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp } from "lucide-react";

const BudgetTracker = () => {
  const budget = {
    total: 25000,
    spent: 12500,
    categories: [
      { name: "Venue", allocated: 8000, spent: 7500 },
      { name: "Catering", allocated: 6000, spent: 2000 },
      { name: "Photography", allocated: 3000, spent: 1500 },
      { name: "Flowers", allocated: 2000, spent: 800 },
      { name: "Music", allocated: 1500, spent: 700 },
      { name: "Other", allocated: 4500, spent: 0 }
    ]
  };

  const remaining = budget.total - budget.spent;
  const percentSpent = (budget.spent / budget.total) * 100;

  return (
    <Card className="shadow-soft border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 font-serif">
          <DollarSign className="h-5 w-5 text-primary" />
          <span>Budget Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              ${remaining.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">remaining</p>
            <Progress value={percentSpent} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              ${budget.spent.toLocaleString()} of ${budget.total.toLocaleString()} spent
            </p>
          </div>
          
          <div className="space-y-3">
            {budget.categories.map((category) => {
              const categoryPercent = (category.spent / category.allocated) * 100;
              return (
                <div key={category.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-muted-foreground">
                      ${category.spent} / ${category.allocated}
                    </span>
                  </div>
                  <Progress value={categoryPercent} className="h-1.5" />
                </div>
              );
            })}
          </div>
          
          <div className="flex items-center justify-center text-sm text-muted-foreground bg-accent/30 rounded-lg p-3">
            <TrendingUp className="h-4 w-4 mr-2 text-primary" />
            You're on track with your budget!
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;