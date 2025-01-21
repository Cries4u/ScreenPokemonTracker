// Pokemon rarity tiers
export type PokemonRarity = 'common' | 'uncommon' | 'rare' | 'ultra-rare' | 'legendary';

interface PokemonReward {
  name: string;
  imageUrl: string;
  rarity: PokemonRarity;
}

// Pokemon rewards for different milestones
const MILESTONE_REWARDS: Record<number, PokemonReward> = {
  7: {
    name: "Pikachu",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    rarity: "common"
  },
  14: {
    name: "Charmeleon",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
    rarity: "uncommon"
  },
  21: {
    name: "Dragonair",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/148.png",
    rarity: "rare"
  },
  28: {
    name: "Gyarados",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
    rarity: "ultra-rare"
  },
  35: {
    name: "Mewtwo",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    rarity: "legendary"
  }
};

export function getPokemonReward(milestone: number): PokemonReward {
  // Find the closest milestone that's greater than or equal to the current streak
  const closestMilestone = Object.keys(MILESTONE_REWARDS)
    .map(Number)
    .find(m => m >= milestone) || 7;

  return MILESTONE_REWARDS[closestMilestone];
}
