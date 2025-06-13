
import { supabase } from '@/integrations/supabase/client';
import { Appointment, AppointmentFormData, validateAndMapAppointment } from '@/types/appointment';

export const getAppointments = async (
  startDate?: Date,
  endDate?: Date,
  userId?: string
): Promise<Appointment[]> => {
  try {
    console.log('Buscando compromissos:', { startDate, endDate, userId });
    
    let query = supabase
      .from('appointments')
      .select('*')
      .order('start_time', { ascending: true });

    if (startDate) {
      query = query.gte('start_time', startDate.toISOString());
    }

    if (endDate) {
      query = query.lte('start_time', endDate.toISOString());
    }

    if (userId) {
      query = query.eq('assigned_to', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar compromissos:', error);
      throw error;
    }

    // Validar e mapear cada item usando a função de validação
    return (data || []).map(validateAndMapAppointment);
  } catch (error) {
    console.error('Erro ao buscar compromissos:', error);
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
    console.log('Criando compromisso:', data);
    
    const appointmentData = {
      title: data.title,
      description: data.description,
      appointment_type: data.appointment_type,
      start_time: data.start_time.toISOString(),
      end_time: data.end_time.toISOString(),
      location: data.location,
      case_id: data.case_id || null,
      client_id: data.client_id || null,
      assigned_to: data.assigned_to,
      is_confirmed: data.is_confirmed,
      reminder_sent: false,
      created_by: data.assigned_to // Por enquanto, usando o assigned_to como created_by
    };

    const { data: newAppointment, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar compromisso:', error);
      throw error;
    }

    // Validar e mapear o resultado usando a função de validação
    return validateAndMapAppointment(newAppointment);
  } catch (error) {
    console.error('Erro ao criar compromisso:', error);
    throw error;
  }
};

export const updateAppointment = async (id: string, data: Partial<AppointmentFormData>): Promise<Appointment> => {
  try {
    console.log('Atualizando compromisso:', id, data);
    
    const updateData: any = { ...data };
    
    if (data.start_time) {
      updateData.start_time = data.start_time.toISOString();
    }
    
    if (data.end_time) {
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

    // Validar e mapear o resultado usando a função de validação
    return validateAndMapAppointment(updatedAppointment);
  } catch (error) {
    console.error('Erro ao atualizar compromisso:', error);
    throw error;
  }
};

export const deleteAppointment = async (id: string): Promise<void> => {
  try {
    console.log('Excluindo compromisso:', id);
    
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir compromisso:', error);
      throw error;
    }
  } catch (error) {
    console.error('Erro ao excluir compromisso:', error);
    throw error;
  }
};
