
-- Criando a tabela de clients
CREATE TABLE IF NOT EXISTS public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  document_number text,
  client_type text CHECK (client_type IN ('individual', 'company')),
  address jsonb,
  notes text,
  status text DEFAULT 'active',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Aplicando Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Criando políticas de segurança
CREATE POLICY "Staff can manage clients" ON clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer')
    )
  );

CREATE POLICY "Interns can read clients" ON clients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer', 'intern')
    )
  );

-- Inserindo dados de exemplo
INSERT INTO clients (name, email, phone, document_number, client_type, status, address, notes)
VALUES 
  ('Maria Silva Santos', 'maria.santos@email.com', '(11) 99999-9999', '123.456.789-00', 'individual', 'active', '{"street":"Rua das Flores, 123","city":"São Paulo","state":"SP","zipcode":"01234-567","country":"Brasil"}', 'Cliente desde janeiro, casos na área criminal.'),
  ('João Carlos Oliveira', 'joao.oliveira@email.com', '(11) 88888-8888', '987.654.321-00', 'individual', 'active', '{"street":"Av. Paulista, 1578","city":"Rio de Janeiro","state":"RJ","zipcode":"20000-000","country":"Brasil"}', 'Recomendado pelo Dr. Mário. Procura assistência em questões trabalhistas.'),
  ('Empresa XYZ Ltda', 'contato@empresaxyz.com.br', '(11) 77777-7777', '12.345.678/0001-90', 'company', 'active', '{"street":"Rua dos Negócios, 500","city":"Belo Horizonte","state":"MG","zipcode":"30000-000","country":"Brasil"}', 'Grande cliente corporativo, múltiplos processos tributários.'),
  ('Ana Beatriz Costa', 'ana.costa@email.com', '(11) 66666-6666', '111.222.333-44', 'individual', 'inactive', '{"street":"Rua das Palmeiras, 45","city":"Curitiba","state":"PR","zipcode":"80000-000","country":"Brasil"}', 'Cliente inativo desde 2023.'),
  ('Comércio Rápido S.A.', 'contato@comerciorapido.com.br', '(11) 55555-5555', '98.765.432/0001-10', 'company', 'active', '{"street":"Av. do Comércio, 1000","city":"Salvador","state":"BA","zipcode":"40000-000","country":"Brasil"}', 'Empresa de médio porte, processos comerciais e trabalhistas.')
ON CONFLICT DO NOTHING;
