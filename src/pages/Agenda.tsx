
import { Calendar, Clock, Video, MapPin, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

const Agenda = () => {
  const compromissos = [
    {
      id: 1,
      titulo: "Audiência de Conciliação",
      cliente: "Maria Silva Santos",
      tipo: "Audiência",
      data: "10/11/2024",
      horario: "09:00 - 10:30",
      local: "1ª Vara Cível - Fórum Central",
      status: "Confirmada",
      responsavel: "Dr. Vitor Dias",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      cor: "bg-blue-100 border-blue-300"
    },
    {
      id: 2,
      titulo: "Consultoria Empresarial",
      cliente: "João Carlos Oliveira",
      tipo: "Reunião",
      data: "10/11/2024",
      horario: "11:30 - 12:30",
      local: "Escritório - Sala 3",
      status: "Pendente",
      responsavel: "Dra. Ana Costa",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      cor: "bg-green-100 border-green-300"
    },
    {
      id: 3,
      titulo: "Reunião de Revisão Contratual",
      cliente: "Empresa XYZ Ltda",
      tipo: "Videoconferência",
      data: "10/11/2024",
      horario: "14:00 - 15:00",
      local: "Online - Teams",
      status: "Confirmada",
      responsavel: "Dr. Roberto Silva",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
      cor: "bg-purple-100 border-purple-300"
    },
    {
      id: 4,
      titulo: "Prazo - Contestação",
      cliente: "Pedro Santos",
      tipo: "Prazo",
      data: "13/11/2024",
      horario: "Até 18:00",
      local: "Processo nº 1234567-89.2024",
      status: "Urgente",
      responsavel: "Dr. Vitor Dias",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      cor: "bg-red-100 border-red-300"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmada": return "bg-green-100 text-green-800";
      case "Pendente": return "bg-yellow-100 text-yellow-800";
      case "Urgente": return "bg-red-100 text-red-800";
      case "Cancelada": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Audiência": return <Calendar className="w-4 h-4" />;
      case "Reunião": return <Clock className="w-4 h-4" />;
      case "Videoconferência": return <Video className="w-4 h-4" />;
      case "Prazo": return <MapPin className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
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
                <h1 className="text-2xl font-semibold text-foreground">Agenda</h1>
                <p className="text-sm text-muted-foreground">Gerencie seus compromissos e prazos</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Filtros
                </Button>
                
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus size={16} className="mr-2" />
                  Novo Compromisso
                </Button>
              </div>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">Hoje</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">4</h3>
                <p className="text-sm text-muted-foreground">Compromissos</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Semana</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">18</h3>
                <p className="text-sm text-muted-foreground">Agendados</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Video className="w-8 h-8 text-purple-600" />
                  <span className="text-sm text-purple-600 font-medium">Online</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">6</h3>
                <p className="text-sm text-muted-foreground">Reuniões Virtuais</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <MapPin className="w-8 h-8 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">Urgente</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">3</h3>
                <p className="text-sm text-muted-foreground">Prazos</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Calendário Compacto */}
              <div className="col-span-1">
                <div className="bg-card rounded-2xl border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Novembro 2024</h2>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    <div className="font-medium text-muted-foreground p-2">D</div>
                    <div className="font-medium text-muted-foreground p-2">S</div>
                    <div className="font-medium text-muted-foreground p-2">T</div>
                    <div className="font-medium text-muted-foreground p-2">Q</div>
                    <div className="font-medium text-muted-foreground p-2">Q</div>
                    <div className="font-medium text-muted-foreground p-2">S</div>
                    <div className="font-medium text-muted-foreground p-2">S</div>
                    
                    {Array.from({ length: 30 }, (_, i) => (
                      <div 
                        key={i + 1} 
                        className={`p-2 rounded cursor-pointer hover:bg-accent transition-colors ${
                          i + 1 === 10 ? 'bg-primary text-primary-foreground' : 
                          [13, 15, 20].includes(i + 1) ? 'bg-accent text-accent-foreground' : 
                          'text-foreground'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lista de Compromissos */}
              <div className="col-span-2">
                <div className="bg-card rounded-2xl border">
                  <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold text-foreground">Próximos Compromissos</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {compromissos.map((compromisso) => (
                      <div 
                        key={compromisso.id} 
                        className={`p-4 rounded-lg border-l-4 ${compromisso.cor} hover:shadow-md transition-all`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="text-muted-foreground mt-1">
                              {getTypeIcon(compromisso.tipo)}
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1">{compromisso.titulo}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{compromisso.cliente}</p>
                              
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{compromisso.data}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{compromisso.horario}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{compromisso.local}</span>
                                </div>
                              </div>
                              
                              <p className="text-xs text-muted-foreground mt-2">
                                Responsável: {compromisso.responsavel}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={compromisso.avatar} />
                              <AvatarFallback>{compromisso.cliente.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            
                            <Badge className={`text-xs ${getStatusColor(compromisso.status)}`}>
                              {compromisso.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Agenda;
