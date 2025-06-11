
import { Database } from "@/integrations/supabase/types";

export type Appointment = {
  id: string;
  title: string;
  description: string | null;
  appointment_type: "hearing" | "meeting" | "deadline" | "consultation";
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
  appointment_type: "hearing" | "meeting" | "deadline" | "consultation";
  start_time: Date;
  end_time: Date;
  location: string;
  case_id?: string;
  client_id?: string;
  assigned_to: string;
  is_confirmed: boolean;
};
