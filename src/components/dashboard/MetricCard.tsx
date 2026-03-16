import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatNumber, type DiseaseData } from "@/data/diseaseData";

interface MetricCardProps {
  title: string;
  value: number;
  subtitle?: string;
  trend?: 'rising' | 'falling' | 'stable';
  riskLevel?: 'low' | 'moderate' | 'high' | 'critical';
  icon?: React.ReactNode;
  delay?: number;
}

const riskColors: Record<string, string> = {
  low: 'border-success/30 bg-success/5',
  moderate: 'border-info/30 bg-info/5',
  high: 'border-warning/30 bg-warning/5',
  critical: 'border-critical/30 bg-critical/5',
};

const riskBadge: Record<string, string> = {
  low: 'bg-success/20 text-success',
  moderate: 'bg-info/20 text-info',
  high: 'bg-warning/20 text-warning',
  critical: 'bg-critical/20 text-critical animate-pulse-glow',
};

export const MetricCard = ({ title, value, subtitle, trend, riskLevel = 'low', icon, delay = 0 }: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className={`relative overflow-hidden rounded-lg border p-4 ${riskColors[riskLevel]}`}
  >
    <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
      {icon}
    </div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{title}</span>
      {riskLevel && (
        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${riskBadge[riskLevel]}`}>
          {riskLevel}
        </span>
      )}
    </div>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-bold font-mono tracking-tight text-foreground">
        {formatNumber(value)}
      </span>
      {trend && (
        <span className={`flex items-center gap-1 text-xs font-mono mb-1 ${
          trend === 'rising' ? 'text-critical' : trend === 'falling' ? 'text-success' : 'text-muted-foreground'
        }`}>
          {trend === 'rising' ? <TrendingUp size={12} /> : trend === 'falling' ? <TrendingDown size={12} /> : <Minus size={12} />}
          {trend}
        </span>
      )}
    </div>
    {subtitle && <p className="text-xs text-muted-foreground mt-1 font-mono">{subtitle}</p>}
  </motion.div>
);

interface DiseaseRowProps {
  disease: DiseaseData;
  isSelected: boolean;
  onClick: () => void;
}

export const DiseaseRow = ({ disease, isSelected, onClick }: DiseaseRowProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ x: 4 }}
    className={`w-full text-left px-3 py-2.5 rounded-md border transition-colors ${
      isSelected
        ? 'border-primary/50 bg-primary/10'
        : 'border-transparent hover:border-border hover:bg-muted/50'
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          disease.riskLevel === 'critical' ? 'bg-critical animate-pulse-glow' :
          disease.riskLevel === 'high' ? 'bg-warning' :
          disease.riskLevel === 'moderate' ? 'bg-info' : 'bg-success'
        }`} />
        <span className="text-sm font-medium text-foreground">{disease.name}</span>
      </div>
      <span className="text-xs font-mono text-muted-foreground">{formatNumber(disease.cases)}</span>
    </div>
    <div className="flex items-center gap-3 mt-1 ml-4">
      <span className="text-[10px] font-mono text-muted-foreground">CFR: {disease.cfr}%</span>
      <span className="text-[10px] font-mono text-muted-foreground">{disease.region}</span>
    </div>
  </motion.button>
);
