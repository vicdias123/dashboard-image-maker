
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Usando o tipo diretamente do Supabase para garantir compatibilidade
type ClientRow = Database['public']['Tables']['clients']['Row'];

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  document_number: string | null;
  client_type: string | null;
  address: any;
  notes: string | null;
  status: string | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ClientStats {
  totalClients: number;
  activeClients: number;
  newClientsThisMonth: number;
  totalContractValue: string;
}

export const getClients = async (): Promise<Client[]> => {
  try {
    console.log('Buscando clientes...');
    
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }

    return (data || []) as Client[];
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

export const getClientStats = async (): Promise<ClientStats> => {
  try {
    console.log('Buscando estatísticas de clientes...');
    
    // Buscar total de clientes
    const { count: totalClients } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true });

    // Buscar clientes ativos
    const { count: activeClients } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    // Buscar novos clientes deste mês
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count: newClientsThisMonth } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth.toISOString());

    return {
      totalClients: totalClients || 0,
      activeClients: activeClients || 0,
      newClientsThisMonth: newClientsThisMonth || 0,
      totalContractValue: 'R$ 2,8M' // Valor simulado até termos os casos implementados
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    // Retorna valores padrão em caso de erro
    return {
      totalClients: 0,
      activeClients: 0,
      newClientsThisMonth: 0,
      totalContractValue: 'R$ 0'
    };
  }
};

export const createClient = async (clientData: Omit<Client, 'id' | 'created_at' | 'updated_at'>): Promise<Client> => {
  try {
    console.log('Criando cliente:', clientData);
    
    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }

    return data as Client;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
};

export const updateClient = async (id: string, clientData: Partial<Client>): Promise<Client> => {
  try {
    console.log('Atualizando cliente:', id, clientData);
    
    const { data, error } = await supabase
      .from('clients')
      .update(clientData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }

    return data as Client;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
};

export const deleteClient = async (id: string): Promise<void> => {
  try {
    console.log('Excluindo cliente:', id);
    
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir cliente:', error);
      throw error;
    }
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    throw error;
  }
};
