
import { useState, useEffect } from "react";
import { Calendar, Clock, Video, MapPin, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";
import AppointmentDialog from "@/components/AppointmentDialog";
import { useToast } from "@/hooks/use-toast";
import { Appointment } from "@/types/appointment";
import { getAppointments, getTodayAppointments, getWeekAppointments } from "@/services/appointmentService";
import { cn } from "@/lib/utils";

const AgendaPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    online: 0,
    urgent: 0
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAppointments();
    loadStats();
  }, [selectedDate]);

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const startDate = startOfWeek(selectedDate);
      const endDate = endOfWeek(selectedDate);
      const data = await getAppointments(startDate, endDate);
      setAppointments(data);
    } catch (error) {
      console.error("Erro ao carregar compromissos:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os compromissos.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const todayData = await getTodayAppointments();
      const weekData = await getWeekAppointments();
      
      setStats({
        today: todayData.length,
        week: weekData.length,
        online: weekData.filter(a => a.location?.toLowerCase().includes('online') || a.location?.toLowerCase().includes('zoom') || a.location?.toLowerCase().includes('teams')).length,
        urgent: weekData.filter(a => a.appointment_type === "deadline").length
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
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

  const getAppointmentStatusLabel = (appointment: Appointment) => {
    if (!appointment.is_confirmed) return "Pendente";
    if (appointment.appointment_type === "deadline") return "Urgente";
    return "Confirmada";
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const getDaysInMonth = () => {
    const start = startOfWeek(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));
    const end = endOfWeek(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0));
    return eachDayOfInterval({ start, end });
  };

  const filteredAppointments = appointments.filter(appointment => 
    isSameDay(parseISO(appointment.start_time), selectedDate)
  );

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
                
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setDialogOpen(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Novo Compromisso
                </Button>
              </div>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">Hoje</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stats.today}</h3>
                <p className="text-sm text-muted-foreground">Compromissos</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Semana</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stats.week}</h3>
                <p className="text-sm text-muted-foreground">Agendados</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Video className="w-8 h-8 text-purple-600" />
                  <span className="text-sm text-purple-600 font-medium">Online</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stats.online}</h3>
                <p className="text-sm text-muted-foreground">Reuniões Virtuais</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <MapPin className="w-8 h-8 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">Urgente</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stats.urgent}</h3>
                <p className="text-sm text-muted-foreground">Prazos</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Calendário Compacto */}
              <div className="col-span-1">
                <div className="bg-card rounded-2xl border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">
                      {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={handlePreviousMonth}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={handleNextMonth}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    <div className="font-medium text-muted-foreground p-2">D</div>
                    <div className="font-medium text-muted-foreground p-2">S</div>
                    <div className="font-medium text-muted-foreground p-2">T</div>
                    <div className="font-medium text-muted-foreground p-2">Q</div>
                    <div className="font-medium text-muted-foreground p-2">Q</div>
                    <div className="font-medium text-muted-foreground p-2">S</div>
                    <div className="font-medium text-muted-foreground p-2">S</div>
                    
                    {getDaysInMonth().map((day, i) => {
                      // Encontrar compromissos para este dia
                      const hasAppointment = appointments.some(app => 
                        isSameDay(parseISO(app.start_time), day)
                      );
                      
                      return (
                        <div 
                          key={i} 
                          className={cn(
                            "p-2 rounded cursor-pointer hover:bg-accent transition-colors text-sm",
                            isSameDay(day, selectedDate) ? "bg-primary text-primary-foreground" : 
                            hasAppointment ? "bg-accent text-accent-foreground" : 
                            !isSameMonth(day, currentMonth) ? "text-muted-foreground opacity-50" : 
                            "text-foreground"
                          )}
                          onClick={() => handleDateClick(day)}
                        >
                          {format(day, 'd')}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 bg-card rounded-2xl border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Próximos Prazos</h2>
                  
                  <div className="space-y-3">
                    {appointments
                      .filter(app => app.appointment_type === 'deadline')
                      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
                      .slice(0, 3)
                      .map((deadline, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{deadline.title}</p>
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-1" />
                              {format(new Date(deadline.start_time), 'dd/MM/yyyy')}
                            </div>
                          </div>
                          <Badge className="bg-red-100 text-red-800">Urgente</Badge>
                        </div>
                      ))}
                      
                    {appointments.filter(app => app.appointment_type === 'deadline').length === 0 && (
                      <div className="text-center p-4 text-muted-foreground">
                        Nenhum prazo próximo
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Lista de Compromissos */}
              <div className="col-span-1 md:col-span-2">
                <Tabs defaultValue="lista">
                  <div className="bg-card rounded-2xl border">
                    <div className="p-6 border-b flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Compromissos</h2>
                        <p className="text-sm text-muted-foreground">
                          {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
                        </p>
                      </div>

                      <TabsList>
                        <TabsTrigger value="lista">Lista</TabsTrigger>
                        <TabsTrigger value="agenda">Agenda</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="lista" className="p-6 space-y-4">
                      {isLoading ? (
                        <div className="text-center p-6">Carregando...</div>
                      ) : filteredAppointments.length > 0 ? (
                        filteredAppointments.map((compromisso) => (
                          <div 
                            key={compromisso.id} 
                            className={`p-4 rounded-lg border-l-4 ${getStatusColor(compromisso)} hover:shadow-md transition-all bg-card`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                <div className="text-muted-foreground mt-1">
                                  {getTypeIcon(compromisso.appointment_type)}
                                </div>
                                
                                <div className="flex-1">
                                  <h3 className="font-semibold text-foreground mb-1">{compromisso.title}</h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {compromisso.client_name || "Sem cliente associado"}
                                  </p>
                                  
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      <span>{format(new Date(compromisso.start_time), "dd/MM/yyyy")}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      <span>
                                        {format(new Date(compromisso.start_time), "HH:mm")} - 
                                        {format(new Date(compromisso.end_time), "HH:mm")}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      <span>{compromisso.location || "Local não especificado"}</span>
                                    </div>
                                  </div>
                                  
                                  <p className="text-xs text-muted-foreground mt-2">
                                    Responsável: {compromisso.assigned_to_name || "Não atribuído"}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                {compromisso.assigned_to_name && (
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={`https://avatar.vercel.sh/${compromisso.assigned_to}?size=32`} />
                                    <AvatarFallback>
                                      {compromisso.assigned_to_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                
                                <Badge className={`text-xs ${getStatusColor(compromisso)}`}>
                                  {getAppointmentStatusLabel(compromisso)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-6 text-muted-foreground">
                          Nenhum compromisso para esta data. Clique em "Novo Compromisso" para adicionar.
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="agenda" className="p-6">
                      <div className="space-y-6">
                        {isLoading ? (
                          <div className="text-center p-6">Carregando...</div>
                        ) : filteredAppointments.length > 0 ? (
                          <>
                            <div className="grid grid-cols-1 gap-2">
                              {Array.from({ length: 24 }).map((_, hour) => {
                                const hourAppointments = filteredAppointments.filter(app => {
                                  const startHour = new Date(app.start_time).getHours();
                                  return startHour === hour;
                                });
                                
                                if (hourAppointments.length === 0) return null;
                                
                                return (
                                  <div key={hour} className="group">
                                    <div className="flex items-center gap-4">
                                      <div className="w-16 text-right text-sm font-medium text-muted-foreground">
                                        {hour.toString().padStart(2, '0')}:00
                                      </div>
                                      
                                      <div className="flex-1 min-h-[64px] space-y-1">
                                        {hourAppointments.map((app) => (
                                          <div 
                                            key={app.id}
                                            className={`p-2 rounded-md text-sm ${
                                              app.appointment_type === 'deadline' ? 'bg-red-100 border border-red-200' :
                                              app.appointment_type === 'hearing' ? 'bg-blue-100 border border-blue-200' :
                                              app.appointment_type === 'consultation' ? 'bg-purple-100 border border-purple-200' :
                                              'bg-green-100 border border-green-200'
                                            }`}
                                          >
                                            <div className="flex items-center justify-between">
                                              <span className="font-medium">
                                                {format(new Date(app.start_time), 'HH:mm')} - {app.title}
                                              </span>
                                              <Badge variant="outline" className="text-xs">
                                                {getTypeLabel(app.appointment_type)}
                                              </Badge>
                                            </div>
                                            <p className="text-xs mt-1 text-muted-foreground">
                                              {app.location || 'Sem localização'}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            
                            {filteredAppointments.length === 0 && (
                              <div className="text-center p-6 text-muted-foreground">
                                Nenhum compromisso agendado para o horário de hoje.
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center p-6 text-muted-foreground">
                            Nenhum compromisso para esta data. Clique em "Novo Compromisso" para adicionar.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
        
        <AppointmentDialog 
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSuccess={loadAppointments}
          initialData={{
            start_time: selectedDate,
            end_time: new Date(selectedDate.getTime() + 60 * 60 * 1000),
            assigned_to: "01234567-89ab-cdef-0123-456789abcdef" // Substitua pelo ID do usuário atual em produção
          }}
        />
      </div>
    </div>
  );
};

export default AgendaPage;
