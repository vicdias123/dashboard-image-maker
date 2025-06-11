
import { supabase } from '@/integrations/supabase/client';
import { Appointment, AppointmentFormData } from '@/types/appointment';
import { format } from 'date-fns';

export const getAppointments = async (
  startDate?: Date,
  endDate?: Date,
  userId?: string
): Promise<Appointment[]> => {
  try {
    // Converter datas para formato ISO se fornecidas
    const startDateISO = startDate ? startDate.toISOString() : null;
    const endDateISO = endDate ? endDate.toISOString() : null;

    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id, title, description, appointment_type, start_time, end_time, location,
        case_id, client_id, assigned_to, is_confirmed, reminder_sent, created_by,
        created_at, updated_at,
        cases:case_id(title),
        clients:client_id(name),
        profiles:assigned_to(name)
      `)
      .gte(startDateISO ? 'start_time' : 'created_at', startDateISO || '1970-01-01')
      .lte(endDateISO ? 'start_time' : 'created_at', endDateISO || new Date().toISOString())
      .eq(userId ? 'assigned_to' : 'id', userId || 'id')
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Erro ao buscar compromissos:', error);
      throw error;
    }

    return data.map(item => ({
      ...item,
      case_title: item.cases?.title || null,
      client_name: item.clients?.name || null,
      assigned_to_name: item.profiles?.name || null
    })) as Appointment[];
  } catch (error) {
    console.error('Erro ao processar compromissos:', error);
    throw error;
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
    const { data: newAppointment, error } = await supabase
      .from('appointments')
      .insert([
        {
          title: data.title,
          description: data.description,
          appointment_type: data.appointment_type,
          start_time: data.start_time.toISOString(),
          end_time: data.end_time.toISOString(),
          location: data.location,
          case_id: data.case_id || null,
          client_id: data.client_id || null,
          assigned_to: data.assigned_to,
          is_confirmed: data.is_confirmed
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar compromisso:', error);
      throw error;
    }

    return newAppointment as Appointment;
  } catch (error) {
    console.error('Erro ao processar criação de compromisso:', error);
    throw error;
  }
};

export const updateAppointment = async (id: string, data: Partial<AppointmentFormData>): Promise<Appointment> => {
  try {
    let updateData: any = { ...data };
    
    // Converter datas para ISO string
    if (data.start_time instanceof Date) {
      updateData.start_time = data.start_time.toISOString();
    }
    
    if (data.end_time instanceof Date) {
      updateData.end_time = data.end_time.toISOString();
    }

    const { data: updatedAppointment, error } = await supabase
      .from('appointments')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar compromisso:', error);
      throw error;
    }

    return updatedAppointment as Appointment;
  } catch (error) {
    console.error('Erro ao processar atualização de compromisso:', error);
    throw error;
  }
};

export const deleteAppointment = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir compromisso:', error);
      throw error;
    }
  } catch (error) {
    console.error('Erro ao processar exclusão de compromisso:', error);
    throw error;
  }
};
