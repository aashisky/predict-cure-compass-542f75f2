import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { correlationMatrix, diseases } from "@/data/diseaseData";

const getCorrelationColor = (val: number): string => {
  if (val >= 0.8) return 'bg-critical/40 text-critical';
  if (val >= 0.6) return 'bg-warning/30 text-warning';
  if (val >= 0.4) return 'bg-info/25 text-info';
  return 'bg-success/15 text-success';
};

const getCorrelationLabel = (val: number): string => {
  if (val >= 0.8) return 'Very Strong';
  if (val >= 0.6) return 'Strong';
  if (val >= 0.4) return 'Moderate';
  return 'Weak';
};

export const CorrelationMatrix = () => {
  const sorted = [...correlationMatrix].sort((a, b) => b.correlation - a.correlation);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="text-primary" size={18} />
        <h3 className="text-sm font-semibold text-foreground">Cross-Disease Correlations</h3>
        <span className="text-[9px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded-full ml-auto">
          AI ANALYSIS
        </span>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {sorted.map((corr, i) => {
          const d1 = diseases.find(d => d.id === corr.disease1);
          const d2 = diseases.find(d => d.id === corr.disease2);
          const colorClass = getCorrelationColor(corr.correlation);
          return (
            <motion.div
              key={`${corr.disease1}-${corr.disease2}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="p-3 rounded-md border border-border bg-card/50"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="text-foreground font-medium">{d1?.name}</span>
                  <span className="text-muted-foreground">↔</span>
                  <span className="text-foreground font-medium">{d2?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${colorClass}`}>
                    {getCorrelationLabel(corr.correlation)}
                  </span>
                  <span className="text-sm font-mono font-bold text-foreground">{corr.correlation.toFixed(2)}</span>
                </div>
              </div>
              {/* Correlation bar */}
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${corr.correlation * 100}%` }}
                  transition={{ delay: i * 0.04 + 0.2, duration: 0.5 }}
                  className={`h-full rounded-full ${colorClass.split(' ')[0]}`}
                />
              </div>
              <p className="text-[10px] font-mono text-muted-foreground">{corr.mechanism}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
