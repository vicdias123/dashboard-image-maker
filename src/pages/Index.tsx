
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";
import CaseCard from "@/components/CaseCard";
import ClosedCasesChart from "@/components/ClosedCasesChart";
import ScheduledCalls from "@/components/ScheduledCalls";

const Index = () => {
  const activeCases = [
    {
      clientName: "Maria Silva Santos",
      caseType: "Ação de Divórcio Consensual",
      processNumber: "5001234-67.2024.8.26.0001",
      status: "Em Andamento",
      deadline: "Vence Hoje",
      priority: "Urgente",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      responsibleLawyer: "Dr. Vitor Dias"
    },
    {
      clientName: "João Carlos Oliveira",
      caseType: "Revisão de Contrato Empresarial",
      processNumber: "1001567-89.2024.8.26.0100",
      status: "Análise Jurídica",
      deadline: "Sem Prazo",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      responsibleLawyer: "Dra. Ana Costa",
      isDark: true
    },
    {
      clientName: "Empresa XYZ Ltda",
      caseType: "Consultoria Tributária",
      processNumber: "2001890-12.2024.8.26.0224",
      status: "Aguardando Documentos",
      deadline: "Vence em 3 dias",
      priority: "Alta",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
      responsibleLawyer: "Dr. Roberto Silva"
    }
  ];

  const metrics = [
    { label: "Casos Ativos", value: "25", change: "+10%", icon: "⚖️" },
    { label: "Novos Casos (Mês)", value: "15", change: "+5%", icon: "📊" },
    { label: "Casos Fechados (Mês)", value: "8", change: "+2%", icon: "✅" },
    { label: "Receita Mensal", value: "R$ 450.000", change: "+7%", icon: "💰" }
  ];

  return (
    <div className="min-h-screen bg-accent/30 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopNavigation />
        
        <main className="flex-1 p-6">
          {/* Métricas Principais */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-card p-6 rounded-2xl border hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{metric.icon}</span>
                  <span className="text-sm text-green-600 font-medium">{metric.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{metric.value}</h3>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-foreground">Meus Casos em Andamento</h1>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input className="pl-10 w-64" placeholder="Buscar casos, clientes..." />
                </div>
                
                <Button variant="outline" size="sm">
                  <SlidersHorizontal size={16} className="mr-2" />
                  Todos
                </Button>
                
                <Button variant="outline" size="sm">
                  Por Prioridade
                </Button>
                
                <Button variant="outline" size="sm">
                  Por Prazo
                </Button>
                
                <Button className="bg-primary hover:bg-primary/90">
                  Novo Cliente
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {activeCases.map((case_, index) => (
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
