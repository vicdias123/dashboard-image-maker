
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ScheduledCalls = () => {
  const calls = [
    {
      time: "08:00",
      name: "Alex Haye",
      type: "Consultation",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      duration: "30min"
    },
    {
      time: "09:30",
      name: "Maria Mueller",
      type: "Legal Consult...",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      duration: "45min"
    },
    {
      time: "10:30",
      name: "Michael Smith",
      type: "Family Law Up...",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      duration: "60min"
    }
  ];

  const timeSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"];

  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Scheduled Calls</CardTitle>
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
        <div className="relative">
          <div className="flex border-b border-border pb-2 mb-4">
            {timeSlots.map((time) => (
              <div key={time} className="flex-1 text-center">
                <span className="text-xs text-muted-foreground">{time}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {calls.map((call, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg"
                style={{
                  marginLeft: `${timeSlots.indexOf(call.time) * 16.66}%`,
                  width: `${call.duration === "30min" ? "16.66%" : call.duration === "45min" ? "25%" : "33.33%"}`
                }}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={call.avatar} />
                  <AvatarFallback>{call.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{call.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{call.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledCalls;
