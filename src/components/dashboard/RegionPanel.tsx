import { motion } from "framer-motion";
import type { RegionData } from "@/data/diseaseData";
import { formatNumber } from "@/data/diseaseData";

const getRiskColor = (score: number) => {
  if (score >= 75) return { bar: 'bg-critical', text: 'text-critical', glow: 'glow-critical' };
  if (score >= 50) return { bar: 'bg-warning', text: 'text-warning', glow: 'glow-accent' };
  if (score >= 30) return { bar: 'bg-info', text: 'text-info', glow: '' };
  return { bar: 'bg-success', text: 'text-success', glow: '' };
};

export const RegionPanel = ({ regions }: { regions: RegionData[] }) => (
  <div className="space-y-3">
    {regions
      .sort((a, b) => b.riskScore - a.riskScore)
      .map((region, i) => {
        const risk = getRiskColor(region.riskScore);
        return (
          <motion.div
            key={region.code}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-3 rounded-md border border-border bg-card/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  {region.code}
                </span>
                <span className="text-sm font-medium text-foreground">{region.region}</span>
              </div>
              <span className={`text-sm font-mono font-bold ${risk.text}`}>
                {region.riskScore}
              </span>
            </div>
            
            {/* Risk bar */}
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${region.riskScore}%` }}
                transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
                className={`h-full rounded-full ${risk.bar}`}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] font-mono text-muted-foreground block">CASES</span>
                <span className="text-xs font-mono font-medium text-foreground">{formatNumber(region.totalCases)}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-muted-foreground block">ACTIVE</span>
                <span className="text-xs font-mono font-medium text-warning">{formatNumber(region.activeCases)}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-muted-foreground block">DEATHS</span>
                <span className="text-xs font-mono font-medium text-critical">{formatNumber(region.deaths)}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
  </div>
);
