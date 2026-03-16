import { motion } from "framer-motion";
import { Shield, Syringe, Clock, Zap, Users, Skull } from "lucide-react";
import { formatNumber, type DiseaseData } from "@/data/diseaseData";

export const DiseaseDetailPanel = ({ disease }: { disease: DiseaseData }) => {
  const riskColorMap: Record<string, string> = {
    low: 'text-success',
    moderate: 'text-info',
    high: 'text-warning',
    critical: 'text-critical',
  };

  const pathogenColorMap: Record<string, string> = {
    virus: 'bg-critical/10 text-critical',
    bacteria: 'bg-warning/10 text-warning',
    parasite: 'bg-info/10 text-info',
    fungus: 'bg-accent/10 text-accent',
    prion: 'bg-muted text-muted-foreground',
  };

  return (
    <motion.div
      key={disease.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-border bg-card/80 p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">{disease.name}</h3>
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${pathogenColorMap[disease.pathogen]}`}>
            {disease.pathogen}
          </span>
          <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
            disease.riskLevel === 'critical' ? 'bg-critical/20 text-critical animate-pulse-glow' :
            disease.riskLevel === 'high' ? 'bg-warning/20 text-warning' :
            disease.riskLevel === 'moderate' ? 'bg-info/20 text-info' : 'bg-success/20 text-success'
          }`}>
            {disease.riskLevel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 rounded bg-muted/50 border border-border">
          <div className="flex items-center gap-1 mb-1">
            <Users size={10} className="text-primary" />
            <span className="text-[9px] font-mono text-muted-foreground">TOTAL CASES</span>
          </div>
          <span className="text-sm font-mono font-bold text-foreground">{formatNumber(disease.cases)}</span>
        </div>
        <div className="p-2 rounded bg-muted/50 border border-border">
          <div className="flex items-center gap-1 mb-1">
            <Skull size={10} className="text-critical" />
            <span className="text-[9px] font-mono text-muted-foreground">DEATHS</span>
          </div>
          <span className="text-sm font-mono font-bold text-critical">{formatNumber(disease.deaths)}</span>
        </div>
        <div className="p-2 rounded bg-muted/50 border border-border">
          <div className="flex items-center gap-1 mb-1">
            <Zap size={10} className="text-warning" />
            <span className="text-[9px] font-mono text-muted-foreground">CFR</span>
          </div>
          <span className={`text-sm font-mono font-bold ${riskColorMap[disease.riskLevel]}`}>{disease.cfr}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Zap size={10} className="text-primary" />
          <span>{disease.transmission}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={10} className="text-info" />
          <span>Incubation: {disease.incubationDays[0]}–{disease.incubationDays[1]}d</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Shield size={10} className="text-success" />
          <span>Region: {disease.region}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Syringe size={10} className={disease.vaccineAvailable ? 'text-success' : 'text-critical'} />
          <span className={disease.vaccineAvailable ? 'text-success' : 'text-critical'}>
            {disease.vaccineAvailable ? 'Vaccine Available' : 'No Vaccine'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
