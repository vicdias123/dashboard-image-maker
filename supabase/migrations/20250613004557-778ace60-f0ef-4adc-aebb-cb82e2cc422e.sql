
-- Remover políticas problemáticas da tabela clients que referenciam profiles
DROP POLICY IF EXISTS "Staff can manage clients" ON clients;
DROP POLICY IF EXISTS "Interns can read clients" ON clients;

-- Criar políticas mais simples para clients que não causem recursão
-- Por enquanto, permitir acesso completo para usuários autenticados
CREATE POLICY "Authenticated users can manage clients" ON clients
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
