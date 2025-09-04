import Navigation from "@/components/Navigation";
import WeddingCountdown from "@/components/WeddingCountdown";
import BudgetTracker from "@/components/BudgetTracker";
import VenueCards from "@/components/VenueCards";
import TaskChecklist from "@/components/TaskChecklist";
import heroImage from "@/assets/wedding-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      {/* Hero Section */}
      <section id="dashboard" className="relative pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Wedding Planning"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-elegant/80" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in">
              Plan Your Perfect
              <span className="block text-primary">Dream Wedding</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              From venue selection to the final dance, we'll help you create the wedding of your dreams with our beautiful planning tools.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div id="timeline">
              <WeddingCountdown />
            </div>
            <div id="budget">
              <BudgetTracker />
            </div>
          </div>
          
          {/* Center Column */}
          <div className="lg:col-span-2 space-y-8">
            <div id="venues">
              <VenueCards />
            </div>
            <div id="tasks">
              <TaskChecklist />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
