
import { Search, SlidersHorizontal, Scale, Calendar, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";
import { NewCaseDialog } from "@/components/NewCaseDialog";
import { useQuery } from "@tanstack/react-query";
import { getCases, getCasesStats } from "@/services/caseService";
import { useState, useEffect } from "react";

const Processos = () => {
  // Queries para buscar dados do Supabase
  const { data: cases = [], isLoading: casesLoading, error: casesError } = useQuery({
    queryKey: ['cases'],
    queryFn: getCases,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['cases-stats'],
    queryFn: getCasesStats,
  });

  // Estado para busca
  const [searchTerm, setSearchTerm] = useState("");

  // Log para debug
  useEffect(() => {
    console.log('Casos carregados:', cases);
    console.log('Estatísticas:', stats);
    if (casesError) {
      console.error('Erro ao carregar casos:', casesError);
    }
  }, [cases, stats, casesError]);

  // Filtrar casos baseado na busca
  const filteredCases = cases.filter(caso => 
    caso.process_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caso.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caso.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Função para formatar data
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('pt-BR');
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
                  <Input 
                    className="pl-10 w-64" 
                    placeholder="Buscar por número, cliente..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" size="sm">
                  <SlidersHorizontal size={16} className="mr-2" />
                  Filtros
                </Button>
                
                <NewCaseDialog />
              </div>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Scale className="w-8 h-8 text-primary" />
                  <span className="text-sm text-green-600 font-medium">+10%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {statsLoading ? "..." : stats?.active || 0}
                </h3>
                <p className="text-sm text-muted-foreground">Processos Ativos</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <span className="text-sm text-green-600 font-medium">+5%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {statsLoading ? "..." : stats?.thisMonth || 0}
                </h3>
                <p className="text-sm text-muted-foreground">Novos este Mês</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+2%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {statsLoading ? "..." : stats?.finished || 0}
                </h3>
                <p className="text-sm text-muted-foreground">Finalizados</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">{statsLoading ? "..." : stats?.urgentDeadlines || 0}</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {statsLoading ? "..." : stats?.total || 0}
                </h3>
                <p className="text-sm text-muted-foreground">Total de Processos</p>
              </div>
            </div>

            {/* Lista de Processos */}
            <div className="bg-card rounded-2xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-foreground">Lista de Processos</h2>
              </div>
              
              {casesLoading ? (
                <div className="p-6">
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-accent rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-accent rounded w-3/4"></div>
                            <div className="h-3 bg-accent rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : casesError ? (
                <div className="p-6 text-center text-red-600">
                  Erro ao carregar processos. Tente novamente.
                </div>
              ) : filteredCases.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  {searchTerm ? "Nenhum processo encontrado para a busca." : "Nenhum processo cadastrado ainda."}
                </div>
              ) : (
                <div className="divide-y">
                  {filteredCases.map((processo) => (
                    <div key={processo.id} className="p-6 hover:bg-accent/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={processo.avatar_url || ""} />
                            <AvatarFallback>{processo.client_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Scale className="w-4 h-4 text-primary" />
                              <h3 className="font-semibold text-foreground">{processo.process_number}</h3>
                              <Badge className={`text-xs ${getPrioridadeColor(processo.priority)}`}>
                                {processo.priority}
                              </Badge>
                            </div>
                            
                            <p className="text-sm font-medium text-foreground mb-1">{processo.subject}</p>
                            <p className="text-sm text-muted-foreground mb-2">{processo.client_name} • {processo.legal_area}</p>
                            
                            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                              <div>
                                <span className="font-medium">Tribunal:</span> {processo.court}
                              </div>
                              <div>
                                <span className="font-medium">Responsável:</span> {processo.responsible_lawyer}
                              </div>
                              <div>
                                <span className="font-medium">Valor da Causa:</span> {processo.case_value || "Não informado"}
                              </div>
                              <div>
                                <span className="font-medium">Distribuição:</span> {formatDate(processo.distribution_date)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <Badge className={`text-xs ${getStatusColor(processo.status)}`}>
                              {processo.status}
                            </Badge>
                            {processo.next_deadline && (
                              <>
                                <p className="text-xs text-muted-foreground mt-1">Próximo prazo</p>
                                <p className="text-xs font-medium text-foreground">{formatDate(processo.next_deadline)}</p>
                              </>
                            )}
                          </div>
                          
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Processos;
