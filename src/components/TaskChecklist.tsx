import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const TaskChecklist = () => {
  const { toast } = useToast();
  const [taskStates, setTaskStates] = useState<{[key: number]: boolean}>({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
  });

  const handleTaskToggle = (taskId: number, taskTitle: string, checked: boolean) => {
    setTaskStates(prev => ({...prev, [taskId]: checked}));
    toast({
      title: checked ? "Task Completed!" : "Task Reopened",
      description: `${taskTitle} has been ${checked ? 'marked as complete' : 'reopened'}.`,
    });
  };
  const tasks = [
    { id: 1, title: "Book venue", completed: true, priority: "high", dueDate: "Completed" },
    { id: 2, title: "Send save the dates", completed: true, priority: "high", dueDate: "Completed" },
    { id: 3, title: "Choose photographer", completed: false, priority: "high", dueDate: "This week" },
    { id: 4, title: "Order invitations", completed: false, priority: "medium", dueDate: "Next week" },
    { id: 5, title: "Book caterer", completed: false, priority: "high", dueDate: "This month" },
    { id: 6, title: "Choose flowers", completed: false, priority: "medium", dueDate: "Next month" },
    { id: 7, title: "Plan honeymoon", completed: false, priority: "low", dueDate: "Next month" },
    { id: 8, title: "Register for gifts", completed: false, priority: "low", dueDate: "2 months" }
  ];

  const completedTasks = Object.values(taskStates).filter(Boolean).length;
  const totalTasks = tasks.length;
  const progressPercent = (completedTasks / totalTasks) * 100;

  const priorityColors = {
    high: "destructive",
    medium: "secondary", 
    low: "outline"
  };

  const priorityIcons = {
    high: AlertCircle,
    medium: Clock,
    low: CheckSquare
  };

  return (
    <Card className="shadow-soft border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between font-serif">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-5 w-5 text-primary" />
            <span>Wedding Tasks</span>
          </div>
          <div className="text-sm font-normal text-muted-foreground">
            {completedTasks} of {totalTasks} completed
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-accent/30 rounded-lg p-3">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span className="font-medium">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="h-2 bg-gradient-romantic rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {tasks.map((task) => {
              const PriorityIcon = priorityIcons[task.priority as keyof typeof priorityIcons];
              return (
                <div 
                  key={task.id} 
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                    taskStates[task.id] 
                      ? 'bg-accent/20 border-accent' 
                      : 'bg-card border-border hover:shadow-soft'
                  }`}
                >
                  <Checkbox 
                    checked={taskStates[task.id]}
                    onCheckedChange={(checked) => handleTaskToggle(task.id, task.title, !!checked)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${taskStates[task.id] ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </div>
                    <div className="text-sm text-muted-foreground">{task.dueDate}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={priorityColors[task.priority as keyof typeof priorityColors] as any}
                      className="text-xs"
                    >
                      <PriorityIcon className="h-3 w-3 mr-1" />
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskChecklist;