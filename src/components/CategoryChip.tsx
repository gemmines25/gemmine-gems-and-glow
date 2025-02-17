
import { cn } from "@/lib/utils";

interface CategoryChipProps {
  name: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const CategoryChip = ({ name, isActive, onClick }: CategoryChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-white"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      )}
    >
      {name}
    </button>
  );
};
