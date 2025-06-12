
-- Criando a tabela de módulos/sessões do sistema
CREATE TABLE IF NOT EXISTS public.system_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  description text,
  icon text,
  route text NOT NULL UNIQUE,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criando a tabela de permissões por módulo
CREATE TABLE IF NOT EXISTS public.module_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES public.system_modules(id) ON DELETE CASCADE,
  role text NOT NULL,
  can_view boolean DEFAULT false,
  can_create boolean DEFAULT false,
  can_edit boolean DEFAULT false,
  can_delete boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(module_id, role)
);

-- Aplicando Row Level Security
ALTER TABLE public.system_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_permissions ENABLE ROW LEVEL SECURITY;

-- Políticas para system_modules
CREATE POLICY "Everyone can view active modules" ON system_modules
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage modules" ON system_modules
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para module_permissions
CREATE POLICY "Users can view their permissions" ON module_permissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = module_permissions.role
    )
  );

CREATE POLICY "Admins can manage permissions" ON module_permissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Inserindo os módulos/sessões do sistema
INSERT INTO system_modules (name, title, description, icon, route, sort_order) VALUES
  ('dashboard', 'Dashboard', 'Visão geral do sistema com estatísticas e resumos', 'LayoutDashboard', '/', 1),
  ('clients', 'Clientes', 'Gestão completa de clientes e prospects', 'Users', '/clientes', 2),
  ('cases', 'Processos', 'Acompanhamento de processos e casos jurídicos', 'FileText', '/processos', 3),
  ('calendar', 'Agenda', 'Calendário de compromissos e prazos', 'Calendar', '/agenda', 4),
  ('documents', 'Documentos', 'Gerenciamento de documentos e arquivos', 'FolderOpen', '/documentos', 5),
  ('financial', 'Financeiro', 'Controle financeiro e faturamento', 'DollarSign', '/financeiro', 6),
  ('team', 'Equipe', 'Gestão de usuários e colaboradores', 'Users2', '/equipe', 7),
  ('marketing', 'Marketing', 'Ferramentas de marketing e comunicação', 'Megaphone', '/marketing', 8),
  ('reports', 'Relatórios', 'Relatórios e análises do escritório', 'BarChart3', '/relatorios', 9),
  ('settings', 'Configurações', 'Configurações gerais do sistema', 'Settings', '/configuracoes', 10)
ON CONFLICT (route) DO NOTHING;

-- Inserindo permissões padrão para cada role
INSERT INTO module_permissions (module_id, role, can_view, can_create, can_edit, can_delete)
SELECT 
  sm.id,
  'admin',
  true,
  true,
  true,
  true
FROM system_modules sm
ON CONFLICT (module_id, role) DO NOTHING;

INSERT INTO module_permissions (module_id, role, can_view, can_create, can_edit, can_delete)
SELECT 
  sm.id,
  'lawyer',
  true,
  CASE WHEN sm.name IN ('clients', 'cases', 'documents', 'calendar', 'financial') THEN true ELSE false END,
  CASE WHEN sm.name IN ('clients', 'cases', 'documents', 'calendar') THEN true ELSE false END,
  CASE WHEN sm.name IN ('cases', 'documents') THEN true ELSE false END
FROM system_modules sm
ON CONFLICT (module_id, role) DO NOTHING;

INSERT INTO module_permissions (module_id, role, can_view, can_create, can_edit, can_delete)
SELECT 
  sm.id,
  'intern',
  CASE WHEN sm.name IN ('dashboard', 'clients', 'cases', 'documents', 'calendar', 'reports') THEN true ELSE false END,
  CASE WHEN sm.name IN ('documents', 'calendar') THEN true ELSE false END,
  CASE WHEN sm.name IN ('documents') THEN true ELSE false END,
  false
FROM system_modules sm
ON CONFLICT (module_id, role) DO NOTHING;

INSERT INTO module_permissions (module_id, role, can_view, can_create, can_edit, can_delete)
SELECT 
  sm.id,
  'client',
  CASE WHEN sm.name IN ('dashboard', 'cases', 'documents', 'calendar') THEN true ELSE false END,
  false,
  false,
  false
FROM system_modules sm
ON CONFLICT (module_id, role) DO NOTHING;
