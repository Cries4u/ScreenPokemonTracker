import { useUser } from "@/hooks/use-user";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Trophy, Gift } from "lucide-react";
import { getPokemonReward } from "@/lib/rewards";

export default function StreakDisplay() {
  const { user } = useUser();

  // Progress towards next milestone (every 7 days)
  const nextMilestone = Math.ceil(user?.currentStreak! / 7) * 7;
  const progress = ((user?.currentStreak || 0) % 7) / 7 * 100;

  // Get the next Pokemon reward
  const nextReward = getPokemonReward(nextMilestone);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Current Streak</p>
                  <p className="text-2xl font-bold">{user?.currentStreak} days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Best Streak</p>
                  <p className="text-2xl font-bold">{user?.bestStreak} days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <Gift className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Next Reward at {nextMilestone} days</h3>
              <p className="text-sm text-muted-foreground">
                {nextReward.name} ({nextReward.rarity})
              </p>
            </div>
          </div>
          <div className="aspect-square relative w-full max-w-[200px] mx-auto mb-4">
            <img
              src={nextReward.imageUrl}
              alt={nextReward.name}
              className="w-full h-full object-contain rounded-lg border-2 border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to next milestone</span>
              <span>{nextMilestone} days</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        {user?.currentStreak === 0 ? (
          <p>Start tracking today to build your streak!</p>
        ) : (
          <p>
            Keep it up! You'll earn {nextReward.name} at {nextMilestone} days!
          </p>
        )}
      </div>
    </div>
  );
}