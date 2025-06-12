
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SystemModuleRow = Database['public']['Tables']['system_modules']['Row'];
type ModulePermissionRow = Database['public']['Tables']['module_permissions']['Row'];

export interface SystemModule {
  id: string;
  name: string;
  title: string;
  description: string | null;
  icon: string | null;
  route: string;
  is_active: boolean | null;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ModulePermission {
  id: string;
  module_id: string | null;
  role: string;
  can_view: boolean | null;
  can_create: boolean | null;
  can_edit: boolean | null;
  can_delete: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ModuleWithPermissions extends SystemModule {
  permissions: ModulePermission;
}

export const getSystemModules = async (): Promise<SystemModule[]> => {
  try {
    console.log('Buscando módulos do sistema...');
    
    const { data, error } = await supabase
      .from('system_modules')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Erro ao buscar módulos:', error);
      throw error;
    }

    return (data || []) as SystemModule[];
  } catch (error) {
    console.error('Erro ao buscar módulos:', error);
    throw error;
  }
};

export const getModulesWithPermissions = async (userRole: string): Promise<ModuleWithPermissions[]> => {
  try {
    console.log('Buscando módulos com permissões para role:', userRole);
    
    const { data, error } = await supabase
      .from('system_modules')
      .select(`
        *,
        module_permissions!inner(*)
      `)
      .eq('is_active', true)
      .eq('module_permissions.role', userRole)
      .eq('module_permissions.can_view', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Erro ao buscar módulos com permissões:', error);
      throw error;
    }

    return (data || []).map(item => ({
      ...item,
      permissions: Array.isArray(item.module_permissions) 
        ? item.module_permissions[0] 
        : item.module_permissions
    })) as ModuleWithPermissions[];
  } catch (error) {
    console.error('Erro ao buscar módulos com permissões:', error);
    throw error;
  }
};

export const getUserPermissions = async (userRole: string, moduleId: string): Promise<ModulePermission | null> => {
  try {
    console.log('Buscando permissões do usuário para módulo:', moduleId);
    
    const { data, error } = await supabase
      .from('module_permissions')
      .select('*')
      .eq('role', userRole)
      .eq('module_id', moduleId)
      .single();

    if (error) {
      console.error('Erro ao buscar permissões:', error);
      return null;
    }

    return data as ModulePermission;
  } catch (error) {
    console.error('Erro ao buscar permissões:', error);
    return null;
  }
};

export const createModule = async (moduleData: Omit<SystemModule, 'id' | 'created_at' | 'updated_at'>): Promise<SystemModule> => {
  try {
    console.log('Criando módulo:', moduleData);
    
    const { data, error } = await supabase
      .from('system_modules')
      .insert([moduleData])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar módulo:', error);
      throw error;
    }

    return data as SystemModule;
  } catch (error) {
    console.error('Erro ao criar módulo:', error);
    throw error;
  }
};

export const updateModule = async (id: string, moduleData: Partial<SystemModule>): Promise<SystemModule> => {
  try {
    console.log('Atualizando módulo:', id, moduleData);
    
    const { data, error } = await supabase
      .from('system_modules')
      .update({ ...moduleData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar módulo:', error);
      throw error;
    }

    return data as SystemModule;
  } catch (error) {
    console.error('Erro ao atualizar módulo:', error);
    throw error;
  }
};

export const deleteModule = async (id: string): Promise<void> => {
  try {
    console.log('Excluindo módulo:', id);
    
    const { error } = await supabase
      .from('system_modules')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir módulo:', error);
      throw error;
    }
  } catch (error) {
    console.error('Erro ao excluir módulo:', error);
    throw error;
  }
};
