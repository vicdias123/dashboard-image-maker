
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClosedCasesChart = () => {
  const caseTypes = [
    { name: "Family Law", count: 8, color: "bg-slate-800" },
    { name: "Business Law", count: 12, color: "bg-slate-600" },
    { name: "Criminal Law", count: 12, color: "bg-slate-800" }
  ];

  const chartData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    consultations: Math.floor(Math.random() * 5),
    cases: Math.floor(Math.random() * 3)
  }));

  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Closed Cases</CardTitle>
          <p className="text-sm text-muted-foreground">24.10.2024 - 31.10.2024</p>
        </div>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-accent rounded">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </button>
          <button className="p-1 hover:bg-accent rounded">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h6l6 18h6"/>
              <path d="M14 3h7"/>
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="text-4xl font-bold">32</div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-muted"></div>
              <span className="text-xs text-muted-foreground">No Consultations</span>
              <span className="text-xs">3-5 Cases</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-foreground"></div>
              <span className="text-xs text-muted-foreground">6+ Cases</span>
              <span className="text-xs">1-2 Cases</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {caseTypes.map((type, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-sm w-24">{type.name}</span>
              <div className="flex gap-1 flex-1">
                {chartData.slice(0, 7).map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-6 h-6 rounded-full ${
                      Math.random() > 0.5 ? type.color : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-1 mt-4">
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} className="text-xs text-muted-foreground w-6 text-center">
              {24 + i}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClosedCasesChart;
