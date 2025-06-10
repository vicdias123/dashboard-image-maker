/*
  # Sistema Completo de Escritório de Advocacia

  1. Tabelas Principais
    - `profiles` - Perfis de usuários (Admin, Advogado, Estagiário)
    - `clients` - Clientes do escritório
    - `cases` - Processos/casos jurídicos
    - `documents` - Documentos e arquivos
    - `appointments` - Agenda e compromissos
    - `tasks` - Tarefas e prazos
    - `invoices` - Faturas e cobrança
    - `payments` - Pagamentos recebidos
    - `time_entries` - Controle de horas trabalhadas
    - `notifications` - Sistema de notificações
    - `audit_logs` - Log de auditoria
    - `reports` - Relatórios salvos
    - `case_updates` - Atualizações de processos
    - `client_contacts` - Contatos dos clientes
    - `document_categories` - Categorias de documentos

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas baseadas em perfis de usuário
    - Auditoria completa de ações

  3. Funcionalidades
    - CRUD completo para todos os módulos
    - Sistema de upload de arquivos
    - Notificações automáticas
    - Relatórios dinâmicos
*/

-- Enum types
CREATE TYPE user_role AS ENUM ('admin', 'lawyer', 'intern', 'client');
CREATE TYPE case_status AS ENUM ('active', 'pending', 'closed', 'suspended');
CREATE TYPE case_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE appointment_type AS ENUM ('hearing', 'meeting', 'deadline', 'consultation');
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');
CREATE TYPE notification_type AS ENUM ('deadline', 'appointment', 'payment', 'case_update', 'system');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  phone text,
  avatar_url text,
  oab_number text,
  specialties text[],
  hourly_rate decimal(10,2),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  document_number text, -- CPF/CNPJ
  client_type text CHECK (client_type IN ('individual', 'company')),
  address jsonb,
  notes text,
  status text DEFAULT 'active',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Client contacts table
CREATE TABLE IF NOT EXISTS client_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  position text,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Cases table
CREATE TABLE IF NOT EXISTS cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  responsible_lawyer_id uuid REFERENCES profiles(id),
  case_type text NOT NULL,
  status case_status DEFAULT 'active',
  priority case_priority DEFAULT 'medium',
  court text,
  case_value decimal(15,2),
  start_date date,
  expected_end_date date,
  actual_end_date date,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Document categories table
CREATE TABLE IF NOT EXISTS document_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  color text DEFAULT '#3b82f6',
  created_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  file_path text NOT NULL,
  file_size bigint,
  mime_type text,
  case_id uuid REFERENCES cases(id) ON DELETE CASCADE,
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  category_id uuid REFERENCES document_categories(id),
  version text DEFAULT '1.0',
  is_confidential boolean DEFAULT false,
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  appointment_type appointment_type NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  location text,
  case_id uuid REFERENCES cases(id) ON DELETE CASCADE,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES profiles(id),
  is_confirmed boolean DEFAULT false,
  reminder_sent boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  case_id uuid REFERENCES cases(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES profiles(id),
  status task_status DEFAULT 'pending',
  priority case_priority DEFAULT 'medium',
  due_date timestamptz,
  completed_at timestamptz,
  estimated_hours decimal(5,2),
  actual_hours decimal(5,2),
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Time entries table
CREATE TABLE IF NOT EXISTS time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES cases(id) ON DELETE CASCADE,
  task_id uuid REFERENCES tasks(id) ON DELETE SET NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  description text NOT NULL,
  hours decimal(5,2) NOT NULL,
  hourly_rate decimal(10,2),
  billable boolean DEFAULT true,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  case_id uuid REFERENCES cases(id) ON DELETE SET NULL,
  amount decimal(15,2) NOT NULL,
  tax_amount decimal(15,2) DEFAULT 0,
  total_amount decimal(15,2) NOT NULL,
  status invoice_status DEFAULT 'draft',
  issue_date date NOT NULL,
  due_date date NOT NULL,
  paid_date date,
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Invoice items table
CREATE TABLE IF NOT EXISTS invoice_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(id) ON DELETE CASCADE,
  description text NOT NULL,
  quantity decimal(10,2) DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(15,2) NOT NULL,
  time_entry_id uuid REFERENCES time_entries(id) ON DELETE SET NULL
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(id) ON DELETE CASCADE,
  amount decimal(15,2) NOT NULL,
  payment_method text,
  payment_date date NOT NULL,
  reference_number text,
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Case updates table
CREATE TABLE IF NOT EXISTS case_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES cases(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  is_internal boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type notification_type NOT NULL,
  related_id uuid, -- ID of related record (case, appointment, etc.)
  is_read boolean DEFAULT false,
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  query_config jsonb NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Clients policies
CREATE POLICY "Lawyers and admins can manage clients" ON clients
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

-- Client contacts policies
CREATE POLICY "Staff can manage client contacts" ON client_contacts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer', 'intern')
    )
  );

-- Cases policies
CREATE POLICY "Lawyers and admins can manage cases" ON cases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer')
    )
  );

CREATE POLICY "Interns can read cases" ON cases
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer', 'intern')
    )
  );

CREATE POLICY "Clients can read their cases" ON cases
  FOR SELECT USING (
    client_id IN (
      SELECT id FROM clients WHERE id = client_id
    ) AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'client'
    )
  );

-- Document categories policies
CREATE POLICY "Staff can manage document categories" ON document_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer')
    )
  );

CREATE POLICY "All staff can read document categories" ON document_categories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer', 'intern')
    )
  );

-- Documents policies
CREATE POLICY "Staff can manage documents" ON documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer', 'intern')
    )
  );

-- Appointments policies
CREATE POLICY "Staff can manage appointments" ON appointments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer', 'intern')
    )
  );

-- Tasks policies
CREATE POLICY "Staff can manage tasks" ON tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer', 'intern')
    )
  );

-- Time entries policies
CREATE POLICY "Users can manage own time entries" ON time_entries
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all time entries" ON time_entries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Invoices policies
CREATE POLICY "Lawyers and admins can manage invoices" ON invoices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer')
    )
  );

-- Invoice items policies
CREATE POLICY "Lawyers and admins can manage invoice items" ON invoice_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer')
    )
  );

-- Payments policies
CREATE POLICY "Lawyers and admins can manage payments" ON payments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer')
    )
  );

-- Case updates policies
CREATE POLICY "Staff can manage case updates" ON case_updates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer', 'intern')
    )
  );

-- Notifications policies
CREATE POLICY "Users can read own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" ON notifications
  FOR INSERT WITH CHECK (true);

-- Audit logs policies
CREATE POLICY "Admins can read audit logs" ON audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can create audit logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- Reports policies
CREATE POLICY "Users can read own reports" ON reports
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can read public reports" ON reports
  FOR SELECT USING (is_public = true);

CREATE POLICY "Staff can create reports" ON reports
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'lawyer')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cases_client_id ON cases(client_id);
CREATE INDEX IF NOT EXISTS idx_cases_responsible_lawyer_id ON cases(responsible_lawyer_id);
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_documents_case_id ON documents(case_id);
CREATE INDEX IF NOT EXISTS idx_appointments_start_time ON appointments(start_time);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_time_entries_user_id ON time_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_date ON time_entries(date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Insert default document categories
INSERT INTO document_categories (name, description, color) VALUES
  ('Petições', 'Petições iniciais e manifestações', '#3b82f6'),
  ('Contratos', 'Contratos e acordos', '#10b981'),
  ('Procurações', 'Procurações e mandatos', '#8b5cf6'),
  ('Certidões', 'Certidões e documentos oficiais', '#f59e0b'),
  ('Laudos', 'Laudos técnicos e perícias', '#ef4444'),
  ('Correspondências', 'E-mails e correspondências', '#6b7280')
ON CONFLICT (name) DO NOTHING;