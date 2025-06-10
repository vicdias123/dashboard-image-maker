
import { Bell, Scale } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopNavigation = () => {
  const tabs = ["Visão Geral", "Relatórios Executivos", "Métricas Personalizadas", "Análise de Produtividade", "Indicadores"];

  return (
    <div className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
            <Scale className="w-4 h-4 text-primary" />
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
          <div className="flex items-center space-x-2 mr-4">
            <span className="text-sm text-muted-foreground">10/11/2024 - 14:30</span>
          </div>
          <button className="p-2 hover:bg-accent rounded-full relative">
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">3</span>
          </button>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" />
            <AvatarFallback>VD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
