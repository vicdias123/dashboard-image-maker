
import { ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  name: string;
  title: string;
  status: string;
  deadline?: string;
  priority?: string;
  avatar: string;
  isDark?: boolean;
}

const CaseCard = ({ name, title, status, deadline, priority, avatar, isDark = false }: CaseCardProps) => {
  return (
    <div className={cn(
      "p-6 rounded-2xl border transition-all hover:shadow-lg",
      isDark ? "bg-primary text-primary-foreground" : "bg-card"
    )}>
      <div className="flex items-start justify-between mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <button className="p-1 hover:bg-background/10 rounded">
          <ExternalLink size={16} className={isDark ? "text-primary-foreground" : "text-muted-foreground"} />
        </button>
      </div>

      <h3 className={cn(
        "font-semibold text-lg mb-2",
        isDark ? "text-primary-foreground" : "text-foreground"
      )}>
        {name}
      </h3>
      <p className={cn(
        "text-sm mb-4",
        isDark ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        {title}
      </p>

      <div className="flex gap-2">
        <Badge variant={isDark ? "secondary" : "default"} className="text-xs">
          {status}
        </Badge>
        {deadline && (
          <Badge variant={priority === "Urgent" ? "destructive" : "outline"} className="text-xs">
            {deadline}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CaseCard;
