
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Plus, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";
import { getClients, getClientStats, Client, ClientStats } from "@/services/clientService";

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Query para buscar clientes
  const { data: clients = [], isLoading: clientsLoading, error: clientsError } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  // Query para buscar estatísticas
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['client-stats'],
    queryFn: getClientStats,
  });

  // Filtrar clientes com base no termo de busca
  const filteredClients = clients.filter((client: Client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document_number?.includes(searchTerm)
  );

  // Função para obter a cor do status
  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "prospect": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Função para formatar o endereço
  const formatAddress = (address: any) => {
    if (!address) return "Endereço não informado";
    if (typeof address === 'string') return address;
    
    const { city, state } = address;
    return city && state ? `${city}, ${state}` : "Endereço não informado";
  };

  // Função para obter as iniciais do nome
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Exibir erro se houver
  useEffect(() => {
    if (clientsError) {
      toast({
        title: "Erro",
        description: "Erro ao carregar clientes. Verifique sua conexão.",
        variant: "destructive"
      });
    }
  }, [clientsError, toast]);

  if (clientsLoading) {
    return (
      <div className="min-h-screen bg-accent/30 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNavigation />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Carregando clientes...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent/30 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopNavigation />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Gestão de Clientes</h1>
                <p className="text-sm text-muted-foreground">Gerencie todos os clientes do escritório</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input 
                    className="pl-10 w-64" 
                    placeholder="Buscar clientes..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" size="sm">
                  <SlidersHorizontal size={16} className="mr-2" />
                  Filtros
                </Button>
                
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus size={16} className="mr-2" />
                  Novo Cliente
                </Button>
              </div>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">👥</span>
                  <span className="text-sm text-green-600 font-medium">+12%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {statsLoading ? "..." : stats?.totalClients || 0}
                </h3>
                <p className="text-sm text-muted-foreground">Total de Clientes</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">✅</span>
                  <span className="text-sm text-green-600 font-medium">+8%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {statsLoading ? "..." : stats?.activeClients || 0}
                </h3>
                <p className="text-sm text-muted-foreground">Clientes Ativos</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">🔄</span>
                  <span className="text-sm text-blue-600 font-medium">+3%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {statsLoading ? "..." : stats?.newClientsThisMonth || 0}
                </h3>
                <p className="text-sm text-muted-foreground">Novos este Mês</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">💰</span>
                  <span className="text-sm text-green-600 font-medium">+15%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {statsLoading ? "..." : stats?.totalContractValue || "R$ 0"}
                </h3>
                <p className="text-sm text-muted-foreground">Valor Total Contratos</p>
              </div>
            </div>

            {/* Lista de Clientes */}
            <div className="bg-card rounded-2xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-foreground">Lista de Clientes</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredClients.length} {filteredClients.length === 1 ? 'cliente encontrado' : 'clientes encontrados'}
                </p>
              </div>
              
              <div className="divide-y">
                {filteredClients.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">
                      {searchTerm ? 'Nenhum cliente encontrado com os termos de busca.' : 'Nenhum cliente cadastrado.'}
                    </p>
                  </div>
                ) : (
                  filteredClients.map((client: Client) => (
                    <div key={client.id} className="p-6 hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="font-semibold text-foreground">{client.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {client.client_type === 'individual' ? 'Pessoa Física' : 'Pessoa Jurídica'} • {client.document_number || 'Documento não informado'}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              {client.email && (
                                <div className="flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">{client.email}</span>
                                </div>
                              )}
                              {client.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">{client.phone}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{formatAddress(client.address)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm font-medium text-foreground">0</p>
                            <p className="text-xs text-muted-foreground">Processos</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm font-medium text-foreground">R$ 0</p>
                            <p className="text-xs text-muted-foreground">Valor Total</p>
                          </div>
                          
                          <div className="text-center">
                            <Badge className={`text-xs ${getStatusColor(client.status)}`}>
                              {client.status === 'active' ? 'Ativo' : client.status === 'inactive' ? 'Inativo' : client.status || 'Indefinido'}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">Desde {formatDate(client.created_at)}</p>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Clientes;
