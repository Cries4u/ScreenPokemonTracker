import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScreenTimeTracker from "@/components/screen-time-tracker";
import StreakDisplay from "@/components/streak-display";
import AnimatedClock from "@/components/animated-clock";
import { useUser } from "@/hooks/use-user";

export default function Dashboard() {
  const { user, logout } = useUser();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.username}!</h1>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link href="/collection">My Collection</Link>
            </Button>
            <Button variant="destructive" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Track Your Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatedClock />
              <ScreenTimeTracker />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <StreakDisplay />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}