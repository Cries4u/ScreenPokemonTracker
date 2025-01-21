import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PokemonCard as PokemonCardType } from "@db/schema";
import { format } from "date-fns";

interface PokemonCardProps {
  card: PokemonCardType;
}

const rarityColors = {
  common: "bg-gray-200 text-gray-700",
  uncommon: "bg-green-200 text-green-700",
  rare: "bg-blue-200 text-blue-700",
  "ultra-rare": "bg-purple-200 text-purple-700",
  legendary: "bg-yellow-200 text-yellow-700",
};

export default function PokemonCard({ card }: PokemonCardProps) {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-105">
      <CardContent className="p-3">
        <div className="aspect-square relative mb-2">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <Badge
            className={`absolute top-2 right-2 ${
              rarityColors[card.rarity as keyof typeof rarityColors]
            }`}
          >
            {card.rarity}
          </Badge>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-sm truncate">{card.name}</h3>
          <p className="text-xs text-muted-foreground">
            Earned {format(new Date(card.earned), "MMM d, yyyy")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
