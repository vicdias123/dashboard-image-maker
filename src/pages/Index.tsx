
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";
import CaseCard from "@/components/CaseCard";
import ClosedCasesChart from "@/components/ClosedCasesChart";
import ScheduledCalls from "@/components/ScheduledCalls";

const Index = () => {
  const ongoingCases = [
    {
      name: "Alexander Hayes",
      title: "Contract Preparation",
      status: "In Progress",
      deadline: "Due Today",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Maria Mueller",
      title: "Legal Consultation on Divorce",
      status: "Under Review",
      deadline: "No Deadline",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      isDark: true
    },
    {
      name: "Alexander Hayes",
      title: "Contract Preparation",
      status: "Urgent",
      deadline: "Due Today",
      priority: "Urgent",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-accent/30 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopNavigation />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-foreground">My Ongoing Cases</h1>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input className="pl-10 w-64" placeholder="Search..." />
                </div>
                
                <Button variant="outline" size="sm">
                  <SlidersHorizontal size={16} className="mr-2" />
                  All
                </Button>
                
                <Button variant="outline" size="sm">
                  By Priority
                </Button>
                
                <Button variant="outline" size="sm">
                  By Deadline
                </Button>
                
                <Button className="bg-primary hover:bg-primary/90">
                  Add Client
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {ongoingCases.map((case_, index) => (
                <CaseCard key={index} {...case_} />
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            <ClosedCasesChart />
            <ScheduledCalls />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
