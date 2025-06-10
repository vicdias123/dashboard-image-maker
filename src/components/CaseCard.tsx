
import { ExternalLink, Scale } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  clientName: string;
  caseType: string;
  processNumber?: string;
  status: string;
  deadline?: string;
  priority?: string;
  avatar: string;
  responsibleLawyer: string;
  isDark?: boolean;
}

const CaseCard = ({ 
  clientName, 
  caseType, 
  processNumber,
  status, 
  deadline, 
  priority, 
  avatar, 
  responsibleLawyer,
  isDark = false 
}: CaseCardProps) => {
  return (
    <div className={cn(
      "p-6 rounded-2xl border transition-all hover:shadow-lg",
      isDark ? "bg-primary text-primary-foreground" : "bg-card"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={avatar} />
            <AvatarFallback>{clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex items-center space-x-2">
            <Scale size={16} className={isDark ? "text-primary-foreground/70" : "text-muted-foreground"} />
            {processNumber && (
              <span className={cn(
                "text-xs font-mono",
                isDark ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {processNumber}
              </span>
            )}
          </div>
        </div>
        <button className="p-1 hover:bg-background/10 rounded">
          <ExternalLink size={16} className={isDark ? "text-primary-foreground" : "text-muted-foreground"} />
        </button>
      </div>

      <h3 className={cn(
        "font-semibold text-lg mb-1",
        isDark ? "text-primary-foreground" : "text-foreground"
      )}>
        {clientName}
      </h3>
      <p className={cn(
        "text-sm mb-2",
        isDark ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        {caseType}
      </p>
      <p className={cn(
        "text-xs mb-4",
        isDark ? "text-primary-foreground/70" : "text-muted-foreground"
      )}>
        Responsável: {responsibleLawyer}
      </p>

      <div className="flex gap-2 flex-wrap">
        <Badge variant={isDark ? "secondary" : "default"} className="text-xs">
          {status}
        </Badge>
        {deadline && (
          <Badge variant={priority === "Urgente" ? "destructive" : "outline"} className="text-xs">
            {deadline}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CaseCard;
