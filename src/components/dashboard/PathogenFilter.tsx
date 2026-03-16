import { motion } from "framer-motion";
import { Bug, Droplet, Leaf, FlaskConical, HelpCircle } from "lucide-react";

interface PathogenFilterProps {
  selected: string;
  onChange: (pathogen: string) => void;
  counts: Record<string, number>;
}

const pathogenIcons: Record<string, { icon: React.ElementType; label: string }> = {
  all: { icon: Bug, label: 'All' },
  virus: { icon: Droplet, label: 'Viral' },
  bacteria: { icon: FlaskConical, label: 'Bacterial' },
  parasite: { icon: Leaf, label: 'Parasitic' },
  fungus: { icon: Bug, label: 'Fungal' },
  prion: { icon: HelpCircle, label: 'Prion' },
};

export const PathogenFilter = ({ selected, onChange, counts }: PathogenFilterProps) => (
  <div className="flex flex-wrap gap-1.5 mb-3">
    {Object.entries(pathogenIcons).map(([key, { icon: Icon, label }]) => {
      const count = key === 'all' ? Object.values(counts).reduce((a, b) => a + b, 0) : (counts[key] || 0);
      return (
        <motion.button
          key={key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(key)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-mono uppercase transition-colors border ${
            selected === key
              ? 'border-primary/50 bg-primary/10 text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Icon size={11} />
          {label}
          <span className="text-[9px] opacity-60">({count})</span>
        </motion.button>
      );
    })}
  </div>
);
