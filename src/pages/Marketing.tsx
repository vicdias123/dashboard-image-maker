
import { Search, Plus, TrendingUp, Users, MousePointer, DollarSign, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from "recharts";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

const Marketing = () => {
  const leadsData = [
    { month: "Jan", leads: 25, conversao: 18 },
    { month: "Fev", leads: 32, conversao: 24 },
    { month: "Mar", leads: 28, conversao: 20 },
    { month: "Abr", leads: 45, conversao: 32 },
    { month: "Mai", leads: 38, conversao: 28 },
    { month: "Jun", leads: 42, conversao: 31 },
  ];

  const campanhas = [
    {
      id: 1,
      nome: "Google Ads - Divórcio",
      status: "Ativa",
      orcamento: "R$ 5.000",
      gasto: "R$ 3.200",
      impressoes: "125.000",
      cliques: "2.850",
      ctr: "2.28%",
      conversoes: 18,
      cac: "R$ 178",
      roi: "350%"
    },
    {
      id: 2,
      nome: "Facebook Ads - Empresarial",
      status: "Ativa",
      orcamento: "R$ 3.500",
      gasto: "R$ 2.100",
      impressoes: "89.000",
      cliques: "1.920",
      ctr: "2.16%",
      conversoes: 12,
      cac: "R$ 175",
      roi: "280%"
    },
    {
      id: 3,
      nome: "SEO - Blog Jurídico",
      status: "Ativa",
      orcamento: "R$ 2.000",
      gasto: "R$ 1.800",
      impressoes: "45.000",
      cliques: "1.350",
      ctr: "3.00%",
      conversoes: 8,
      cac: "R$ 225",
      roi: "200%"
    }
  ];

  const leads = [
    {
      id: 1,
      nome: "Carlos Eduardo Silva",
      email: "carlos@email.com",
      telefone: "(11) 99999-1001",
      origem: "Google Ads",
      interesse: "Direito Tributário",
      score: 85,
      estagio: "Qualificado",
      dataContato: "08/11/2024",
      valorEstimado: "R$ 15.000"
    },
    {
      id: 2,
      nome: "Fernanda Costa Mendes",
      email: "fernanda@email.com",
      telefone: "(11) 99999-1002",
      origem: "Site",
      interesse: "Direito de Família",
      score: 92,
      estagio: "Oportunidade",
      dataContato: "07/11/2024",
      valorEstimado: "R$ 8.000"
    },
    {
      id: 3,
      nome: "Tech Solutions Ltda",
      email: "contato@techsolutions.com",
      telefone: "(11) 99999-1003",
      origem: "Indicação",
      interesse: "Direito Empresarial",
      score: 95,
      estagio: "Proposta",
      dataContato: "06/11/2024",
      valorEstimado: "R$ 25.000"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativa": return "bg-green-100 text-green-800";
      case "Pausada": return "bg-yellow-100 text-yellow-800";
      case "Finalizada": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEstagioColor = (estagio: string) => {
    switch (estagio) {
      case "Lead": return "bg-blue-100 text-blue-800";
      case "Qualificado": return "bg-yellow-100 text-yellow-800";
      case "Oportunidade": return "bg-orange-100 text-orange-800";
      case "Proposta": return "bg-purple-100 text-purple-800";
      case "Fechado": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const chartConfig = {
    leads: {
      label: "Leads",
      color: "hsl(var(--primary))",
    },
    conversao: {
      label: "Conversões",
      color: "hsl(142.1 76.2% 36.3%)",
    },
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
                <h1 className="text-2xl font-semibold text-foreground">Marketing e CRM</h1>
                <p className="text-sm text-muted-foreground">Gerencie leads, campanhas e análise de performance</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input className="pl-10 w-64" placeholder="Buscar leads, campanhas..." />
                </div>
                
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus size={16} className="mr-2" />
                  Nova Campanha
                </Button>
              </div>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                  <span className="text-sm text-green-600 font-medium">+18%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">187</h3>
                <p className="text-sm text-muted-foreground">Leads Totais</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">22%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">42</h3>
                <p className="text-sm text-muted-foreground">Conversões</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <MousePointer className="w-8 h-8 text-purple-600" />
                  <span className="text-sm text-green-600 font-medium">2.48%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">6.120</h3>
                <p className="text-sm text-muted-foreground">Cliques</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-orange-600" />
                  <span className="text-sm text-green-600 font-medium">R$ 185</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">280%</h3>
                <p className="text-sm text-muted-foreground">ROI Médio</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Gráfico de Leads */}
              <div className="col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance de Leads</CardTitle>
                    <p className="text-sm text-muted-foreground">Leads gerados vs. conversões</p>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={leadsData}>
                          <defs>
                            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorConversao" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" axisLine={false} tickLine={false} />
                          <YAxis axisLine={false} tickLine={false} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="leads"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            fill="url(#colorLeads)"
                          />
                          <Area
                            type="monotone"
                            dataKey="conversao"
                            stroke="hsl(142.1 76.2% 36.3%)"
                            strokeWidth={2}
                            fill="url(#colorConversao)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Funil de Vendas */}
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Funil de Vendas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Leads</span>
                      <span className="font-bold text-blue-600">187</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium">Qualificados</span>
                      <span className="font-bold text-yellow-600">95</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium">Oportunidades</span>
                      <span className="font-bold text-orange-600">58</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium">Propostas</span>
                      <span className="font-bold text-purple-600">28</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Fechados</span>
                      <span className="font-bold text-green-600">12</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Campanhas Ativas */}
            <div className="bg-card rounded-2xl border mb-8">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-foreground">Campanhas Ativas</h2>
              </div>
              
              <div className="divide-y">
                {campanhas.map((campanha) => (
                  <div key={campanha.id} className="p-6 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{campanha.nome}</h3>
                        <Badge className={`text-xs mt-2 ${getStatusColor(campanha.status)}`}>
                          {campanha.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-8 gap-6 text-center">
                        <div>
                          <p className="text-sm font-medium text-foreground">{campanha.orcamento}</p>
                          <p className="text-xs text-muted-foreground">Orçamento</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{campanha.gasto}</p>
                          <p className="text-xs text-muted-foreground">Gasto</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{campanha.impressoes}</p>
                          <p className="text-xs text-muted-foreground">Impressões</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{campanha.cliques}</p>
                          <p className="text-xs text-muted-foreground">Cliques</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{campanha.ctr}</p>
                          <p className="text-xs text-muted-foreground">CTR</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{campanha.conversoes}</p>
                          <p className="text-xs text-muted-foreground">Conversões</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{campanha.cac}</p>
                          <p className="text-xs text-muted-foreground">CAC</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-600">{campanha.roi}</p>
                          <p className="text-xs text-muted-foreground">ROI</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leads Recentes */}
            <div className="bg-card rounded-2xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-foreground">Leads Recentes</h2>
              </div>
              
              <div className="divide-y">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-6 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{lead.nome}</h3>
                        <p className="text-sm text-muted-foreground">{lead.interesse}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span>{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{lead.telefone}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">{lead.origem}</p>
                          <p className="text-xs text-muted-foreground">Origem</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">{lead.score}</p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">{lead.valorEstimado}</p>
                          <p className="text-xs text-muted-foreground">Valor Est.</p>
                        </div>
                        
                        <div className="text-center">
                          <Badge className={`text-xs ${getEstagioColor(lead.estagio)}`}>
                            {lead.estagio}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{lead.dataContato}</p>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
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

export default Marketing;
