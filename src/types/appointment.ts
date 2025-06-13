
import { Database } from "@/integrations/supabase/types";

export type AppointmentType = "hearing" | "meeting" | "deadline" | "consultation";

// Array para verificação em tempo de execução
export const validAppointmentTypes: AppointmentType[] = ["hearing", "meeting", "deadline", "consultation"];

// Type guard para garantir que uma string é um AppointmentType válido
export function isAppointmentType(value: any): value is AppointmentType {
  return typeof value === 'string' && validAppointmentTypes.includes(value as AppointmentType);
}

export type Appointment = {
  id: string;
  title: string;
  description: string | null;
  appointment_type: AppointmentType;
  start_time: string;
  end_time: string;
  location: string | null;
  case_id: string | null;
  case_title?: string | null;
  client_id: string | null;
  client_name?: string | null;
  assigned_to: string | null;
  assigned_to_name?: string | null;
  is_confirmed: boolean;
  reminder_sent: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type AppointmentFormData = {
  title: string;
  description: string;
  appointment_type: AppointmentType;
  start_time: Date;
  end_time: Date;
  location: string;
  case_id?: string;
  client_id?: string;
  assigned_to: string;
  is_confirmed: boolean;
};

// Função para validar e converter dados brutos da API em Appointment
export function validateAndMapAppointment(data: any): Appointment {
  if (!isAppointmentType(data.appointment_type)) {
    throw new TypeError(`Tipo de agendamento inválido recebido da API: ${data.appointment_type}. Valores válidos: ${validAppointmentTypes.join(', ')}`);
  }
  
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    appointment_type: data.appointment_type,
    start_time: data.start_time,
    end_time: data.end_time,
    location: data.location,
    case_id: data.case_id,
    case_title: data.case_title,
    client_id: data.client_id,
    client_name: data.client_name,
    assigned_to: data.assigned_to,
    assigned_to_name: data.assigned_to_name,
    is_confirmed: data.is_confirmed,
    reminder_sent: data.reminder_sent,
    created_by: data.created_by,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}
