// WHO-style disease surveillance mock data
export interface DiseaseData {
  id: string;
  name: string;
  cases: number;
  deaths: number;
  recovered: number;
  activeCases: number;
  cfr: number; // case fatality rate
  trend: 'rising' | 'falling' | 'stable';
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  region: string;
}

export interface TimeSeriesPoint {
  date: string;
  cases: number;
  deaths: number;
  recovered: number;
}

export interface AlertItem {
  id: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  region: string;
}

export interface RegionData {
  region: string;
  code: string;
  totalCases: number;
  activeCases: number;
  deaths: number;
  riskScore: number; // 0-100
}

export const diseases: DiseaseData[] = [
  { id: 'covid19', name: 'COVID-19', cases: 776907682, deaths: 7076084, recovered: 768430000, activeCases: 1401598, cfr: 0.91, trend: 'falling', riskLevel: 'moderate', region: 'Global' },
  { id: 'mpox', name: 'Mpox', cases: 99465, deaths: 208, recovered: 89200, activeCases: 10057, cfr: 0.21, trend: 'rising', riskLevel: 'high', region: 'Africa' },
  { id: 'cholera', name: 'Cholera', cases: 535321, deaths: 4187, recovered: 520000, activeCases: 11134, cfr: 0.78, trend: 'rising', riskLevel: 'high', region: 'Africa' },
  { id: 'dengue', name: 'Dengue', cases: 12788420, deaths: 7905, recovered: 12500000, activeCases: 280515, cfr: 0.06, trend: 'stable', riskLevel: 'moderate', region: 'Americas' },
  { id: 'measles', name: 'Measles', cases: 321582, deaths: 1287, recovered: 315000, activeCases: 5295, cfr: 0.4, trend: 'rising', riskLevel: 'moderate', region: 'South-East Asia' },
  { id: 'avianflu', name: 'Avian Influenza (H5N1)', cases: 912, deaths: 462, recovered: 450, activeCases: 0, cfr: 50.66, trend: 'stable', riskLevel: 'critical', region: 'Global' },
];

export const generateTimeSeries = (diseaseId: string, months: number = 24): TimeSeriesPoint[] => {
  const data: TimeSeriesPoint[] = [];
  const disease = diseases.find(d => d.id === diseaseId);
  if (!disease) return data;

  const baseCases = disease.cases / (months * 30);
  const now = new Date();

  for (let i = months * 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const seasonal = Math.sin((i / 365) * Math.PI * 2) * 0.3;
    const trend = disease.trend === 'rising' ? (months * 30 - i) / (months * 30) * 0.5 : 
                  disease.trend === 'falling' ? i / (months * 30) * 0.5 : 0;
    const noise = (Math.random() - 0.5) * 0.4;
    
    const factor = 1 + seasonal + trend + noise;
    const dailyCases = Math.max(0, Math.round(baseCases * factor));
    const dailyDeaths = Math.round(dailyCases * (disease.cfr / 100) * (0.8 + Math.random() * 0.4));
    const dailyRecovered = Math.round(dailyCases * 0.85 * (0.7 + Math.random() * 0.6));

    if (i % 7 === 0) {
      data.push({
        date: date.toISOString().split('T')[0],
        cases: dailyCases * 7,
        deaths: dailyDeaths * 7,
        recovered: dailyRecovered * 7,
      });
    }
  }
  return data;
};

export const alerts: AlertItem[] = [
  { id: '1', timestamp: '2026-03-16T08:30:00Z', severity: 'critical', title: 'Mpox Clade Ib Spread', description: 'WHO confirms new clade Ib cases in 3 additional countries in Eastern Africa. Emergency committee convened.', region: 'Africa' },
  { id: '2', timestamp: '2026-03-16T06:15:00Z', severity: 'warning', title: 'Cholera Outbreak Expansion', description: 'Cholera cases surge 40% in Mozambique following cyclone damage to water infrastructure.', region: 'Africa' },
  { id: '3', timestamp: '2026-03-15T22:00:00Z', severity: 'warning', title: 'Dengue Season Alert', description: 'Brazil reports 2.3M cases YTD, exceeding 2024 record pace. Healthcare system strain reported.', region: 'Americas' },
  { id: '4', timestamp: '2026-03-15T18:45:00Z', severity: 'info', title: 'COVID-19 Variant Monitoring', description: 'New XEC.4 subvariant detected in wastewater surveillance across 12 countries. No increased severity observed.', region: 'Global' },
  { id: '5', timestamp: '2026-03-15T14:00:00Z', severity: 'critical', title: 'H5N1 Human Case Confirmed', description: 'Cambodia reports fatal H5N1 case linked to poultry exposure. Contact tracing underway.', region: 'Western Pacific' },
  { id: '6', timestamp: '2026-03-15T10:30:00Z', severity: 'warning', title: 'Measles Resurgence', description: 'India reports 45% increase in measles cases. Vaccination coverage gaps identified in 6 states.', region: 'South-East Asia' },
  { id: '7', timestamp: '2026-03-14T20:00:00Z', severity: 'info', title: 'Surveillance System Update', description: 'WHO EIOS platform integrated new data streams from 15 additional sentinel sites.', region: 'Global' },
];

export const regions: RegionData[] = [
  { region: 'Africa', code: 'AFR', totalCases: 12854000, activeCases: 345000, deaths: 178000, riskScore: 82 },
  { region: 'Americas', code: 'AMR', totalCases: 195200000, activeCases: 520000, deaths: 2980000, riskScore: 45 },
  { region: 'South-East Asia', code: 'SEAR', totalCases: 61300000, activeCases: 180000, deaths: 810000, riskScore: 58 },
  { region: 'Europe', code: 'EUR', totalCases: 277400000, activeCases: 290000, deaths: 2280000, riskScore: 32 },
  { region: 'Eastern Mediterranean', code: 'EMR', totalCases: 23500000, activeCases: 95000, deaths: 350000, riskScore: 61 },
  { region: 'Western Pacific', code: 'WPR', totalCases: 207600000, activeCases: 410000, deaths: 480000, riskScore: 38 },
];

// Prediction engine using exponential smoothing + SIR model approximation
export interface PredictionResult {
  historical: TimeSeriesPoint[];
  predicted: TimeSeriesPoint[];
  confidence: { upper: number[]; lower: number[] };
  peakDate: string;
  peakCases: number;
  r0Estimate: number;
}

export const generatePrediction = (
  diseaseId: string,
  daysAhead: number = 90,
  interventionLevel: number = 0.5 // 0 = no intervention, 1 = max intervention
): PredictionResult => {
  const historical = generateTimeSeries(diseaseId, 12);
  const disease = diseases.find(d => d.id === diseaseId)!;
  
  // Calculate R0 from recent trend
  const recentData = historical.slice(-8);
  let growthRate = 0;
  for (let i = 1; i < recentData.length; i++) {
    growthRate += (recentData[i].cases - recentData[i - 1].cases) / Math.max(recentData[i - 1].cases, 1);
  }
  growthRate /= recentData.length - 1;
  
  const baseR0 = disease.trend === 'rising' ? 1.3 + Math.random() * 0.5 :
                 disease.trend === 'falling' ? 0.7 + Math.random() * 0.2 : 0.95 + Math.random() * 0.1;
  
  const effectiveR0 = baseR0 * (1 - interventionLevel * 0.6);
  
  const lastPoint = historical[historical.length - 1];
  const predicted: TimeSeriesPoint[] = [];
  const upper: number[] = [];
  const lower: number[] = [];
  
  let currentCases = lastPoint.cases;
  let peakCases = currentCases;
  let peakDate = lastPoint.date;
  
  for (let i = 1; i <= daysAhead; i += 7) {
    const date = new Date(lastPoint.date);
    date.setDate(date.getDate() + i);
    
    // SIR-inspired decay
    const populationFraction = 1 - (i / (daysAhead * 3)); // susceptible depletion
    const weeklyGrowth = (effectiveR0 - 1) * 0.1 * populationFraction;
    const seasonal = Math.sin((i / 365) * Math.PI * 2) * 0.1;
    
    currentCases = Math.max(0, Math.round(currentCases * (1 + weeklyGrowth + seasonal)));
    const weeklyDeaths = Math.round(currentCases * (disease.cfr / 100) * 0.7);
    const weeklyRecovered = Math.round(currentCases * 0.75);
    
    if (currentCases > peakCases) {
      peakCases = currentCases;
      peakDate = date.toISOString().split('T')[0];
    }
    
    // Confidence intervals widen over time
    const uncertainty = 1 + (i / daysAhead) * 0.8;
    upper.push(Math.round(currentCases * uncertainty));
    lower.push(Math.max(0, Math.round(currentCases / uncertainty)));
    
    predicted.push({
      date: date.toISOString().split('T')[0],
      cases: currentCases,
      deaths: weeklyDeaths,
      recovered: weeklyRecovered,
    });
  }
  
  return {
    historical: historical.slice(-26), // last 6 months
    predicted,
    confidence: { upper, lower },
    peakDate,
    peakCases,
    r0Estimate: Math.round(effectiveR0 * 100) / 100,
  };
};

export const formatNumber = (n: number): string => {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
};
