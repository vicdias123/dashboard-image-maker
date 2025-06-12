
import { BarChart3, Users, Scale, Calendar, FileText, DollarSign, UserCheck, TrendingUp, FileSearch, Settings, LayoutDashboard, FolderOpen, Users2, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getModulesWithPermissions } from "@/services/moduleService";
import { useState, useEffect } from "react";

interface SidebarProps {
  className?: string;
}

// Mapeamento de ícones
const iconMap: Record<string, any> = {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  FolderOpen,
  DollarSign,
  Users2,
  Megaphone,
  BarChart3,
  Settings,
  Scale,
  UserCheck,
  TrendingUp,
  FileSearch,
};

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<string>('admin'); // Por enquanto fixo como admin

  // Query para buscar módulos com permissões
  const { data: modules, isLoading, error } = useQuery({
    queryKey: ['modules', userRole],
    queryFn: () => getModulesWithPermissions(userRole),
    enabled: !!userRole,
  });

  // Fallback para os itens de menu caso não consiga carregar do banco
  const fallbackMenuItems = [
    { icon: BarChart3, label: "Dashboard", path: "/", active: location.pathname === "/" },
    { icon: Users, label: "Clientes", path: "/clientes", active: location.pathname === "/clientes" },
    { icon: Scale, label: "Processos", path: "/processos", active: location.pathname === "/processos" },
    { icon: Calendar, label: "Agenda", path: "/agenda", active: location.pathname === "/agenda" },
    { icon: FileText, label: "Documentos", path: "/documentos", active: location.pathname === "/documentos" },
    { icon: DollarSign, label: "Financeiro", path: "/financeiro", active: location.pathname === "/financeiro" },
    { icon: UserCheck, label: "Equipe", path: "/equipe", active: location.pathname === "/equipe" },
    { icon: TrendingUp, label: "Marketing", path: "/marketing", active: location.pathname === "/marketing" },
    { icon: FileSearch, label: "Relatórios", path: "/relatorios", active: location.pathname === "/relatorios" },
    { icon: Settings, label: "Configurações", path: "/configuracoes", active: location.pathname === "/configuracoes" },
  ];

  // Preparar itens de menu baseados nos dados do banco
  const menuItems = modules ? modules.map(module => {
    const IconComponent = iconMap[module.icon || 'FileText'] || FileText;
    return {
      icon: IconComponent,
      label: module.title,
      path: module.route,
      active: location.pathname === module.route,
      permissions: module.permissions
    };
  }) : fallbackMenuItems;

  if (error) {
    console.error('Erro ao carregar módulos:', error);
  }

  return (
    <div className={cn("w-64 bg-background p-6 border-r border-border", className)}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Bem-vindo,<br />Dr. Vitor Dias Barbosa
        </h2>
        <p className="text-sm text-muted-foreground">Sócio Fundador & Estrategista Jurídico</p>
        <p className="text-xs text-muted-foreground mt-1">Última atualização: 10 Nov 2024</p>
      </div>

      <nav className="space-y-2">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-full h-12 bg-accent/50 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))
        )}
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
