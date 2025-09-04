import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Clock, AlertCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Tasks = () => {
  const { toast } = useToast();
  
  const tasks = [
    {
      title: "Book the venue",
      description: "Finalize venue booking and sign contract",
      dueDate: "2024-02-20",
      priority: "high",
      status: "completed",
      category: "venue"
    },
    {
      title: "Send save the dates",
      description: "Design and send save the date cards to all guests",
      dueDate: "2024-03-01",
      priority: "high",
      status: "in-progress",
      category: "invitations"
    },
    {
      title: "Choose wedding dress",
      description: "Try on dresses and make final selection",
      dueDate: "2024-03-15",
      priority: "medium",
      status: "pending",
      category: "attire"
    },
    {
      title: "Book photographer",
      description: "Review portfolios and book wedding photographer",
      dueDate: "2024-03-10",
      priority: "high",
      status: "pending",
      category: "photography"
    },
    {
      title: "Plan menu tasting",
      description: "Schedule and attend catering menu tasting",
      dueDate: "2024-04-01",
      priority: "medium",
      status: "pending",
      category: "catering"
    },
    {
      title: "Order wedding invitations",
      description: "Design and order formal wedding invitations",
      dueDate: "2024-04-15",
      priority: "medium",
      status: "pending",
      category: "invitations"
    },
    {
      title: "Book transportation",
      description: "Arrange transportation for wedding day",
      dueDate: "2024-05-01",
      priority: "low",
      status: "pending",
      category: "logistics"
    },
    {
      title: "Final dress fitting",
      description: "Complete final alterations and fitting",
      dueDate: "2024-06-01",
      priority: "high",
      status: "pending",
      category: "attire"
    }
  ];

  const [taskStates, setTaskStates] = useState(
    tasks.reduce((acc, task, index) => ({...acc, [index]: task.status}), {})
  );

  const handleTaskToggle = (index: number, checked: boolean) => {
    const newStatus = checked ? 'completed' : 'pending';
    setTaskStates(prev => ({...prev, [index]: newStatus}));
    toast({
      title: checked ? "Task Completed!" : "Task Reopened",
      description: `${tasks[index].title} has been ${checked ? 'marked as complete' : 'reopened'}.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Wedding Tasks
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay organized with your wedding planning checklist
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 mb-8">
            {/* Progress Overview */}
            <Card className="bg-card/50 backdrop-blur border-accent">
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">
                  {completedTasks}/{totalTasks}
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(progressPercentage)}% Complete
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-accent">
              <CardHeader>
                <CardTitle className="text-lg">High Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {tasks.filter(task => task.priority === 'high' && task.status !== 'completed').length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Urgent tasks
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-accent">
              <CardHeader>
                <CardTitle className="text-lg">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {tasks.filter(task => task.status === 'in-progress').length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active tasks
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-accent">
              <CardHeader>
                <CardTitle className="text-lg">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {completedTasks}
                </div>
                <div className="text-sm text-muted-foreground">
                  Finished tasks
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task List */}
          <Card className="bg-card/50 backdrop-blur border-accent">
            <CardHeader>
              <CardTitle>Wedding Checklist</CardTitle>
              <CardDescription>Track your wedding planning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className={`flex items-start gap-4 p-4 rounded-lg border border-accent/30 ${
                    task.status === 'completed' ? 'bg-green-50/50' : 'bg-accent/10'
                  }`}>
                    <Checkbox 
                      checked={taskStates[index] === 'completed'}
                      onCheckedChange={(checked) => handleTaskToggle(index, !!checked)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className={`font-medium ${taskStates[index] === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Due: {task.dueDate}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getStatusIcon(taskStates[index] || task.status)}
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {task.category}
                          </Badge>
                        </div>
                      </div>
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

export default Tasks;