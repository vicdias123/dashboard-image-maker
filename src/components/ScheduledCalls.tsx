
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Video } from "lucide-react";

const ScheduledCalls = () => {
  const appointments = [
    {
      time: "09:00",
      type: "Audiência",
      title: "Audiência de Conciliação",
      client: "Maria Silva Santos",
      location: "1ª Vara Cível - Fórum Central",
      status: "Confirmada",
      priority: "high",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    {
      time: "11:30",
      type: "Reunião",
      title: "Consultoria Empresarial",
      client: "João Carlos Oliveira",
      location: "Escritório - Sala 3",
      status: "Pendente",
      priority: "medium",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      time: "14:00",
      type: "Videoconferência",
      title: "Reunião com Cliente - Revisão Contratual",
      client: "Empresa XYZ Ltda",
      location: "Online - Teams",
      status: "Confirmada",
      priority: "medium",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face"
    },
    {
      time: "16:30",
      type: "Prazo",
      title: "Vencimento - Contestação",
      client: "Pedro Santos",
      location: "Processo nº 1234567-89.2024",
      status: "Urgente",
      priority: "high",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmada": return "bg-green-100 text-green-800";
      case "Pendente": return "bg-yellow-100 text-yellow-800";
      case "Urgente": return "bg-red-100 text-red-800";
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
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Agenda de Hoje</CardTitle>
        <p className="text-sm text-muted-foreground">Terça-feira, 10 de Novembro</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
            <div className="text-center min-w-[60px]">
              <p className="text-sm font-medium text-foreground">{appointment.time}</p>
              <div className="mt-1 text-muted-foreground">
                {getTypeIcon(appointment.type)}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-foreground text-sm">{appointment.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{appointment.client}</p>
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={appointment.avatar} />
                  <AvatarFallback>{appointment.client.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{appointment.location}</p>
              </div>
              
              <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </Badge>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Próximos compromissos:</span>
            <span className="font-medium text-primary">+12 esta semana</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledCalls;
