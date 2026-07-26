import {
  Grid3x3,
  Trophy,
  Scissors,
  Layers,
  Droplets,
  Scan,
  Crosshair,
  Target,
  Wind,
  Gem,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  grid: Grid3x3,
  trophy: Trophy,
  scissors: Scissors,
  layers: Layers,
  droplets: Droplets,
  scan: Scan,
  crosshair: Crosshair,
  target: Target,
  wind: Wind,
  gem: Gem,
};

/** Maps a feature icon key to its Lucide icon. */
export function FeatureIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Gem;
  return <Icon className={className} strokeWidth={1.4} />;
}
