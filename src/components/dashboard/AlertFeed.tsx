import { motion } from "framer-motion";
import { AlertTriangle, Info, AlertOctagon } from "lucide-react";
import type { AlertItem } from "@/data/diseaseData";

const severityConfig = {
  info: { icon: Info, color: 'text-info', border: 'border-info/20', bg: 'bg-info/5' },
  warning: { icon: AlertTriangle, color: 'text-warning', border: 'border-warning/20', bg: 'bg-warning/5' },
  critical: { icon: AlertOctagon, color: 'text-critical', border: 'border-critical/20', bg: 'bg-critical/5' },
};

export const AlertFeed = ({ alerts }: { alerts: AlertItem[] }) => (
  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
    {alerts.map((alert, i) => {
      const config = severityConfig[alert.severity];
      const Icon = config.icon;
      return (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`p-3 rounded-md border ${config.border} ${config.bg}`}
        >
          <div className="flex items-start gap-2">
            <Icon size={14} className={`${config.color} mt-0.5 shrink-0`} />
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-foreground truncate">{alert.title}</span>
                <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${config.color} bg-background/50`}>
                  {alert.severity}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{alert.description}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {new Date(alert.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="text-[10px] font-mono text-primary">{alert.region}</span>
              </div>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
);
