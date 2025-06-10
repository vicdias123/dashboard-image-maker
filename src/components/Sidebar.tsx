
import { BarChart3, Users, Scale, Calendar, FileText, DollarSign, UserCheck, TrendingUp, FileSearch, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: Users, label: "Clientes", active: false },
    { icon: Scale, label: "Processos", active: false },
    { icon: Calendar, label: "Agenda", active: false },
    { icon: FileText, label: "Documentos", active: false },
    { icon: DollarSign, label: "Financeiro", active: false },
    { icon: UserCheck, label: "Equipe", active: false },
    { icon: TrendingUp, label: "Marketing", active: false },
    { icon: FileSearch, label: "Relatórios", active: false },
    { icon: Settings, label: "Configurações", active: false },
  ];

  return (
    <div className={cn("w-64 bg-background p-6 border-r border-border", className)}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Bem-vindo,<br />Dr. Vitor Dias
        </h2>
        <p className="text-sm text-muted-foreground">Sócio Fundador & Estrategista Jurídico</p>
        <p className="text-xs text-muted-foreground mt-1">Última atualização: 10 Nov 2024</p>
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
            <h3 className="font-semibold mb-2">Explore Recursos Premium</h3>
            <p className="text-sm text-primary-foreground/80">Desbloqueie funcionalidades avançadas</p>
          </div>
          <button className="w-full bg-primary-foreground/10 text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary-foreground/20 transition-colors">
            Fazer Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
