
import { BarChart3, FileText, CheckSquare, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: FileText, label: "Documents", active: false },
    { icon: CheckSquare, label: "Tasks", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
  ];

  return (
    <div className={cn("w-64 bg-background p-6", className)}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Welcome<br />back, Anjey
        </h2>
        <p className="text-sm text-muted-foreground">Last Update 10 Nov 2024</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors",
              item.active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent"
            )}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <div className="bg-primary text-primary-foreground p-6 rounded-2xl">
          <div className="mb-4">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center mb-3">
              <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
            </div>
            <h3 className="font-semibold mb-2">Explore Premium Features</h3>
          </div>
          <button className="w-full bg-primary-foreground/10 text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary-foreground/20 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
