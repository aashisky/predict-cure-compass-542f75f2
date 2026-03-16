import { motion } from "framer-motion";
import { Clock, AlertOctagon, AlertTriangle, Info, Zap } from "lucide-react";
import { outbreakTimeline, diseases } from "@/data/diseaseData";

const impactConfig = {
  low: { color: 'border-info/30 bg-info/5', dot: 'bg-info', icon: Info },
  medium: { color: 'border-warning/30 bg-warning/5', dot: 'bg-warning', icon: AlertTriangle },
  high: { color: 'border-accent/30 bg-accent/5', dot: 'bg-accent', icon: Zap },
  critical: { color: 'border-critical/30 bg-critical/5', dot: 'bg-critical animate-pulse-glow', icon: AlertOctagon },
};

export const OutbreakTimeline = () => {
  const sorted = [...outbreakTimeline].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-primary" size={18} />
        <h3 className="text-sm font-semibold text-foreground">Outbreak Timeline</h3>
        <span className="text-[9px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded-full ml-auto">
          KEY EVENTS
        </span>
      </div>

      <div className="relative space-y-0 max-h-[400px] overflow-y-auto pr-2">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

        {sorted.map((event, i) => {
          const config = impactConfig[event.impact];
          const Icon = config.icon;
          const disease = diseases.find(d => d.id === event.diseaseId);
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="relative pl-6 pb-4"
            >
              {/* Dot */}
              <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-background ${config.dot} z-10`} />

              <div className={`p-3 rounded-md border ${config.color}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={12} className={config.dot.replace('bg-', 'text-').replace(' animate-pulse-glow', '')} />
                  <span className="text-xs font-semibold text-foreground">{event.title}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-1.5">{event.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-[10px] font-mono text-primary">{disease?.name}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{event.region}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
