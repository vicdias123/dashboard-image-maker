
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const ClosedCasesChart = () => {
  const data = [
    { month: "Jan", cases: 18, revenue: 380000 },
    { month: "Fev", cases: 22, revenue: 420000 },
    { month: "Mar", cases: 19, revenue: 390000 },
    { month: "Abr", cases: 25, revenue: 465000 },
    { month: "Mai", cases: 23, revenue: 425000 },
    { month: "Jun", cases: 25, revenue: 450000 },
  ];

  const chartConfig = {
    cases: {
      label: "Casos Fechados",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Evolução de Casos Fechados</CardTitle>
        <p className="text-sm text-muted-foreground">Últimos 6 meses - Total de 132 casos</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                className="text-xs fill-muted-foreground"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs fill-muted-foreground"
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                labelFormatter={(value) => `${value} 2024`}
              />
              <Area
                type="monotone"
                dataKey="cases"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCases)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-accent/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
            <p className="text-lg font-semibold text-primary">85%</p>
          </div>
          <div className="text-center p-3 bg-accent/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Tempo Médio</p>
            <p className="text-lg font-semibold text-primary">18 meses</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClosedCasesChart;
