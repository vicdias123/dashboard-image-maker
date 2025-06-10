
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopNavigation = () => {
  const tabs = ["Overview", "Summary", "Summary", "General", "Work Summary"];

  return (
    <div className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
            <div className="w-4 h-4 bg-primary rounded"></div>
          </div>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                index === 0
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-accent rounded-full">
            <Bell size={20} className="text-muted-foreground" />
          </button>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
