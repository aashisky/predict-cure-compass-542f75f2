import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { generatePrediction, diseases, formatNumber } from "@/data/diseaseData";
import { Brain, AlertTriangle, TrendingUp, Calendar, Gauge } from "lucide-react";

export const PredictionEngine = () => {
  const [selectedDisease, setSelectedDisease] = useState('mpox');
  const [interventionLevel, setInterventionLevel] = useState(0.3);
  const [daysAhead, setDaysAhead] = useState(90);

  const prediction = useMemo(
    () => generatePrediction(selectedDisease, daysAhead, interventionLevel),
    [selectedDisease, daysAhead, interventionLevel]
  );

  const chartData = useMemo(() => {
    const historical = prediction.historical.map(d => ({
      date: d.date,
      cases: d.cases,
      type: 'historical',
    }));

    const predicted = prediction.predicted.map((d, i) => ({
      date: d.date,
      predictedCases: d.cases,
      upperBound: prediction.confidence.upper[i],
      lowerBound: prediction.confidence.lower[i],
      type: 'predicted',
    }));

    // Bridge point
    const last = historical[historical.length - 1];
    const bridge = {
      date: last.date,
      cases: last.cases,
      predictedCases: last.cases,
      upperBound: last.cases,
      lowerBound: last.cases,
      type: 'bridge',
    };

    return [...historical, bridge, ...predicted];
  }, [prediction]);

  const disease = diseases.find(d => d.id === selectedDisease)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-primary/20 bg-card p-5 glow-primary"
    >
      <div className="flex items-center gap-2 mb-5">
        <Brain className="text-primary" size={20} />
        <h2 className="text-lg font-bold text-foreground">Predictive Spread Modeling</h2>
        <span className="text-[10px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-auto">
          SIR-BASED MODEL
        </span>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1.5">Disease</label>
          <select
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
            className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {diseases.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1.5">
            Forecast Horizon: {daysAhead} days
          </label>
          <input
            type="range"
            min={30}
            max={180}
            step={30}
            value={daysAhead}
            onChange={(e) => setDaysAhead(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1.5">
            Intervention Level: {Math.round(interventionLevel * 100)}%
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={interventionLevel}
            onChange={(e) => setInterventionLevel(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Prediction metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-md bg-muted/50 border border-border">
          <div className="flex items-center gap-1.5 mb-1">
            <Gauge size={12} className="text-primary" />
            <span className="text-[10px] font-mono uppercase text-muted-foreground">R₀ Estimate</span>
          </div>
          <span className={`text-xl font-mono font-bold ${
            prediction.r0Estimate > 1 ? 'text-critical' : 'text-success'
          }`}>
            {prediction.r0Estimate}
          </span>
        </div>
        <div className="p-3 rounded-md bg-muted/50 border border-border">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp size={12} className="text-warning" />
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Peak Cases/wk</span>
          </div>
          <span className="text-xl font-mono font-bold text-foreground">{formatNumber(prediction.peakCases)}</span>
        </div>
        <div className="p-3 rounded-md bg-muted/50 border border-border">
          <div className="flex items-center gap-1.5 mb-1">
            <Calendar size={12} className="text-info" />
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Peak Date</span>
          </div>
          <span className="text-sm font-mono font-bold text-foreground">
            {new Date(prediction.peakDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <div className="p-3 rounded-md bg-muted/50 border border-border">
          <div className="flex items-center gap-1.5 mb-1">
            <AlertTriangle size={12} className="text-critical" />
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Risk Assessment</span>
          </div>
          <span className={`text-sm font-mono font-bold uppercase ${
            prediction.r0Estimate > 1.5 ? 'text-critical' : prediction.r0Estimate > 1 ? 'text-warning' : 'text-success'
          }`}>
            {prediction.r0Estimate > 1.5 ? 'HIGH SPREAD' : prediction.r0Estimate > 1 ? 'MODERATE' : 'DECLINING'}
          </span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="grad-historical" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(174, 72%, 50%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(174, 72%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad-predicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(35, 90%, 55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(35, 90%, 55%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad-confidence" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(35, 90%, 55%)" stopOpacity={0.1} />
              <stop offset="100%" stopColor="hsl(35, 90%, 55%)" stopOpacity={0} />
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
            tickFormatter={(v) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v >= 1000 ? `${(v/1000).toFixed(0)}K` : String(v)}
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
            formatter={(value: number, name: string) => [
              value.toLocaleString(),
              name === 'cases' ? 'Historical' : name === 'predictedCases' ? 'Predicted' : name === 'upperBound' ? 'Upper CI' : 'Lower CI'
            ]}
          />
          <Area type="monotone" dataKey="upperBound" stroke="none" fill="url(#grad-confidence)" />
          <Area type="monotone" dataKey="lowerBound" stroke="none" fill="url(#grad-confidence)" />
          <Area type="monotone" dataKey="cases" stroke="hsl(174, 72%, 50%)" strokeWidth={2} fill="url(#grad-historical)" />
          <Area type="monotone" dataKey="predictedCases" stroke="hsl(35, 90%, 55%)" strokeWidth={2} strokeDasharray="6 3" fill="url(#grad-predicted)" />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-primary rounded" />
          <span className="text-[10px] font-mono text-muted-foreground">Historical</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-accent rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(35, 90%, 55%) 0, hsl(35, 90%, 55%) 4px, transparent 4px, transparent 7px)' }} />
          <span className="text-[10px] font-mono text-muted-foreground">Predicted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 bg-accent/10 rounded" />
          <span className="text-[10px] font-mono text-muted-foreground">Confidence Interval</span>
        </div>
      </div>
    </motion.div>
  );
};
