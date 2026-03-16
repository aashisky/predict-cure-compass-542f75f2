import { useMemo } from "react";
import { motion } from "framer-motion";
import { Grid3X3 } from "lucide-react";
import { diseases, regions, formatNumber } from "@/data/diseaseData";

// Simulated disease-by-region case distribution
const getRegionCases = (diseaseId: string, regionCode: string): number => {
  const disease = diseases.find(d => d.id === diseaseId);
  if (!disease) return 0;
  // Simple hash-based distribution
  const hash = (diseaseId + regionCode).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const factor = ((hash % 100) / 100) * 0.8 + 0.1;
  // Boost if disease region matches
  const region = regions.find(r => r.code === regionCode);
  const boost = region && disease.region === region.region ? 3 : 
                disease.region === 'Global' ? 1.2 : 1;
  return Math.round(disease.cases * factor * boost / regions.length);
};

const getHeatColor = (value: number, max: number): string => {
  const ratio = Math.min(value / max, 1);
  if (ratio < 0.1) return 'bg-success/10';
  if (ratio < 0.25) return 'bg-success/30';
  if (ratio < 0.4) return 'bg-info/30';
  if (ratio < 0.55) return 'bg-warning/20';
  if (ratio < 0.7) return 'bg-warning/40';
  if (ratio < 0.85) return 'bg-critical/30';
  return 'bg-critical/50';
};

export const DiseaseHeatmap = () => {
  const topDiseases = useMemo(() => 
    diseases.sort((a, b) => b.cases - a.cases).slice(0, 10),
    []
  );

  const heatData = useMemo(() => {
    const data: Record<string, Record<string, number>> = {};
    let maxVal = 0;
    topDiseases.forEach(d => {
      data[d.id] = {};
      regions.forEach(r => {
        const val = getRegionCases(d.id, r.code);
        data[d.id][r.code] = val;
        if (val > maxVal) maxVal = val;
      });
    });
    return { data, maxVal };
  }, [topDiseases]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Grid3X3 className="text-primary" size={18} />
        <h3 className="text-sm font-semibold text-foreground">Disease × Region Heatmap</h3>
        <span className="text-[9px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded-full ml-auto">
          CROSS-ANALYSIS
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[10px] font-mono">
          <thead>
            <tr>
              <th className="text-left text-muted-foreground pb-2 pr-2 min-w-[100px]">DISEASE</th>
              {regions.map(r => (
                <th key={r.code} className="text-center text-muted-foreground pb-2 px-1 min-w-[52px]">
                  {r.code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topDiseases.map((disease, i) => (
              <motion.tr
                key={disease.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <td className="text-foreground py-1 pr-2 truncate max-w-[100px]" title={disease.name}>
                  {disease.name}
                </td>
                {regions.map(r => {
                  const val = heatData.data[disease.id]?.[r.code] || 0;
                  return (
                    <td key={r.code} className="p-0.5">
                      <div
                        className={`w-full h-7 rounded-sm flex items-center justify-center ${getHeatColor(val, heatData.maxVal)} transition-colors cursor-default`}
                        title={`${disease.name} in ${r.region}: ${formatNumber(val)}`}
                      >
                        <span className="text-[8px] text-foreground/70">{formatNumber(val)}</span>
                      </div>
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1 mt-3">
        <span className="text-[9px] font-mono text-muted-foreground">LOW</span>
        <div className="flex gap-0.5">
          {['bg-success/10', 'bg-success/30', 'bg-info/30', 'bg-warning/20', 'bg-warning/40', 'bg-critical/30', 'bg-critical/50'].map((c, i) => (
            <div key={i} className={`w-5 h-2 rounded-sm ${c}`} />
          ))}
        </div>
        <span className="text-[9px] font-mono text-muted-foreground">HIGH</span>
      </div>
    </motion.div>
  );
};
