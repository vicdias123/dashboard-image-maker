
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Case = Tables<"cases">;
export type CaseInsert = TablesInsert<"cases">;
export type CaseUpdate = TablesUpdate<"cases">;

// Buscar todos os processos
export async function getCases() {
  console.log('Buscando processos...');
  
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar processos:', error);
    throw error;
  }

  console.log('Processos encontrados:', data);
  return data;
}

// Buscar processo por ID
export async function getCaseById(id: string) {
  console.log('Buscando processo por ID:', id);
  
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erro ao buscar processo:', error);
    throw error;
  }

  return data;
}

// Criar novo processo
export async function createCase(caseData: CaseInsert) {
  console.log('Criando novo processo:', caseData);
  
  const { data, error } = await supabase
    .from('cases')
    .insert(caseData)
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar processo:', error);
    throw error;
  }

  console.log('Processo criado com sucesso:', data);
  return data;
}

// Atualizar processo
export async function updateCase(id: string, updates: CaseUpdate) {
  console.log('Atualizando processo:', id, updates);
  
  const { data, error } = await supabase
    .from('cases')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar processo:', error);
    throw error;
  }

  console.log('Processo atualizado com sucesso:', data);
  return data;
}

// Deletar processo
export async function deleteCase(id: string) {
  console.log('Deletando processo:', id);
  
  const { error } = await supabase
    .from('cases')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar processo:', error);
    throw error;
  }

  console.log('Processo deletado com sucesso');
}

// Buscar processos por status
export async function getCasesByStatus(status: string) {
  console.log('Buscando processos por status:', status);
  
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar processos por status:', error);
    throw error;
  }

  return data;
}

// Buscar estatísticas dos processos
export async function getCasesStats() {
  console.log('Buscando estatísticas dos processos...');
  
  const { data: allCases, error } = await supabase
    .from('cases')
    .select('status, priority, created_at, next_deadline');

  if (error) {
    console.error('Erro ao buscar estatísticas:', error);
    throw error;
  }

  const stats = {
    total: allCases.length,
    active: allCases.filter(c => c.status === 'Em Andamento').length,
    thisMonth: allCases.filter(c => {
      const created = new Date(c.created_at);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length,
    finished: allCases.filter(c => c.status === 'Finalizado').length,
    urgentDeadlines: allCases.filter(c => {
      if (!c.next_deadline) return false;
      const deadline = new Date(c.next_deadline);
      const now = new Date();
      const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 5 && diffDays >= 0;
    }).length
  };

  console.log('Estatísticas calculadas:', stats);
  return stats;
}
