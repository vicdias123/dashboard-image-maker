
import { Search, SlidersHorizontal, Plus, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

const Clientes = () => {
  const clientes = [
    {
      id: 1,
      nome: "Maria Silva Santos",
      tipo: "Pessoa Física",
      cpfCnpj: "123.456.789-00",
      email: "maria.santos@email.com",
      telefone: "(11) 99999-9999",
      endereco: "São Paulo, SP",
      status: "Ativo",
      dataInicio: "15/01/2024",
      valorTotal: "R$ 85.000",
      processos: 3,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
    },
    {
      id: 2,
      nome: "João Carlos Oliveira",
      tipo: "Pessoa Física",
      cpfCnpj: "987.654.321-00",
      email: "joao.oliveira@email.com",
      telefone: "(11) 88888-8888",
      endereco: "Rio de Janeiro, RJ",
      status: "Ativo",
      dataInicio: "03/02/2024",
      valorTotal: "R$ 120.000",
      processos: 2,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      id: 3,
      nome: "Empresa XYZ Ltda",
      tipo: "Pessoa Jurídica",
      cpfCnpj: "12.345.678/0001-90",
      email: "contato@empresaxyz.com.br",
      telefone: "(11) 77777-7777",
      endereco: "Belo Horizonte, MG",
      status: "Ativo",
      dataInicio: "10/03/2024",
      valorTotal: "R$ 250.000",
      processos: 1,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-green-100 text-green-800";
      case "Inativo": return "bg-gray-100 text-gray-800";
      case "Prospect": return "bg-blue-100 text-blue-800";
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
                <h1 className="text-2xl font-semibold text-foreground">Gestão de Clientes</h1>
                <p className="text-sm text-muted-foreground">Gerencie todos os clientes do escritório</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input className="pl-10 w-64" placeholder="Buscar clientes..." />
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
                <h3 className="text-2xl font-bold text-foreground mb-1">156</h3>
                <p className="text-sm text-muted-foreground">Total de Clientes</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">✅</span>
                  <span className="text-sm text-green-600 font-medium">+8%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">142</h3>
                <p className="text-sm text-muted-foreground">Clientes Ativos</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">🔄</span>
                  <span className="text-sm text-blue-600 font-medium">+3%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">8</h3>
                <p className="text-sm text-muted-foreground">Novos este Mês</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">💰</span>
                  <span className="text-sm text-green-600 font-medium">+15%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">R$ 2,8M</h3>
                <p className="text-sm text-muted-foreground">Valor Total Contratos</p>
              </div>
            </div>

            {/* Lista de Clientes */}
            <div className="bg-card rounded-2xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-foreground">Lista de Clientes</h2>
              </div>
              
              <div className="divide-y">
                {clientes.map((cliente) => (
                  <div key={cliente.id} className="p-6 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={cliente.avatar} />
                          <AvatarFallback>{cliente.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="font-semibold text-foreground">{cliente.nome}</h3>
                          <p className="text-sm text-muted-foreground">{cliente.tipo} • {cliente.cpfCnpj}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{cliente.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{cliente.telefone}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{cliente.endereco}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">{cliente.processos}</p>
                          <p className="text-xs text-muted-foreground">Processos</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">{cliente.valorTotal}</p>
                          <p className="text-xs text-muted-foreground">Valor Total</p>
                        </div>
                        
                        <div className="text-center">
                          <Badge className={`text-xs ${getStatusColor(cliente.status)}`}>
                            {cliente.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">Desde {cliente.dataInicio}</p>
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

export default Clientes;
