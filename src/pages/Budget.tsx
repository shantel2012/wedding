import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

const Budget = () => {
  const budgetItems = [
    { category: "Venue", budgeted: 15000, spent: 12000, percentage: 80 },
    { category: "Catering", budgeted: 8000, spent: 6500, percentage: 81 },
    { category: "Photography", budgeted: 3000, spent: 2800, percentage: 93 },
    { category: "Flowers", budgeted: 2000, spent: 1200, percentage: 60 },
    { category: "Music/DJ", budgeted: 1500, spent: 1500, percentage: 100 },
    { category: "Dress & Attire", budgeted: 2500, spent: 1800, percentage: 72 },
    { category: "Decorations", budgeted: 1000, spent: 400, percentage: 40 },
    { category: "Transportation", budgeted: 800, spent: 0, percentage: 0 },
  ];

  const totalBudgeted = budgetItems.reduce((sum, item) => sum + item.budgeted, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Wedding Budget
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your wedding expenses and stay within budget
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Budget Overview */}
            <Card className="bg-card/50 backdrop-blur border-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Total Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  ${totalBudgeted.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Overall wedding budget
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  ${totalSpent.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {((totalSpent / totalBudgeted) * 100).toFixed(1)}% of budget used
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  ${remainingBudget.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Available to spend
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Budget Breakdown */}
          <Card className="bg-card/50 backdrop-blur border-accent">
            <CardHeader>
              <CardTitle>Budget Breakdown</CardTitle>
              <CardDescription>Detailed view of your wedding expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgetItems.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.category}</h3>
                      <div className="text-sm text-muted-foreground">
                        ${item.spent.toLocaleString()} / ${item.budgeted.toLocaleString()}
                      </div>
                    </div>
                    <Progress 
                      value={item.percentage} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.percentage}% used</span>
                      <span className={item.percentage > 90 ? 'text-red-600' : item.percentage > 75 ? 'text-orange-600' : 'text-green-600'}>
                        ${(item.budgeted - item.spent).toLocaleString()} remaining
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Budget;