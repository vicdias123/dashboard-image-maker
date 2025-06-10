
import { Search, SlidersHorizontal, Plus, Scale, Calendar, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

const Processos = () => {
  const processos = [
    {
      id: 1,
      numero: "5001234-67.2024.8.26.0001",
      cliente: "Maria Silva Santos",
      area: "Direito de Família",
      assunto: "Ação de Divórcio Consensual",
      tribunal: "TJSP - 1ª Vara de Família",
      valorCausa: "R$ 150.000",
      status: "Em Andamento",
      prioridade: "Alta",
      responsavel: "Dr. Vitor Dias",
      dataDistribuicao: "15/01/2024",
      proximoPrazo: "25/11/2024",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      numero: "1001567-89.2024.8.26.0100",
      cliente: "João Carlos Oliveira",
      area: "Direito Empresarial",
      assunto: "Revisão de Contrato Comercial",
      tribunal: "TJSP - 2ª Vara Empresarial",
      valorCausa: "R$ 500.000",
      status: "Análise Jurídica",
      prioridade: "Média",
      responsavel: "Dra. Ana Costa",
      dataDistribuicao: "03/02/2024",
      proximoPrazo: "30/11/2024",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      numero: "2001890-12.2024.8.26.0224",
      cliente: "Empresa XYZ Ltda",
      area: "Direito Tributário",
      assunto: "Consultoria Tributária - ICMS",
      tribunal: "TJSP - Vara da Fazenda Pública",
      valorCausa: "R$ 1.200.000",
      status: "Aguardando Documentos",
      prioridade: "Alta",
      responsavel: "Dr. Roberto Silva",
      dataDistribuicao: "10/03/2024",
      proximoPrazo: "13/11/2024",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Andamento": return "bg-blue-100 text-blue-800";
      case "Análise Jurídica": return "bg-yellow-100 text-yellow-800";
      case "Aguardando Documentos": return "bg-orange-100 text-orange-800";
      case "Finalizado": return "bg-green-100 text-green-800";
      case "Suspenso": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta": return "bg-red-100 text-red-800";
      case "Média": return "bg-yellow-100 text-yellow-800";
      case "Baixa": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-accent/30 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopNavigation />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Gestão de Processos</h1>
                <p className="text-sm text-muted-foreground">Acompanhe todos os processos do escritório</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input className="pl-10 w-64" placeholder="Buscar por número, cliente..." />
                </div>
                
                <Button variant="outline" size="sm">
                  <SlidersHorizontal size={16} className="mr-2" />
                  Filtros
                </Button>
                
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus size={16} className="mr-2" />
                  Novo Processo
                </Button>
              </div>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Scale className="w-8 h-8 text-primary" />
                  <span className="text-sm text-green-600 font-medium">+10%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">125</h3>
                <p className="text-sm text-muted-foreground">Processos Ativos</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <span className="text-sm text-green-600 font-medium">+5%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">15</h3>
                <p className="text-sm text-muted-foreground">Novos este Mês</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+2%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">8</h3>
                <p className="text-sm text-muted-foreground">Finalizados</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">5</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">12</h3>
                <p className="text-sm text-muted-foreground">Prazos Urgentes</p>
              </div>
            </div>

            {/* Lista de Processos */}
            <div className="bg-card rounded-2xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-foreground">Lista de Processos</h2>
              </div>
              
              <div className="divide-y">
                {processos.map((processo) => (
                  <div key={processo.id} className="p-6 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={processo.avatar} />
                          <AvatarFallback>{processo.cliente.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Scale className="w-4 h-4 text-primary" />
                            <h3 className="font-semibold text-foreground">{processo.numero}</h3>
                            <Badge className={`text-xs ${getPrioridadeColor(processo.prioridade)}`}>
                              {processo.prioridade}
                            </Badge>
                          </div>
                          
                          <p className="text-sm font-medium text-foreground mb-1">{processo.assunto}</p>
                          <p className="text-sm text-muted-foreground mb-2">{processo.cliente} • {processo.area}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                            <div>
                              <span className="font-medium">Tribunal:</span> {processo.tribunal}
                            </div>
                            <div>
                              <span className="font-medium">Responsável:</span> {processo.responsavel}
                            </div>
                            <div>
                              <span className="font-medium">Valor da Causa:</span> {processo.valorCausa}
                            </div>
                            <div>
                              <span className="font-medium">Distribuição:</span> {processo.dataDistribuicao}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Badge className={`text-xs ${getStatusColor(processo.status)}`}>
                            {processo.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">Próximo prazo</p>
                          <p className="text-xs font-medium text-foreground">{processo.proximoPrazo}</p>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Processos;
