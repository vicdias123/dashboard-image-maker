
import { DollarSign, TrendingUp, CreditCard, AlertCircle, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from "recharts";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

const Financeiro = () => {
  const faturamentoData = [
    { month: "Jan", receita: 380000, recebido: 350000 },
    { month: "Fev", receita: 420000, recebido: 400000 },
    { month: "Mar", receita: 390000, recebido: 380000 },
    { month: "Abr", receita: 465000, recebido: 440000 },
    { month: "Mai", receita: 425000, recebido: 410000 },
    { month: "Jun", receita: 450000, recebido: 420000 },
  ];

  const faturasPendentes = [
    {
      id: 1,
      cliente: "Maria Silva Santos",
      numero: "FAT-2024-001",
      valor: "R$ 12.500",
      vencimento: "15/11/2024",
      diasAtraso: 0,
      status: "Em Dia"
    },
    {
      id: 2,
      cliente: "João Carlos Oliveira",
      numero: "FAT-2024-002",
      valor: "R$ 8.750",
      vencimento: "10/11/2024",
      diasAtraso: 0,
      status: "Em Dia"
    },
    {
      id: 3,
      cliente: "Empresa ABC Ltda",
      numero: "FAT-2024-003",
      valor: "R$ 25.000",
      vencimento: "05/11/2024",
      diasAtraso: 5,
      status: "Vencida"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Dia": return "bg-green-100 text-green-800";
      case "Vencida": return "bg-red-100 text-red-800";
      case "Paga": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const chartConfig = {
    receita: {
      label: "Receita",
      color: "hsl(var(--primary))",
    },
    recebido: {
      label: "Recebido",
      color: "hsl(var(--primary))",
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
                <h1 className="text-2xl font-semibold text-foreground">Financeiro</h1>
                <p className="text-sm text-muted-foreground">Gestão financeira do escritório</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Relatórios
                </Button>
                
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus size={16} className="mr-2" />
                  Nova Fatura
                </Button>
              </div>
            </div>

            {/* Cards de Métricas Financeiras */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+7%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">R$ 450.000</h3>
                <p className="text-sm text-muted-foreground">Receita Mensal</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                  <span className="text-sm text-green-600 font-medium">+12%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">R$ 420.000</h3>
                <p className="text-sm text-muted-foreground">Recebido no Mês</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <CreditCard className="w-8 h-8 text-orange-600" />
                  <span className="text-sm text-orange-600 font-medium">R$ 75k</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">R$ 125.000</h3>
                <p className="text-sm text-muted-foreground">A Receber</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">3,2%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">R$ 15.000</h3>
                <p className="text-sm text-muted-foreground">Inadimplência</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Gráfico de Faturamento */}
              <div className="col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Faturamento vs. Recebimento</CardTitle>
                    <p className="text-sm text-muted-foreground">Últimos 6 meses</p>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={faturamentoData}>
                          <defs>
                            <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorRecebido" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" axisLine={false} tickLine={false} />
                          <YAxis axisLine={false} tickLine={false} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="receita"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            fill="url(#colorReceita)"
                          />
                          <Area
                            type="monotone"
                            dataKey="recebido"
                            stroke="hsl(142.1 76.2% 36.3%)"
                            strokeWidth={2}
                            fill="url(#colorRecebido)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Resumo Financeiro */}
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Mês</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Entradas</span>
                      <span className="font-bold text-green-600">R$ 420.000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">Saídas</span>
                      <span className="font-bold text-red-600">R$ 140.000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Resultado</span>
                      <span className="font-bold text-blue-600">R$ 280.000</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Margem</p>
                        <p className="text-lg font-bold text-primary">68%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Faturas Pendentes */}
            <div className="bg-card rounded-2xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-foreground">Faturas Pendentes</h2>
              </div>
              
              <div className="divide-y">
                {faturasPendentes.map((fatura) => (
                  <div key={fatura.id} className="p-6 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{fatura.cliente}</h3>
                        <p className="text-sm text-muted-foreground">Fatura {fatura.numero}</p>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">{fatura.valor}</p>
                          <p className="text-xs text-muted-foreground">Valor</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">{fatura.vencimento}</p>
                          <p className="text-xs text-muted-foreground">Vencimento</p>
                        </div>
                        
                        <div className="text-center">
                          <Badge className={`text-xs ${getStatusColor(fatura.status)}`}>
                            {fatura.status}
                          </Badge>
                          {fatura.diasAtraso > 0 && (
                            <p className="text-xs text-red-600 mt-1">{fatura.diasAtraso} dias</p>
                          )}
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

export default Financeiro;
