
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Video } from "lucide-react";
import { getTodayAppointments } from "@/services/appointmentService";
import { Appointment } from "@/types/appointment";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ScheduledCalls = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTodayAppointments();
  }, []);

  const loadTodayAppointments = async () => {
    try {
      setIsLoading(true);
      const data = await getTodayAppointments();
      setAppointments(data.slice(0, 4)); // Limitar a 4 compromissos
    } catch (error) {
      console.error('Erro ao carregar compromissos de hoje:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (appointment: Appointment) => {
    if (!appointment.is_confirmed) return "bg-yellow-100 text-yellow-800";
    
    if (appointment.appointment_type === "deadline") {
      return "bg-red-100 text-red-800";
    }
    
    return "bg-green-100 text-green-800";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hearing": return <Calendar className="w-4 h-4" />;
      case "meeting": return <Clock className="w-4 h-4" />;
      case "deadline": return <MapPin className="w-4 h-4" />;
      case "consultation":
      default: return <Video className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "hearing": return "Audiência";
      case "meeting": return "Reunião";
      case "deadline": return "Prazo";
      case "consultation": return "Consulta";
      default: return type;
    }
  };

  const getStatusLabel = (appointment: Appointment) => {
    if (!appointment.is_confirmed) return "Pendente";
    if (appointment.appointment_type === "deadline") return "Urgente";
    return "Confirmada";
  };

  if (isLoading) {
    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Agenda de Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4 text-muted-foreground">
            Carregando...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Agenda de Hoje</CardTitle>
        <p className="text-sm text-muted-foreground">
          {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
              <div className="text-center min-w-[60px]">
                <p className="text-sm font-medium text-foreground">
                  {format(new Date(appointment.start_time), "HH:mm")}
                </p>
                <div className="mt-1 text-muted-foreground">
                  {getTypeIcon(appointment.appointment_type)}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{appointment.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {appointment.client_name || "Sem cliente associado"}
                    </p>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={`https://avatar.vercel.sh/${appointment.assigned_to}?size=32`} />
                    <AvatarFallback>
                      {appointment.assigned_to_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'NA'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    {appointment.location || "Local não especificado"}
                  </p>
                </div>
                
                <Badge className={`text-xs ${getStatusColor(appointment)}`}>
                  {getStatusLabel(appointment)}
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-muted-foreground">
            Nenhum compromisso para hoje
          </div>
        )}
        
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
