import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GrillCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  author: string;
  location?: string;
  miciCount: number;
  isLiked?: boolean;
  onLike?: (id: string) => void;
  onClick?: (id: string) => void;
}

// SVG pentru MIC
const MicIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse 
      cx="12" 
      cy="12" 
      rx="8" 
      ry="5" 
      fill={filled ? "#8B4513" : "#FFB6C1"}
      stroke={filled ? "#5D2906" : "#FF69B4"}
      strokeWidth="1.5"
    />
    <path 
      d="M6 10c0-1 1-2 2-2h8c1 0 2 1 2 2" 
      stroke={filled ? "#5D2906" : "#FF69B4"} 
      strokeWidth="1"
      fill="none"
    />
  </svg>
);

const GrillCard = ({
  id,
  name,
  description,
  imageUrl,
  author,
  miciCount,
  isLiked = false,
  onLike,
  onClick,
}: GrillCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    onLike?.(id);
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card"
      onClick={() => onClick?.(id)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <h3 className="font-chewy text-xl text-foreground mb-1 line-clamp-1">
          {name}
        </h3>

        {/* Author */}
        <p className="text-sm text-muted-foreground mb-2">
          by {author}
        </p>

        {/* Description */}
        <p className="text-sm text-foreground line-clamp-2 mb-4">
          {description}
        </p>

        {/* MICI Button */}
        <button
          onClick={handleLike}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200",
            isLiked 
              ? "bg-amber-100 text-amber-800" 
              : "bg-pink-50 text-pink-600 hover:bg-pink-100",
            isAnimating && "scale-110"
          )}
        >
          <MicIcon filled={isLiked} />
          <span className="font-semibold text-sm">{miciCount}</span>
        </button>
      </CardContent>
    </Card>
  );
};

export default GrillCard;
