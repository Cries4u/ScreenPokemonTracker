import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PokemonCard from "@/components/pokemon-card";
import AchievementBadge from "@/components/achievement-badge";
import type { PokemonCard as PokemonCardType, Achievement } from "@db/schema";

export default function Collection() {
  const { data: cards } = useQuery<PokemonCardType[]>({ queryKey: ["/api/cards"] });
  const { data: achievements } = useQuery<Achievement[]>({ queryKey: ["/api/achievements"] });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Collection</h1>
          <Button variant="outline" asChild>
            <Link href="/">Dashboard</Link>
          </Button>
        </header>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Pokemon Cards ({cards?.length ?? 0})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {cards?.map((card) => (
                  <PokemonCard key={card.id} card={card} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements ({achievements?.length ?? 0})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {achievements?.map((achievement) => (
                  <AchievementBadge key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
