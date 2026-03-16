import { useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { generateTimeSeries } from "@/data/diseaseData";

interface EpiCurveChartProps {
  diseaseId: string;
  diseaseName: string;
}

export const EpiCurveChart = ({ diseaseId, diseaseName }: EpiCurveChartProps) => {
  const [metric, setMetric] = useState<'cases' | 'deaths' | 'recovered'>('cases');
  const data = useMemo(() => generateTimeSeries(diseaseId, 18), [diseaseId]);

  const metricColors: Record<string, string> = {
    cases: 'hsl(174, 72%, 50%)',
    deaths: 'hsl(0, 72%, 55%)',
    recovered: 'hsl(145, 60%, 45%)',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Epidemiological Curve — <span className="text-primary">{diseaseName}</span>
        </h3>
        <div className="flex gap-1">
          {(['cases', 'deaths', 'recovered'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded transition-colors ${
                metric === m
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:text-foreground border border-transparent'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={metricColors[metric]} stopOpacity={0.3} />
              <stop offset="100%" stopColor={metricColors[metric]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: 'hsl(215, 15%, 55%)', fontFamily: 'JetBrains Mono' }}
            tickFormatter={(v) => new Date(v).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
            stroke="hsl(220, 15%, 18%)"
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'hsl(215, 15%, 55%)', fontFamily: 'JetBrains Mono' }}
            stroke="hsl(220, 15%, 18%)"
            tickFormatter={(v) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v >= 1000 ? `${(v/1000).toFixed(0)}K` : v}
          />
          <Tooltip
            contentStyle={{
              background: 'hsl(220, 18%, 10%)',
              border: '1px solid hsl(220, 15%, 18%)',
              borderRadius: '6px',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono',
              color: 'hsl(200, 20%, 92%)',
            }}
            formatter={(value: number) => [value.toLocaleString(), metric]}
            labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          />
          <Area
            type="monotone"
            dataKey={metric}
            stroke={metricColors[metric]}
            strokeWidth={2}
            fill={`url(#gradient-${metric})`}
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
