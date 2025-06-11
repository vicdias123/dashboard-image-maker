
import { supabase } from '@/integrations/supabase/client';
import { Appointment, AppointmentFormData } from '@/types/appointment';

// Dados simulados para desenvolvimento
const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Audiência Criminal',
    description: 'Audiência de instrução e julgamento no Tribunal de Justiça',
    appointment_type: 'hearing',
    start_time: new Date().toISOString(),
    end_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // +2 horas
    location: 'Fórum Central - Sala 205',
    case_id: 'case-1',
    case_title: 'Processo Criminal 123/2024',
    client_id: 'client-1',
    client_name: 'João Silva',
    assigned_to: 'lawyer-1',
    assigned_to_name: 'Dr. Maria Santos',
    is_confirmed: true,
    reminder_sent: false,
    created_by: 'user-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Reunião com Cliente',
    description: 'Discussão sobre estratégia processual',
    appointment_type: 'meeting',
    start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // +1 dia
    end_time: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
    location: 'Escritório - Sala de Reuniões',
    case_id: 'case-2',
    case_title: 'Processo Trabalhista 456/2024',
    client_id: 'client-2',
    client_name: 'Ana Costa',
    assigned_to: 'lawyer-2',
    assigned_to_name: 'Dr. Carlos Lima',
    is_confirmed: false,
    reminder_sent: true,
    created_by: 'user-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const getAppointments = async (
  startDate?: Date,
  endDate?: Date,
  userId?: string
): Promise<Appointment[]> => {
  try {
    console.log('Buscando compromissos:', { startDate, endDate, userId });
    
    // Por enquanto, retorna dados simulados
    // TODO: Implementar consulta real quando as tabelas forem criadas
    let filteredAppointments = mockAppointments;

    if (startDate) {
      filteredAppointments = filteredAppointments.filter(
        appointment => new Date(appointment.start_time) >= startDate
      );
    }

    if (endDate) {
      filteredAppointments = filteredAppointments.filter(
        appointment => new Date(appointment.start_time) <= endDate
      );
    }

    if (userId) {
      filteredAppointments = filteredAppointments.filter(
        appointment => appointment.assigned_to === userId
      );
    }

    return filteredAppointments;
  } catch (error) {
    console.error('Erro ao buscar compromissos:', error);
    return mockAppointments; // Fallback para dados simulados
  }
};

export const getAppointmentsByDate = async (
  date: Date,
): Promise<Appointment[]> => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return getAppointments(startOfDay, endOfDay);
};

export const getTodayAppointments = async (): Promise<Appointment[]> => {
  return getAppointmentsByDate(new Date());
};

export const getWeekAppointments = async (): Promise<Appointment[]> => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return getAppointments(startOfWeek, endOfWeek);
};

export const createAppointment = async (data: AppointmentFormData): Promise<Appointment> => {
  try {
    console.log('Criando compromisso:', data);
    
    // Por enquanto, simula a criação
    const newAppointment: Appointment = {
      id: `appointment-${Date.now()}`,
      title: data.title,
      description: data.description,
      appointment_type: data.appointment_type,
      start_time: data.start_time.toISOString(),
      end_time: data.end_time.toISOString(),
      location: data.location,
      case_id: data.case_id || null,
      case_title: null,
      client_id: data.client_id || null,
      client_name: null,
      assigned_to: data.assigned_to,
      assigned_to_name: null,
      is_confirmed: data.is_confirmed,
      reminder_sent: false,
      created_by: 'current-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Adiciona aos dados simulados
    mockAppointments.push(newAppointment);
    
    return newAppointment;
  } catch (error) {
    console.error('Erro ao criar compromisso:', error);
    throw error;
  }
};

export const updateAppointment = async (id: string, data: Partial<AppointmentFormData>): Promise<Appointment> => {
  try {
    console.log('Atualizando compromisso:', id, data);
    
    // Por enquanto, simula a atualização
    const appointmentIndex = mockAppointments.findIndex(app => app.id === id);
    if (appointmentIndex === -1) {
      throw new Error('Compromisso não encontrado');
    }

    const updatedAppointment: Appointment = {
      ...mockAppointments[appointmentIndex],
      ...data,
      start_time: data.start_time ? data.start_time.toISOString() : mockAppointments[appointmentIndex].start_time,
      end_time: data.end_time ? data.end_time.toISOString() : mockAppointments[appointmentIndex].end_time,
      updated_at: new Date().toISOString()
    };

    mockAppointments[appointmentIndex] = updatedAppointment;
    
    return updatedAppointment;
  } catch (error) {
    console.error('Erro ao atualizar compromisso:', error);
    throw error;
  }
};

export const deleteAppointment = async (id: string): Promise<void> => {
  try {
    console.log('Excluindo compromisso:', id);
    
    // Por enquanto, simula a exclusão
    const appointmentIndex = mockAppointments.findIndex(app => app.id === id);
    if (appointmentIndex === -1) {
      throw new Error('Compromisso não encontrado');
    }

    mockAppointments.splice(appointmentIndex, 1);
  } catch (error) {
    console.error('Erro ao excluir compromisso:', error);
    throw error;
  }
};
