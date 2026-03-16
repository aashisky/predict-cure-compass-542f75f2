import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Activity, Shield, Globe, Bell, Cpu, Radio,
  Biohazard, HeartPulse, Skull, Users, Dna, Clock, GitBranch, Grid3X3
} from "lucide-react";
import { MetricCard, DiseaseRow } from "@/components/dashboard/MetricCard";
import { AlertFeed } from "@/components/dashboard/AlertFeed";
import { RegionPanel } from "@/components/dashboard/RegionPanel";
import { EpiCurveChart } from "@/components/dashboard/EpiCurveChart";
import { PredictionEngine } from "@/components/dashboard/PredictionEngine";
import { GenomicTracker } from "@/components/dashboard/GenomicTracker";
import { DiseaseHeatmap } from "@/components/dashboard/DiseaseHeatmap";
import { OutbreakTimeline } from "@/components/dashboard/OutbreakTimeline";
import { CorrelationMatrix } from "@/components/dashboard/CorrelationMatrix";
import { PathogenFilter } from "@/components/dashboard/PathogenFilter";
import { DiseaseDetailPanel } from "@/components/dashboard/DiseaseDetailPanel";
import { diseases, alerts, regions, formatNumber } from "@/data/diseaseData";

type TabId = 'overview' | 'genomics' | 'predictions' | 'analytics';

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'predictions', label: 'Predictions', icon: Cpu },
  { id: 'genomics', label: 'Genomics', icon: Dna },
  { id: 'analytics', label: 'Analytics', icon: Grid3X3 },
];

const Dashboard = () => {
  const [selectedDisease, setSelectedDisease] = useState(diseases[0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [pathogenFilter, setPathogenFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pathogenCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    diseases.forEach(d => { counts[d.pathogen] = (counts[d.pathogen] || 0) + 1; });
    return counts;
  }, []);

  const filteredDiseases = useMemo(() => {
    let list = diseases;
    if (pathogenFilter !== 'all') list = list.filter(d => d.pathogen === pathogenFilter);
    if (searchQuery) list = list.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return list;
  }, [pathogenFilter, searchQuery]);

  const totalCases = diseases.reduce((s, d) => s + d.cases, 0);
  const totalDeaths = diseases.reduce((s, d) => s + d.deaths, 0);
  const totalActive = diseases.reduce((s, d) => s + d.activeCases, 0);
  const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
  const criticalDiseases = diseases.filter(d => d.riskLevel === 'critical').length;

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
                MedTrack
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">v3.0</span>
              </h1>
              <p className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                WHO Disease Surveillance Intelligence Platform
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-muted/50 rounded-lg p-1 border border-border">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary/15 text-primary border border-primary/30'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Radio size={12} className="text-success animate-pulse-glow" />
              LIVE
            </div>
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Cpu size={12} className="text-primary" />
              AI ACTIVE
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <MetricCard title="Global Cases" value={totalCases} subtitle="All tracked diseases" riskLevel="moderate" icon={<Biohazard size={80} />} delay={0} />
          <MetricCard title="Active Cases" value={totalActive} trend="rising" subtitle="Currently infected" riskLevel="high" icon={<HeartPulse size={80} />} delay={0.05} />
          <MetricCard title="Global Deaths" value={totalDeaths} subtitle="Cumulative fatalities" riskLevel="critical" icon={<Skull size={80} />} delay={0.1} />
          <MetricCard title="Diseases Tracked" value={diseases.length} subtitle={`${criticalDiseases} critical-risk pathogens`} riskLevel={criticalDiseases > 3 ? 'high' : 'moderate'} icon={<Activity size={80} />} delay={0.15} />
          <MetricCard title="Active Alerts" value={alerts.length} subtitle={`${criticalAlerts} critical severity`} riskLevel={criticalAlerts > 2 ? 'critical' : 'high'} icon={<Bell size={80} />} delay={0.2} />
        </div>

        {/* Mobile tab selector */}
        <div className="flex md:hidden overflow-x-auto gap-1 bg-muted/50 rounded-lg p-1 border border-border">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left sidebar - Disease list */}
            <div className="lg:col-span-3">
              <div className="rounded-lg border border-border bg-card p-3">
                <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Biohazard size={12} className="text-primary" />
                  Disease Registry ({filteredDiseases.length})
                </h2>
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search diseases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-muted border border-border rounded-md px-3 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary mb-2"
                />
                <PathogenFilter selected={pathogenFilter} onChange={setPathogenFilter} counts={pathogenCounts} />
                <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
                  {filteredDiseases.map(d => (
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

            {/* Center */}
            <div className="lg:col-span-6 space-y-4">
              <DiseaseDetailPanel disease={selectedDisease} />
              <div className="rounded-lg border border-border bg-card p-4">
                <EpiCurveChart diseaseId={selectedDisease.id} diseaseName={selectedDisease.name} />
              </div>
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-lg border border-border bg-card p-3">
                <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Bell size={12} className="text-warning" />
                  Alert Feed ({alerts.length})
                </h2>
                <AlertFeed alerts={alerts} />
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Globe size={12} className="text-primary" />
                  WHO Regions — Risk Index
                </h2>
                <RegionPanel regions={regions} />
              </div>
            </div>
          </div>
        )}

        {/* TAB: PREDICTIONS */}
        {activeTab === 'predictions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PredictionEngine />
            <OutbreakTimeline />
          </div>
        )}

        {/* TAB: GENOMICS */}
        {activeTab === 'genomics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <GenomicTracker />
            <CorrelationMatrix />
          </div>
        )}

        {/* TAB: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <DiseaseHeatmap />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <OutbreakTimeline />
              <CorrelationMatrix />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-4 border-t border-border">
          <p className="text-[10px] font-mono text-muted-foreground">
            MedTrack v3.0 • {diseases.length} diseases tracked across {regions.length} WHO regions •
            Predictive model: Modified SIR with exponential smoothing •
            Last sync: {currentTime.toISOString().split('T')[0]}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
