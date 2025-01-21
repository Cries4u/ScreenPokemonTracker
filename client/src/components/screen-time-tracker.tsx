import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { useScreenTime } from "@/hooks/use-screen-time";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Timer, PauseCircle, PlayCircle } from "lucide-react";

export default function ScreenTimeTracker() {
  const { user } = useUser();
  const { toast } = useToast();
  const [isTracking, setIsTracking] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { sessions, addSession } = useScreenTime(today, tomorrow);

  const totalMinutesToday = sessions?.reduce(
    (acc, session) => acc + session.minutes,
    0
  ) || 0;

  const progressPercentage = Math.min(
    (totalMinutesToday / (user?.dailyGoal || 120)) * 100,
    100
  );

  useEffect(() => {
    let interval: number;
    if (isTracking) {
      interval = window.setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const handleToggleTracking = () => {
    if (isTracking) {
      if (sessionTime > 0) {
        addSession(sessionTime)
          .then(() => {
            toast({
              title: "Session Recorded",
              description: `Added ${sessionTime} minutes to your daily total.`,
            });
          })
          .catch((error) => {
            toast({
              variant: "destructive",
              title: "Error",
              description: error.message,
            });
          });
      }
      setSessionTime(0);
    }
    setIsTracking(!isTracking);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            <p className="text-sm font-medium">
              {totalMinutesToday} / {user?.dailyGoal || 120} minutes
            </p>
          </div>
        </div>
        <Button
          variant={isTracking ? "destructive" : "default"}
          onClick={handleToggleTracking}
          className="gap-2"
        >
          {isTracking ? (
            <>
              <PauseCircle className="h-4 w-4" />
              Stop Tracking
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4" />
              Start Tracking
            </>
          )}
        </Button>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Progress value={progressPercentage} className="h-2" />
          </TooltipTrigger>
          <TooltipContent>
            {progressPercentage < 100
              ? `${Math.ceil(
                  user?.dailyGoal! - totalMinutesToday
                )} minutes remaining`
              : "Daily goal achieved!"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isTracking && (
        <p className="text-sm text-muted-foreground">
          Current session: {sessionTime} minutes
        </p>
      )}
    </div>
  );
}
