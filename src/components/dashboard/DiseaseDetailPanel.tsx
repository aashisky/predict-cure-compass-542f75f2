import { motion } from "framer-motion";
import { Shield, Syringe, Clock, Zap, Users, Skull, MapPin } from "lucide-react";
import { formatNumber, type DiseaseData, getDemographics, getTopCountries } from "@/data/diseaseData";

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

  const demo = getDemographics(disease);
  const countries = getTopCountries(disease);

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

      {/* Demographics */}
      <div className="p-2.5 rounded bg-muted/30 border border-border space-y-2">
        <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Demographics</span>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[9px] font-mono text-muted-foreground">Sex Distribution</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden flex">
                <div className="h-full bg-info rounded-l-full" style={{ width: `${demo.male}%` }} />
                <div className="h-full bg-accent rounded-r-full" style={{ width: `${demo.female}%` }} />
              </div>
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[8px] font-mono text-info">♂ {demo.male}%</span>
              <span className="text-[8px] font-mono text-accent">♀ {demo.female}%</span>
            </div>
          </div>
          <div>
            <span className="text-[9px] font-mono text-muted-foreground">Age Groups</span>
            <div className="flex items-center gap-0.5 mt-1">
              {[
                { key: 'children', label: '0-14', color: 'bg-success', val: demo.children },
                { key: 'youth', label: '15-24', color: 'bg-info', val: demo.youth },
                { key: 'adult', label: '25-64', color: 'bg-primary', val: demo.adult },
                { key: 'elderly', label: '65+', color: 'bg-warning', val: demo.elderly },
              ].map(ag => (
                <div key={ag.key} className={`h-2 ${ag.color} rounded-sm`} style={{ width: `${ag.val}%` }} title={`${ag.label}: ${ag.val}%`} />
              ))}
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[8px] font-mono text-success">0-14: {demo.children}%</span>
              <span className="text-[8px] font-mono text-warning">65+: {demo.elderly}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Countries */}
      <div className="space-y-1.5">
        <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
          <MapPin size={9} /> Top Affected Countries
        </span>
        <div className="grid grid-cols-3 gap-1">
          {countries.slice(0, 6).map((c, i) => (
            <div key={c.country} className="flex items-center gap-1.5 px-2 py-1 rounded bg-muted/30 border border-border">
              <span className="text-[9px] font-mono text-primary font-bold">#{i + 1}</span>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-mono text-foreground truncate block">{c.country}</span>
                <span className="text-[8px] font-mono text-muted-foreground">{formatNumber(c.cases)}</span>
              </div>
            </div>
          ))}
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
