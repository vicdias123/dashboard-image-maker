
import { Search, SlidersHorizontal, Plus, Users, Clock, Target, Award, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

const Equipe = () => {
  const colaboradores = [
    {
      id: 1,
      nome: "Dr. Vitor Dias Barbosa",
      cargo: "Sócio Fundador",
      departamento: "Direção Executiva",
      oab: "OAB/SP 123.456",
      email: "vitor@escritorio.com.br",
      telefone: "(11) 99999-0001",
      dataAdmissao: "01/01/2015",
      horasMes: 180,
      metaHoras: 160,
      faturamento: "R$ 145.000",
      metaFaturamento: "R$ 120.000",
      processos: 18,
      status: "Ativo",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    },
    {
      id: 2,
      nome: "Dra. Ana Costa Silva",
      cargo: "Advogada Sênior",
      departamento: "Direito Civil",
      oab: "OAB/SP 234.567",
      email: "ana@escritorio.com.br",
      telefone: "(11) 99999-0002",
      dataAdmissao: "15/03/2018",
      horasMes: 175,
      metaHoras: 170,
      faturamento: "R$ 95.000",
      metaFaturamento: "R$ 85.000",
      processos: 25,
      status: "Ativo",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
    },
    {
      id: 3,
      nome: "Dr. Roberto Silva Mendes",
      cargo: "Advogado Pleno",
      departamento: "Direito Tributário",
      oab: "OAB/SP 345.678",
      email: "roberto@escritorio.com.br",
      telefone: "(11) 99999-0003",
      dataAdmissao: "10/07/2020",
      horasMes: 165,
      metaHoras: 160,
      faturamento: "R$ 78.000",
      metaFaturamento: "R$ 70.000",
      processos: 15,
      status: "Ativo",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      id: 4,
      nome: "Carla Oliveira Santos",
      cargo: "Estagiária",
      departamento: "Direito Civil",
      oab: "Graduanda",
      email: "carla@escritorio.com.br",
      telefone: "(11) 99999-0004",
      dataAdmissao: "01/02/2024",
      horasMes: 120,
      metaHoras: 120,
      faturamento: "-",
      metaFaturamento: "-",
      processos: 8,
      status: "Ativo",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-green-100 text-green-800";
      case "Férias": return "bg-blue-100 text-blue-800";
      case "Licença": return "bg-yellow-100 text-yellow-800";
      case "Inativo": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformanceColor = (atual: number, meta: number) => {
    const percentual = (atual / meta) * 100;
    if (percentual >= 100) return "text-green-600";
    if (percentual >= 80) return "text-yellow-600";
    return "text-red-600";
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
                <h1 className="text-2xl font-semibold text-foreground">Gestão de Equipe</h1>
                <p className="text-sm text-muted-foreground">Gerencie colaboradores e acompanhe a produtividade</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input className="pl-10 w-64" placeholder="Buscar colaboradores..." />
                </div>
                
                <Button variant="outline" size="sm">
                  <SlidersHorizontal size={16} className="mr-2" />
                  Filtros
                </Button>
                
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus size={16} className="mr-2" />
                  Novo Colaborador
                </Button>
              </div>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                  <span className="text-sm text-green-600 font-medium">+2</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">12</h3>
                <p className="text-sm text-muted-foreground">Total da Equipe</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+5%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">1.840</h3>
                <p className="text-sm text-muted-foreground">Horas Trabalhadas</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                  <span className="text-sm text-green-600 font-medium">103%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">R$ 318k</h3>
                <p className="text-sm text-muted-foreground">Faturamento Equipe</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Award className="w-8 h-8 text-orange-600" />
                  <span className="text-sm text-green-600 font-medium">95%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">66</h3>
                <p className="text-sm text-muted-foreground">Processos Ativos</p>
              </div>
            </div>

            {/* Lista de Colaboradores */}
            <div className="bg-card rounded-2xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-foreground">Equipe do Escritório</h2>
              </div>
              
              <div className="divide-y">
                {colaboradores.map((colaborador) => (
                  <div key={colaborador.id} className="p-6 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={colaborador.avatar} />
                          <AvatarFallback>{colaborador.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{colaborador.nome}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{colaborador.cargo} • {colaborador.departamento}</p>
                          <p className="text-sm text-muted-foreground mb-3">{colaborador.oab}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              <span>{colaborador.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{colaborador.telefone}</span>
                            </div>
                            <div>
                              <span className="font-medium">Admissão:</span> {colaborador.dataAdmissao}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className={`text-sm font-medium ${getPerformanceColor(colaborador.horasMes, colaborador.metaHoras)}`}>
                            {colaborador.horasMes}h
                          </p>
                          <p className="text-xs text-muted-foreground">Meta: {colaborador.metaHoras}h</p>
                          <p className="text-xs text-muted-foreground mt-1">Horas/Mês</p>
                        </div>
                        
                        {colaborador.faturamento !== "-" && (
                          <div className="text-center">
                            <p className="text-sm font-medium text-foreground">{colaborador.faturamento}</p>
                            <p className="text-xs text-muted-foreground">Meta: {colaborador.metaFaturamento}</p>
                            <p className="text-xs text-muted-foreground mt-1">Faturamento</p>
                          </div>
                        )}
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">{colaborador.processos}</p>
                          <p className="text-xs text-muted-foreground mt-1">Processos</p>
                        </div>
                        
                        <div className="text-center">
                          <Badge className={`text-xs ${getStatusColor(colaborador.status)}`}>
                            {colaborador.status}
                          </Badge>
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

export default Equipe;
