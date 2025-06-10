
import { Settings, Shield, Database, Bell, Palette, Globe, Users, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

const Configuracoes = () => {
  const configuracoes = [
    {
      id: 1,
      categoria: "Geral",
      icone: Settings,
      items: [
        { nome: "Nome do Escritório", valor: "Dias Barbosa Advocacia", tipo: "text" },
        { nome: "CNPJ", valor: "12.345.678/0001-90", tipo: "text" },
        { nome: "Endereço", valor: "Av. Paulista, 1000 - São Paulo/SP", tipo: "text" },
        { nome: "Telefone", valor: "(11) 3000-0000", tipo: "text" },
        { nome: "E-mail", valor: "contato@diasbarbosa.com.br", tipo: "email" }
      ]
    },
    {
      id: 2,
      categoria: "Segurança",
      icone: Shield,
      items: [
        { nome: "Autenticação 2FA", valor: true, tipo: "switch" },
        { nome: "Backup Automático", valor: true, tipo: "switch" },
        { nome: "Log de Auditoria", valor: true, tipo: "switch" },
        { nome: "Criptografia de Dados", valor: true, tipo: "switch" },
        { nome: "Timeout de Sessão", valor: "30 minutos", tipo: "select" }
      ]
    },
    {
      id: 3,
      categoria: "Notificações",
      icone: Bell,
      items: [
        { nome: "E-mail de Prazos", valor: true, tipo: "switch" },
        { nome: "SMS de Urgência", valor: true, tipo: "switch" },
        { nome: "Push Mobile", valor: false, tipo: "switch" },
        { nome: "Newsletter", valor: true, tipo: "switch" },
        { nome: "Relatórios Semanais", valor: true, tipo: "switch" }
      ]
    },
    {
      id: 4,
      categoria: "Sistema",
      icone: Database,
      items: [
        { nome: "Último Backup", valor: "10/11/2024 03:00", tipo: "info" },
        { nome: "Versão do Sistema", valor: "v2.4.1", tipo: "info" },
        { nome: "Espaço Utilizado", valor: "2.8 GB / 50 GB", tipo: "info" },
        { nome: "Usuários Ativos", valor: "12", tipo: "info" },
        { nome: "Tempo de Atividade", valor: "99.9%", tipo: "info" }
      ]
    }
  ];

  const usuarios = [
    {
      id: 1,
      nome: "Dr. Vitor Dias Barbosa",
      email: "vitor@escritorio.com.br",
      perfil: "Administrador",
      status: "Ativo",
      ultimoAcesso: "10/11/2024 14:30",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      nome: "Dra. Ana Costa Silva",
      email: "ana@escritorio.com.br",
      perfil: "Advogado",
      status: "Ativo",
      ultimoAcesso: "10/11/2024 16:45",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      nome: "Dr. Roberto Silva",
      email: "roberto@escritorio.com.br",
      perfil: "Advogado",
      status: "Ativo",
      ultimoAcesso: "10/11/2024 12:15",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 4,
      nome: "Maria Administrativa",
      email: "maria@escritorio.com.br",
      perfil: "Administrativo",
      status: "Inativo",
      ultimoAcesso: "09/11/2024 18:00",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    }
  ];

  const integracoes = [
    { nome: "Google Workspace", status: "Conectado", cor: "bg-green-100 text-green-800" },
    { nome: "PJe", status: "Conectado", cor: "bg-green-100 text-green-800" },
    { nome: "TJSP", status: "Conectado", cor: "bg-green-100 text-green-800" },
    { nome: "WhatsApp Business", status: "Pendente", cor: "bg-yellow-100 text-yellow-800" },
    { nome: "Receita Federal", status: "Desconectado", cor: "bg-red-100 text-red-800" },
    { nome: "SERASA", status: "Conectado", cor: "bg-green-100 text-green-800" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-green-100 text-green-800";
      case "Inativo": return "bg-gray-100 text-gray-800";
      case "Bloqueado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPerfilColor = (perfil: string) => {
    switch (perfil) {
      case "Administrador": return "bg-purple-100 text-purple-800";
      case "Advogado": return "bg-blue-100 text-blue-800";
      case "Estagiário": return "bg-yellow-100 text-yellow-800";
      case "Administrativo": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-accent/30 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopNavigation />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Configurações do Sistema</h1>
                <p className="text-sm text-muted-foreground">Gerencie as configurações gerais do escritório</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Database size={16} className="mr-2" />
                  Backup Manual
                </Button>
                
                <Button className="bg-primary hover:bg-primary/90">
                  Salvar Alterações
                </Button>
              </div>
            </div>

            {/* Cards de Status */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Seguro</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">99.9%</h3>
                <p className="text-sm text-muted-foreground">Tempo de Atividade</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">12</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">3</h3>
                <p className="text-sm text-muted-foreground">Usuários Online</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Database className="w-8 h-8 text-purple-600" />
                  <span className="text-sm text-green-600 font-medium">5.6%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">2.8 GB</h3>
                <p className="text-sm text-muted-foreground">Espaço Usado</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Globe className="w-8 h-8 text-orange-600" />
                  <span className="text-sm text-green-600 font-medium">6/6</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">5</h3>
                <p className="text-sm text-muted-foreground">Integrações Ativas</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Configurações Gerais */}
              <div className="col-span-2 space-y-6">
                {configuracoes.map((secao) => (
                  <Card key={secao.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <secao.icone className="w-5 h-5" />
                        {secao.categoria}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {secao.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <label className="text-sm font-medium text-foreground">
                            {item.nome}
                          </label>
                          <div className="flex items-center gap-2">
                            {item.tipo === "switch" ? (
                              <Switch checked={item.valor as boolean} />
                            ) : item.tipo === "info" ? (
                              <span className="text-sm text-muted-foreground">
                                {item.valor as string}
                              </span>
                            ) : (
                              <Input 
                                type={item.tipo} 
                                defaultValue={item.valor as string}
                                className="w-64"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Integrações */}
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      Integrações
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {integracoes.map((integracao, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm font-medium">{integracao.nome}</span>
                        <Badge className={`text-xs ${integracao.cor}`}>
                          {integracao.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Gestão de Usuários */}
            <div className="bg-card rounded-2xl border">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Gestão de Usuários
                </h2>
                <Button size="sm">
                  Novo Usuário
                </Button>
              </div>
              
              <div className="divide-y">
                {usuarios.map((usuario) => (
                  <div key={usuario.id} className="p-6 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-10 h-10 rounded-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${usuario.avatar})` }}
                        />
                        
                        <div>
                          <h3 className="font-semibold text-foreground">{usuario.nome}</h3>
                          <p className="text-sm text-muted-foreground">{usuario.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <Badge className={`text-xs ${getPerfilColor(usuario.perfil)}`}>
                            {usuario.perfil}
                          </Badge>
                        </div>
                        
                        <div className="text-center">
                          <Badge className={`text-xs ${getStatusColor(usuario.status)}`}>
                            {usuario.status}
                          </Badge>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Último acesso</p>
                          <p className="text-xs font-medium text-foreground">{usuario.ultimoAcesso}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                          <Button variant="outline" size="sm">
                            Resetar Senha
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Configuracoes;
