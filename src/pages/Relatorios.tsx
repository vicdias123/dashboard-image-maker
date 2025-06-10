
import { BarChart3, Download, Calendar, Filter, TrendingUp, DollarSign, Users, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Bar, BarChart, Pie, PieChart, Cell } from "recharts";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

const Relatorios = () => {
  const faturamentoPorAdvogado = [
    { nome: "Dr. Vitor", faturamento: 145000, processos: 18 },
    { nome: "Dra. Ana", faturamento: 95000, processos: 25 },
    { nome: "Dr. Roberto", faturamento: 78000, processos: 15 },
    { nome: "Dr. Carlos", faturamento: 52000, processos: 12 },
  ];

  const faturamentoPorArea = [
    { area: "Direito Civil", valor: 180000, cor: "#3b82f6" },
    { area: "Direito Tributário", valor: 120000, cor: "#10b981" },
    { area: "Direito Empresarial", valor: 85000, cor: "#f59e0b" },
    { area: "Direito de Família", valor: 65000, cor: "#ef4444" },
  ];

  const produtividadeEquipe = [
    { month: "Jan", horas: 1650, faturamento: 380000 },
    { month: "Fev", horas: 1720, faturamento: 420000 },
    { month: "Mar", horas: 1680, faturamento: 390000 },
    { month: "Abr", horas: 1850, faturamento: 465000 },
    { month: "Mai", horas: 1780, faturamento: 425000 },
    { month: "Jun", horas: 1820, faturamento: 450000 },
  ];

  const relatoriosDisponiveis = [
    {
      id: 1,
      nome: "Faturamento Mensal Detalhado",
      categoria: "Financeiro",
      ultimaAtualizacao: "10/11/2024",
      frequencia: "Mensal",
      status: "Atualizado",
      descricao: "Análise completa do faturamento por cliente, advogado e área de atuação"
    },
    {
      id: 2,
      nome: "Produtividade da Equipe",
      categoria: "Operacional",
      ultimaAtualizacao: "09/11/2024",
      frequencia: "Semanal",
      status: "Atualizado",
      descricao: "Horas trabalhadas, eficiência e performance individual dos colaboradores"
    },
    {
      id: 3,
      nome: "Análise de Processos",
      categoria: "Operacional",
      ultimaAtualizacao: "08/11/2024",
      frequencia: "Quinzenal",
      status: "Atualizado",
      descricao: "Status dos processos, prazos cumpridos e taxa de sucesso por área"
    },
    {
      id: 4,
      nome: "ROI de Marketing",
      categoria: "Marketing",
      ultimaAtualizacao: "07/11/2024",
      frequencia: "Mensal",
      status: "Pendente",
      descricao: "Retorno sobre investimento em campanhas e canais de aquisição"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Atualizado": return "bg-green-100 text-green-800";
      case "Pendente": return "bg-yellow-100 text-yellow-800";
      case "Processando": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Financeiro": return "bg-blue-100 text-blue-800";
      case "Operacional": return "bg-green-100 text-green-800";
      case "Marketing": return "bg-purple-100 text-purple-800";
      case "Customizado": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const chartConfig = {
    faturamento: {
      label: "Faturamento",
      color: "hsl(var(--primary))",
    },
    horas: {
      label: "Horas",
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
                <h1 className="text-2xl font-semibold text-foreground">Relatórios e Analytics</h1>
                <p className="text-sm text-muted-foreground">Análise detalhada da performance do escritório</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Calendar size={16} className="mr-2" />
                  Período
                </Button>
                
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Filtros
                </Button>
                
                <Button className="bg-primary hover:bg-primary/90">
                  <Download size={16} className="mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* KPIs Principais */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+7%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">R$ 450k</h3>
                <p className="text-sm text-muted-foreground">Receita Mensal</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Scale className="w-8 h-8 text-blue-600" />
                  <span className="text-sm text-green-600 font-medium">+10%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">125</h3>
                <p className="text-sm text-muted-foreground">Processos Ativos</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                  <span className="text-sm text-green-600 font-medium">+12%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">156</h3>
                <p className="text-sm text-muted-foreground">Clientes Ativos</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                  <span className="text-sm text-green-600 font-medium">85%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">97%</h3>
                <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Faturamento por Advogado */}
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Faturamento por Advogado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={faturamentoPorAdvogado} layout="horizontal">
                          <XAxis type="number" axisLine={false} tickLine={false} />
                          <YAxis dataKey="nome" type="category" axisLine={false} tickLine={false} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar
                            dataKey="faturamento"
                            fill="hsl(var(--primary))"
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Faturamento por Área */}
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Faturamento por Área</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={faturamentoPorArea}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="valor"
                          >
                            {faturamentoPorArea.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.cor} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <div className="mt-4 space-y-2">
                      {faturamentoPorArea.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.cor }}
                            />
                            <span className="text-xs">{item.area}</span>
                          </div>
                          <span className="text-xs font-medium">
                            R$ {(item.valor / 1000).toFixed(0)}k
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Produtividade */}
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Produtividade da Equipe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={produtividadeEquipe}>
                          <defs>
                            <linearGradient id="colorHoras" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" axisLine={false} tickLine={false} />
                          <YAxis axisLine={false} tickLine={false} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="horas"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            fill="url(#colorHoras)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Lista de Relatórios */}
            <div className="bg-card rounded-2xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-foreground">Relatórios Disponíveis</h2>
              </div>
              
              <div className="divide-y">
                {relatoriosDisponiveis.map((relatorio) => (
                  <div key={relatorio.id} className="p-6 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <BarChart3 className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-foreground">{relatorio.nome}</h3>
                          <Badge className={`text-xs ${getCategoriaColor(relatorio.categoria)}`}>
                            {relatorio.categoria}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{relatorio.descricao}</p>
                        
                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                          <div>
                            <span className="font-medium">Última atualização:</span> {relatorio.ultimaAtualizacao}
                          </div>
                          <div>
                            <span className="font-medium">Frequência:</span> {relatorio.frequencia}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Badge className={`text-xs ${getStatusColor(relatorio.status)}`}>
                          {relatorio.status}
                        </Badge>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download size={14} className="mr-1" />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download size={14} className="mr-1" />
                            Excel
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

export default Relatorios;
