import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Achievement } from "@db/schema";
import { format } from "date-fns";

interface AchievementBadgeProps {
  achievement: Achievement;
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="transition-transform hover:scale-105">
            <CardContent className="p-3 text-center">
              <div className="aspect-square relative mb-2">
                <img
                  src={achievement.imageUrl}
                  alt={achievement.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm truncate">
                {achievement.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {format(new Date(achievement.earned), "MMM d, yyyy")}
              </p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-semibold">{achievement.name}</p>
            <p className="text-xs">{achievement.description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
