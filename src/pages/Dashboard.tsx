import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity, Shield, Globe, Bell, Cpu, Radio,
  Biohazard, HeartPulse, Skull, Users
} from "lucide-react";
import { MetricCard, DiseaseRow } from "@/components/dashboard/MetricCard";
import { AlertFeed } from "@/components/dashboard/AlertFeed";
import { RegionPanel } from "@/components/dashboard/RegionPanel";
import { EpiCurveChart } from "@/components/dashboard/EpiCurveChart";
import { PredictionEngine } from "@/components/dashboard/PredictionEngine";
import { diseases, alerts, regions, formatNumber } from "@/data/diseaseData";

const Dashboard = () => {
  const [selectedDisease, setSelectedDisease] = useState(diseases[0]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalCases = diseases.reduce((s, d) => s + d.cases, 0);
  const totalDeaths = diseases.reduce((s, d) => s + d.deaths, 0);
  const totalActive = diseases.reduce((s, d) => s + d.activeCases, 0);
  const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="text-primary" size={28} />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full animate-pulse-glow" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                SENTINEL
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">v2.0</span>
              </h1>
              <p className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                WHO Disease Surveillance Intelligence Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Radio size={12} className="text-success animate-pulse-glow" />
              LIVE DATA FEED
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Cpu size={12} className="text-primary" />
              AI ENGINE ACTIVE
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md border border-border">
              <Globe size={12} className="text-primary" />
              <span className="text-xs font-mono text-foreground">
                {currentTime.toUTCString().slice(0, -4)} UTC
              </span>
            </div>
            <div className="relative">
              <Bell size={18} className="text-muted-foreground" />
              {criticalAlerts > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-critical text-[9px] text-foreground font-bold rounded-full flex items-center justify-center animate-pulse-glow">
                  {criticalAlerts}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto p-4 space-y-4">
        {/* Top metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard
            title="Global Cases"
            value={totalCases}
            subtitle="All tracked diseases"
            riskLevel="moderate"
            icon={<Biohazard size={80} />}
            delay={0}
          />
          <MetricCard
            title="Active Cases"
            value={totalActive}
            trend="rising"
            subtitle="Currently infected"
            riskLevel="high"
            icon={<HeartPulse size={80} />}
            delay={0.1}
          />
          <MetricCard
            title="Global Deaths"
            value={totalDeaths}
            subtitle="Cumulative fatalities"
            riskLevel="critical"
            icon={<Skull size={80} />}
            delay={0.2}
          />
          <MetricCard
            title="Diseases Tracked"
            value={diseases.length}
            subtitle={`${criticalAlerts} critical alerts active`}
            riskLevel={criticalAlerts > 0 ? 'high' : 'low'}
            icon={<Activity size={80} />}
            delay={0.3}
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left sidebar - Disease list */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Biohazard size={12} className="text-primary" />
                Diseases
              </h2>
              <div className="space-y-1">
                {diseases.map(d => (
                  <DiseaseRow
                    key={d.id}
                    disease={d}
                    isSelected={selectedDisease.id === d.id}
                    onClick={() => setSelectedDisease(d)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center - Charts */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <EpiCurveChart diseaseId={selectedDisease.id} diseaseName={selectedDisease.name} />
            </div>
            <PredictionEngine />
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-3 space-y-4">
            {/* Alerts */}
            <div className="rounded-lg border border-border bg-card p-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Bell size={12} className="text-warning" />
                Alert Feed
              </h2>
              <AlertFeed alerts={alerts} />
            </div>

            {/* Regions */}
            <div className="rounded-lg border border-border bg-card p-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Globe size={12} className="text-primary" />
                WHO Regions — Risk Index
              </h2>
              <RegionPanel regions={regions} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-4 border-t border-border">
          <p className="text-[10px] font-mono text-muted-foreground">
            SENTINEL v2.0 • Data sourced from WHO EIOS, IHR, & GIS platforms • Predictive model: Modified SIR with exponential smoothing •
            Last sync: {currentTime.toISOString().split('T')[0]}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
