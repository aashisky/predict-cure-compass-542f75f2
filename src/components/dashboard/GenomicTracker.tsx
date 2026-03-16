import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Dna, AlertTriangle, Shield, Zap } from "lucide-react";
import { genomicVariants, diseases } from "@/data/diseaseData";

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  'monitoring': { bg: 'bg-info/10 border-info/20', text: 'text-info', label: 'VUM' },
  'interest': { bg: 'bg-warning/10 border-warning/20', text: 'text-warning', label: 'VOI' },
  'concern': { bg: 'bg-accent/10 border-accent/20', text: 'text-accent', label: 'VOC' },
  'high-consequence': { bg: 'bg-critical/10 border-critical/20', text: 'text-critical', label: 'VOHC' },
};

export const GenomicTracker = () => {
  const [filter, setFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return genomicVariants;
    return genomicVariants.filter(v => v.diseaseId === filter);
  }, [filter]);

  const uniqueDiseases = [...new Set(genomicVariants.map(v => v.diseaseId))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Dna className="text-primary" size={18} />
          <h3 className="text-sm font-semibold text-foreground">Genomic Variant Tracker</h3>
          <span className="text-[9px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
            LIVE SEQUENCING
          </span>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-muted border border-border rounded px-2 py-1 text-[11px] font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="all">All Pathogens</option>
          {uniqueDiseases.map(id => (
            <option key={id} value={id}>{diseases.find(d => d.id === id)?.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
        {filtered.map((variant, i) => {
          const status = statusColors[variant.status];
          const disease = diseases.find(d => d.id === variant.diseaseId);
          return (
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-3 rounded-md border ${status.bg}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{variant.name}</span>
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${status.text} bg-background/50`}>
                    {status.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{disease?.name}</span>
              </div>

              <div className="text-[10px] font-mono text-muted-foreground mb-2 truncate">
                {variant.lineage}
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    <Zap size={9} className="text-warning" />
                    <span className="text-[9px] font-mono text-muted-foreground">TRANS.</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-warning"
                      style={{ width: `${Math.min(100, variant.transmissibility * 60)}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-foreground">{variant.transmissibility}x</span>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    <AlertTriangle size={9} className="text-critical" />
                    <span className="text-[9px] font-mono text-muted-foreground">SEV.</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-critical"
                      style={{ width: `${Math.min(100, variant.severity * 55)}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-foreground">{variant.severity}x</span>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    <Shield size={9} className="text-info" />
                    <span className="text-[9px] font-mono text-muted-foreground">ESCAPE</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-info"
                      style={{ width: `${variant.immuneEvasion * 100}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-foreground">{(variant.immuneEvasion * 100).toFixed(0)}%</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-muted-foreground block">SPREAD</span>
                  <span className="text-xs font-mono font-bold text-foreground">{variant.countriesAffected}</span>
                  <span className="text-[9px] font-mono text-muted-foreground block">countries</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
