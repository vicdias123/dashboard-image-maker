
-- Criar tabela de compromissos/appointments
CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  appointment_type text NOT NULL CHECK (appointment_type IN ('hearing', 'meeting', 'deadline', 'consultation')),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  location text,
  case_id uuid REFERENCES public.cases(id) ON DELETE SET NULL,
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  assigned_to uuid, -- ID do usuário responsável
  assigned_to_name text, -- Nome do responsável (desnormalizado para performance)
  client_name text, -- Nome do cliente (desnormalizado para performance)
  is_confirmed boolean DEFAULT false,
  reminder_sent boolean DEFAULT false,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Aplicando Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Políticas para appointments - usuários autenticados podem ver e gerenciar compromissos
CREATE POLICY "Users can manage appointments" ON appointments
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Criando índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_appointments_start_time ON public.appointments(start_time);
CREATE INDEX IF NOT EXISTS idx_appointments_assigned_to ON public.appointments(assigned_to);
CREATE INDEX IF NOT EXISTS idx_appointments_case_id ON public.appointments(case_id);
CREATE INDEX IF NOT EXISTS idx_appointments_client_id ON public.appointments(client_id);

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_appointments_updated_at 
    BEFORE UPDATE ON public.appointments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Inserindo alguns dados de exemplo para testar
INSERT INTO appointments (title, description, appointment_type, start_time, end_time, location, assigned_to_name, client_name, is_confirmed) VALUES
  ('Audiência de Conciliação', 'Audiência para tentativa de acordo no processo trabalhista', 'hearing', '2024-06-13 09:00:00', '2024-06-13 10:30:00', '1ª Vara do Trabalho - Fórum Central', 'Dr. Vitor Dias Barbosa', 'Maria Silva Santos', true),
  ('Reunião Consultoria Empresarial', 'Reunião para revisão de contratos comerciais', 'meeting', '2024-06-13 11:30:00', '2024-06-13 12:30:00', 'Escritório - Sala 3', 'Dr. Vitor Dias Barbosa', 'João Carlos Oliveira', false),
  ('Reunião Virtual - Revisão Contratual', 'Análise de contratos societários', 'consultation', '2024-06-13 14:00:00', '2024-06-13 15:00:00', 'Online - Teams', 'Dr. Vitor Dias Barbosa', 'Empresa XYZ Ltda', true),
  ('Prazo - Contestação', 'Vencimento do prazo para apresentação de contestação', 'deadline', '2024-06-13 23:59:00', '2024-06-13 23:59:00', 'Processo nº 1234567-89.2024', 'Dr. Vitor Dias Barbosa', 'Pedro Santos', false),
  ('Audiência de Instrução', 'Audiência para colheita de provas testemunhais', 'hearing', '2024-06-14 10:00:00', '2024-06-14 12:00:00', '3ª Vara Cível - Fórum Regional', 'Dr. Vitor Dias Barbosa', 'Ana Beatriz Costa', true),
  ('Reunião com Cliente', 'Acompanhamento do andamento processual', 'meeting', '2024-06-14 15:30:00', '2024-06-14 16:30:00', 'Escritório - Sala 1', 'Dr. Vitor Dias Barbosa', 'Comércio Rápido S.A.', false);
