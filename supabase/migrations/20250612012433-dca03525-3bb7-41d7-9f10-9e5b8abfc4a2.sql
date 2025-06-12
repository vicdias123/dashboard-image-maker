
-- Criando a tabela de processos/casos jurídicos
CREATE TABLE IF NOT EXISTS public.cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  process_number text NOT NULL UNIQUE,
  client_name text NOT NULL,
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  legal_area text NOT NULL,
  subject text NOT NULL,
  court text NOT NULL,
  case_value text,
  status text NOT NULL DEFAULT 'Em Andamento',
  priority text NOT NULL DEFAULT 'Média',
  responsible_lawyer text NOT NULL,
  distribution_date date,
  next_deadline date,
  avatar_url text,
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Aplicando Row Level Security
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- Políticas para cases - usuários autenticados podem ver e gerenciar casos
CREATE POLICY "Users can view cases" ON cases
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can create cases" ON cases
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update cases" ON cases
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Users can delete cases" ON cases
  FOR DELETE TO authenticated
  USING (true);

-- Criando índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_cases_client_id ON public.cases(client_id);
CREATE INDEX IF NOT EXISTS idx_cases_status ON public.cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_priority ON public.cases(priority);
CREATE INDEX IF NOT EXISTS idx_cases_next_deadline ON public.cases(next_deadline);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_cases_updated_at 
    BEFORE UPDATE ON public.cases 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
