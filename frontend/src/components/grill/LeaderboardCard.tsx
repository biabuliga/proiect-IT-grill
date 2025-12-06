import { cn } from "@/lib/utils";

interface LeaderboardCardProps {
  rank: number;
  name: string;
  author: string;
  imageUrl: string;
  miciCount: number;
  onClick?: () => void;
}

const LeaderboardCard = ({
  rank,
  name,
  author,
  imageUrl,
  miciCount,
  onClick,
}: LeaderboardCardProps) => {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank.toString();
    }
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image with Rank Badge */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Rank Badge */}
        <div className="absolute top-3 left-3 text-3xl">
          {getRankBadge(rank)}
        </div>

        {/* MICI Count */}
        <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold text-sm">
          {miciCount} MICI
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-chewy text-lg text-foreground line-clamp-1">
          {name}
        </h4>
        <p className="text-sm text-muted-foreground">by {author}</p>
      </div>
    </div>
  );
};

export default LeaderboardCard;
